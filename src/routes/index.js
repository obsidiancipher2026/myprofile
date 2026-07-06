const { Router } = require('express');
const projectsRoutes = require('./projects');
const contactRoutes = require('./contact');
const cvRoutes = require('./cv');
const socialRoutes = require('./social');
const adminRoutes = require('./admin');

module.exports = function (prisma, contactLimiter) {
  const router = Router();

  router.get('/', async (req, res) => {
    const dbProjects = await prisma.project.findMany({ orderBy: { createdAt: 'desc' } });
    const realProjects = [
      { id: 'r1', title: 'CGS CTF 2026 Platform', description: 'A Capture The Flag competition platform built for CyberGuardiansSociety, featuring dynamic challenges, real-time scoring, and Docker-based challenge isolation.', techStack: 'Node.js, Express, MongoDB, Docker, EJS, Socket.io', imageUrl: null },
      { id: 'r2', title: 'CGS Community Website 2026', description: 'The public-facing website for the CyberGuardiansSociety community, built with modern web technologies for seamless user experience.', techStack: 'React, Next.js, Tailwind CSS, PostgreSQL', imageUrl: null },
      { id: 'r3', title: 'DeepShield Deepfake Detection Platform', description: 'An AI-powered platform for detecting deepfake media using machine learning models trained on synthetic and manipulated media datasets.', techStack: 'Python, TensorFlow, OpenCV, Flask, React', imageUrl: null },
    ];
    const projects = [...realProjects, ...dbProjects];
    const mission = await prisma.mission.findFirst({ where: { active: true } });
    res.render('pages/index', {
      title: 'Shayan Ahmed | Cybersecurity Specialist & Full Stack Developer',
      projects,
      mission,
    });
  });

  router.get('/about', (req, res) => {
    res.render('pages/about', { title: 'About — Shayan Ahmed' });
  });

  router.get('/projects', async (req, res) => {
    const dbProjects = await prisma.project.findMany({ orderBy: { createdAt: 'desc' } });
    const realProjects = [
      {
        id: 'r1',
        title: 'CGS CTF 2026 Platform',
        description: 'A fully-featured Capture The Flag competition platform built for CyberGuardiansSociety. Features dynamic challenges spanning web exploitation, cryptography, OSINT, and forensics, with real-time scoring, progressive hints, and Docker-based challenge isolation for secure competition hosting.',
        techStack: 'Node.js, Express, MongoDB, Docker, EJS, Socket.io',
        projectUrl: null,
        imageUrl: null,
      },
      {
        id: 'r2',
        title: 'CGS Community Website 2026',
        description: 'The public website for the CyberGuardiansSociety community. Built to serve as a hub for cybersecurity enthusiasts with resources, event information, blog content, and community engagement features.',
        techStack: 'React, Next.js, Tailwind CSS, PostgreSQL',
        projectUrl: null,
        imageUrl: null,
      },
      {
        id: 'r3',
        title: 'Student Management System',
        description: 'A comprehensive system for managing student records, attendance, grades, and administrative workflows. Designed for educational institutions to centralize student data management.',
        techStack: 'Python, Django, SQLite, HTML/CSS, JavaScript',
        projectUrl: null,
        imageUrl: null,
      },
      {
        id: 'r4',
        title: 'DeepShield Deepfake Detection Platform',
        description: 'An AI-powered platform for detecting deepfake media. Utilizes machine learning models trained on extensive datasets of manipulated images and videos to identify synthetic content with high accuracy.',
        techStack: 'Python, TensorFlow, OpenCV, Flask, React, AI/ML',
        projectUrl: null,
        imageUrl: null,
      },
      {
        id: 'r5',
        title: 'Web Based Vulnerability Scanner',
        description: 'A browser-based security scanning tool that identifies common web vulnerabilities including XSS, SQL injection, CSRF, and misconfigurations. Generates detailed reports with remediation guidance.',
        techStack: 'Python, Flask, JavaScript, SQLite, Burpsuite',
        projectUrl: null,
        imageUrl: null,
      },
      {
        id: 'r6',
        title: 'AI Powered Phishing Detector',
        description: 'A machine learning-based tool for identifying phishing attempts in emails and web pages. Analyzes content, headers, URLs, and metadata to classify threats with high precision.',
        techStack: 'Python, Scikit-learn, Flask, NLP, JavaScript',
        projectUrl: null,
        imageUrl: null,
      },
      {
        id: 'r7',
        title: 'AetherCode Project Listing Marketplace',
        description: 'A marketplace-style website for listing and discovering software projects. Features user profiles, project listings with detailed descriptions, tag-based discovery, and collaboration tools.',
        techStack: 'Node.js, Express, MongoDB, EJS, JavaScript, HTML/CSS',
        projectUrl: null,
        imageUrl: null,
      },
    ];
    const projects = [...realProjects, ...dbProjects];
    res.render('pages/projects', { title: 'Projects — Shayan Ahmed', projects });
  });

  router.get('/certifications', (req, res) => {
    const cvCerts = [
      { title: 'Python Programming with Artificial Intelligence', issuer: 'Szabist ZabTech', duration: '10 Months' },
      { title: 'Cybersecurity & Ethical Hacking', issuer: 'QUEST Nawabshah', duration: '4 Months' },
      { title: 'Functional English', issuer: 'Muntaha Skills Development Center', duration: '4 Months' },
      { title: 'Microsoft Office', issuer: 'Muntaha Skills Development Center', duration: '4 Months' },
      { title: 'Office Automation & Typing Program', issuer: 'Muntaha Skills Development Center', duration: '6 Days' },
      { title: 'PITP CTF 2026', issuer: 'Peoples Information Technology Program', duration: 'Certified' },
      { title: 'Youth Empowerment CTF 2026', issuer: 'Youth Empowerment Program', duration: 'Certified' },
      { title: 'Junior Cyber Defender', issuer: 'NCERT, Government of Pakistan', duration: 'Certified' },
      { title: 'BoroCTF 2026', issuer: 'United States of America', duration: 'Certified' },
    ];
    const achievements = [
      { title: 'Peoples Information Technology Program CTF 2026', rank: '1st Position', type: 'gold' },
      { title: 'Quaid-e-Awam University PITP Final Quest', rank: '7th Position', type: 'silver' },
      { title: 'Youth Empowerment CTF 2026', rank: '17th Position', type: 'bronze' },
      { title: 'BoroCTF 2026', rank: '370th Position', type: 'participant' },
      { title: 'Hacktheon Sejong International Cybersecurity Competition (South Korea)', rank: '15th Position', type: 'silver' },
    ];
    res.render('pages/certifications', {
      title: 'Certifications & Achievements — Shayan Ahmed',
      cvCerts,
      achievements,
    });
  });

  router.get('/achievements', (req, res) => {
    const achievements = [
      { title: 'Peoples Information Technology Program CTF 2026', rank: '1st Position', type: 'gold' },
      { title: 'Quaid-e-Awam University PITP Final Quest', rank: '7th Position', type: 'silver' },
      { title: 'Youth Empowerment CTF 2026', rank: '17th Position', type: 'bronze' },
      { title: 'BoroCTF 2026', rank: '370th Position', type: 'participant' },
      { title: 'Hacktheon Sejong International Cybersecurity Competition (South Korea)', rank: '15th Position', type: 'silver' },
    ];
    res.render('pages/achievements', { title: 'Achievements — Shayan Ahmed', achievements });
  });

  router.get('/mission', async (req, res) => {
    const mission = await prisma.mission.findFirst({ where: { active: true } });
    res.render('pages/mission', { title: 'Mission — Shayan Ahmed', mission });
  });

  router.get('/skills', async (req, res) => {
    const allSkills = [
      { name: 'Python Programming', category: 'Development', icon: 'fa-code' },
      { name: 'Cybersecurity & Ethical Hacking', category: 'Security', icon: 'fa-shield' },
      { name: 'Data Entry Management', category: 'Operations', icon: 'fa-database' },
      { name: 'Front & Backend Developer', category: 'Development', icon: 'fa-laptop-code' },
      { name: 'Web Penetration Testing', category: 'Security', icon: 'fa-bug' },
      { name: 'Digital Forensics', category: 'Security', icon: 'fa-search' },
      { name: 'Cryptography & Steganography', category: 'Security', icon: 'fa-lock' },
      { name: 'Full Stack Developer', category: 'Development', icon: 'fa-layer-group' },
      { name: 'Complete Linux Operating System', category: 'Systems & Tools', icon: 'fa-terminal' },
      { name: 'Web Data Scraping', category: 'Development', icon: 'fa-spider' },
      { name: 'Burpsuite & Wireshark Expert', category: 'Systems & Tools', icon: 'fa-network-wired' },
      { name: 'End-to-End Encrypted Communication', category: 'Security', icon: 'fa-key' },
      { name: 'Computer Hardware Management', category: 'Operations', icon: 'fa-microchip' },
    ];

    const categories = [
      { name: 'Security', icon: 'fa-shield', skills: ['Cybersecurity & Ethical Hacking', 'Web Penetration Testing', 'Digital Forensics', 'Cryptography & Steganography', 'End-to-End Encrypted Communication'] },
      { name: 'Development', icon: 'fa-code', skills: ['Python Programming', 'Front & Backend Developer', 'Full Stack Developer', 'Web Data Scraping'] },
      { name: 'Systems & Tools', icon: 'fa-terminal', skills: ['Complete Linux Operating System', 'Burpsuite & Wireshark Expert', 'Computer Hardware Management'] },
      { name: 'Operations', icon: 'fa-database', skills: ['Data Entry Management'] },
    ];

    res.render('pages/skills', { title: 'Skills — Shayan Ahmed', skills: allSkills, categories });
  });

  router.get('/education', (req, res) => {
    const education = [
      {
        level: 'SSC (Matriculation)',
        years: '2022 - 2024',
        school: 'Quaid-e-Azam Rangers School & College',
        location: 'Shaheed Benazirabad',
        parts: [
          { label: 'SSC-I (Computer)', value: '437 / 550', pct: '79.45%' },
          { label: 'SSC-II (Science)', value: '855 / 1100', pct: '77.73%' },
        ],
        grade: 'A Grade',
        icon: 'fa-school',
      },
      {
        level: 'HSC (Intermediate)',
        years: '2024 - 2025',
        school: 'Quaid-e-Azam Rangers School & College',
        location: 'Shaheed Benazirabad',
        parts: [
          { label: 'HSC-I (Pre-Medical)', value: '392 / 550', pct: '71.27%' },
          { label: 'HSC-II (Pre-Medical)', value: '802 / 1100', pct: '72.91%' },
        ],
        grade: 'A Grade',
        icon: 'fa-graduation-cap',
      },
      {
        level: 'Bachelor of Science',
        years: 'In Progress',
        school: 'BS Cybersecurity',
        location: 'QUEST Nawabshah',
        parts: [],
        grade: 'In Progress',
        icon: 'fa-user-graduate',
      },
    ];
    res.render('pages/education', { title: 'Education — Shayan Ahmed', education });
  });

  router.get('/experience', (req, res) => {
    const experiences = [
      {
        company: 'Lal Computer Institute',
        location: 'Shaheed Benazibad',
        roles: [
          { title: 'Data Entry Operator', period: '6 Months' },
          { title: 'DIT Teacher', period: '1 Month' },
          { title: 'Junior Administrator', period: '' },
        ],
        description: 'Managed data entry operations, taught DIT (Diploma in Information Technology) courses, and served as junior administrator for the institute.',
        icon: 'fa-building',
      },
      {
        company: 'Lal School System',
        location: 'Shaheed Benazirabad',
        roles: [
          { title: 'Assistant Administrator', period: '' },
          { title: 'Staff Incharge', period: '' },
        ],
        description: 'Assisted in school administration and management, overseeing staff coordination and operational workflows.',
        icon: 'fa-school',
      },
      {
        company: 'CyberGuardiansSociety',
        location: 'Online Community',
        roles: [
          { title: 'Founder', period: '' },
          { title: 'CEO', period: '' },
          { title: 'Director', period: '' },
        ],
        description: 'Founded and leads an online cybersecurity community focused on education, CTF competitions, and building a network of security enthusiasts.',
        icon: 'fa-shield',
      },
    ];
    res.render('pages/experience', { title: 'Experience — Shayan Ahmed', experiences });
  });

  router.use('/projects', projectsRoutes(prisma));
  router.use('/contact', contactRoutes(prisma, contactLimiter));
  router.use('/cv', cvRoutes(prisma));
  router.use('/social', socialRoutes());
  router.use('/admin', adminRoutes(prisma));

  return router;
};
