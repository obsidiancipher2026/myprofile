const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function main() {
  const existing = await prisma.admin.count();
  if (existing > 0) {
    console.log('Database already seeded — skipping.');
    return;
  }

  const adminEmail = process.env.ADMIN_EMAIL || 'shayan@example.com';
  const adminPassword = process.env.ADMIN_PASSWORD || 'ChangeMe123!';
  const hashed = await bcrypt.hash(adminPassword, 12);

  await prisma.admin.create({
    data: { email: adminEmail, password: hashed, name: 'Shayan Ahmed' },
  });

  await prisma.mission.create({
    data: {
      content: 'To think like an attacker but act as a defender — building proactive cybersecurity solutions that anticipate threats before they strike.',
      active: true,
    },
  });

  const skills = [
    { name: 'Ethical Hacking', level: 90, category: 'Offensive Security', sortOrder: 1 },
    { name: 'Threat Hunting', level: 85, category: 'Defensive Security', sortOrder: 2 },
    { name: 'SOC Operations', level: 88, category: 'Defensive Security', sortOrder: 3 },
    { name: 'DFIR', level: 82, category: 'Incident Response', sortOrder: 4 },
    { name: 'Python Development', level: 92, category: 'Development', sortOrder: 5 },
    { name: 'Networking Analysis', level: 85, category: 'Infrastructure', sortOrder: 6 },
    { name: 'Malware Investigation', level: 80, category: 'Reverse Engineering', sortOrder: 7 },
    { name: 'AI-driven Security Tools', level: 75, category: 'Innovation', sortOrder: 8 },
  ];
  for (const s of skills) await prisma.skill.create({ data: s });

  const certs = [
    { title: 'Certified Ethical Hacker (CEH)', issuer: 'EC-Council', date: new Date('2025-03-15') },
    { title: 'CompTIA Security+', issuer: 'CompTIA', date: new Date('2024-11-20') },
    { title: 'Practical Network Penetration Tester', issuer: 'TCM Security', date: new Date('2025-06-01') },
  ];
  for (const c of certs) await prisma.certification.create({ data: c });

  console.log('Seed completed successfully.');
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
