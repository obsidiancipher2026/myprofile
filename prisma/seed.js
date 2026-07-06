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
    { name: 'Python Programming', level: 0, category: 'Development', sortOrder: 1 },
    { name: 'Cybersecurity & Ethical Hacking', level: 0, category: 'Security', sortOrder: 2 },
    { name: 'Data Entry Management', level: 0, category: 'Operations', sortOrder: 3 },
    { name: 'Front & Backend Developer', level: 0, category: 'Development', sortOrder: 4 },
    { name: 'Web Penetration Testing', level: 0, category: 'Security', sortOrder: 5 },
    { name: 'Digital Forensics', level: 0, category: 'Security', sortOrder: 6 },
    { name: 'Cryptography & Steganography', level: 0, category: 'Security', sortOrder: 7 },
    { name: 'Full Stack Developer', level: 0, category: 'Development', sortOrder: 8 },
    { name: 'Complete Linux Operating System', level: 0, category: 'Systems & Tools', sortOrder: 9 },
    { name: 'Web Data Scraping', level: 0, category: 'Development', sortOrder: 10 },
    { name: 'Burpsuite & Wireshark Expert', level: 0, category: 'Systems & Tools', sortOrder: 11 },
    { name: 'End-to-End Encrypted Communication', level: 0, category: 'Security', sortOrder: 12 },
    { name: 'Computer Hardware Management', level: 0, category: 'Operations', sortOrder: 13 },
  ];
  for (const s of skills) await prisma.skill.create({ data: s });

  console.log('Seed completed successfully.');
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
