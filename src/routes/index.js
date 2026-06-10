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
      { id: 'r1', title: 'Phishing Simulation Toolkit', description: 'Built a Python-based phishing simulation framework that automates email campaigns, tracks open/click rates, and generates security awareness reports for organizations.', techStack: 'Python, SMTP, SQLite, ReportLab', imageUrl: null },
      { id: 'r2', title: 'Network Vulnerability Scanner', description: 'Developed a multi-threaded port scanner with service detection, CVE matching, and detailed reporting. Scans up to 1000 hosts concurrently.', techStack: 'Python, Nmap, Socket Programming, SQLite', imageUrl: null },
      { id: 'r3', title: 'SOC Log Analyzer & Alert System', description: 'A security operations dashboard that ingests syslog and Windows Event Logs, correlates IOCs, and triggers real-time Slack/email alerts.', techStack: 'Python, Elasticsearch, Kibana, Sigma Rules', imageUrl: null },
    ];
    const projects = [...realProjects, ...dbProjects];
    const certs = await prisma.certification.findMany({ orderBy: { date: 'desc' } });
    const mission = await prisma.mission.findFirst({ where: { active: true } });
    let dbSkills = await prisma.skill.findMany({ orderBy: { sortOrder: 'asc' } });
    if (!dbSkills.length) {
      dbSkills = [
        { name: 'Ethical Hacking', level: 90, category: 'Offensive Security' },
        { name: 'Threat Hunting', level: 85, category: 'Defensive Security' },
        { name: 'Python Development', level: 92, category: 'Development' },
        { name: 'Networking Analysis', level: 85, category: 'Infrastructure' },
        { name: 'Malware Investigation', level: 80, category: 'Reverse Engineering' },
        { name: 'AI-driven Security Tools', level: 75, category: 'Innovation' },
        { name: 'Bug Bounty Hunting', level: 78, category: 'Offensive Security' },
        { name: 'OSINT & Reconnaissance', level: 82, category: 'Intelligence Gathering' },
      ];
    }
    const skills = dbSkills;
    res.render('pages/index', {
      title: 'Shayan Ahmed — Cybersecurity Portfolio',
      projects,
      certs,
      mission,
      skills,
    });
  });

  router.get('/about', (req, res) => {
    res.render('pages/about', { title: 'About — Shayan Ahmed' });
  });

  router.get('/projects', async (req, res) => {
    const category = req.query.category;
    const where = category ? { category } : {};
    const dbProjects = await prisma.project.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });
    const realProjects = [
      {
        id: 'r1',
        title: 'Phishing Simulation Toolkit',
        description: 'A comprehensive phishing simulation framework designed for security awareness training in organizations.<br><br><b>Key Features:</b><br>• Automated email campaign creation with customizable HTML templates<br>• Real-time open/click tracking with geo-location logging<br>• Security awareness report generation (PDF)<br>• Target list management with CSV import<br>• Multi-round campaign support with progress tracking',
        techStack: 'Python, SMTP, HTML/CSS, SQLite, ReportLab, Jinja2',
        projectUrl: null,
        imageUrl: null,
      },
      {
        id: 'r2',
        title: 'Network Vulnerability Scanner',
        description: 'A high-performance multi-threaded network scanner that identifies open ports, running services, and potential vulnerabilities across large network ranges.<br><br><b>Key Features:</b><br>• Multi-threaded architecture scanning 1000+ hosts concurrently<br>• Service fingerprinting and version detection<br>• CVE database matching for identified services<br>• Customizable scan profiles (Quick, Full, Stealth)<br>• JSON and HTML report export with severity ratings',
        techStack: 'Python, Nmap, Socket Programming, JSON, SQLite, threading',
        projectUrl: null,
        imageUrl: null,
      },
      {
        id: 'r3',
        title: 'SOC Log Analyzer & Alert System',
        description: 'A centralized security operations dashboard that aggregates logs from multiple sources, detects threats using Sigma rules, and triggers real-time alerts.<br><br><b>Key Features:</b><br>• Syslog and Windows Event Log ingestion pipeline<br>• Custom Sigma rule engine for threat correlation<br>• Real-time alerting via Slack webhooks and email<br>• Interactive Kibana dashboards for log visualization<br>• Case management system for incident tracking',
        techStack: 'Python, Elasticsearch, Kibana, Sigma Rules, Slack API, Logstash',
        projectUrl: null,
        imageUrl: null,
      },
      {
        id: 'r4',
        title: 'Steganography Detection Tool',
        description: 'A forensic CLI tool that uncovers hidden data embedded within image files using multiple detection techniques.<br><br><b>Key Features:</b><br>• LSB (Least Significant Bit) analysis for hidden payloads<br>• Histogram comparison to detect anomalies<br>• EXIF and metadata extraction and analysis<br>• Support for PNG, JPEG, BMP, and GIF formats<br>• Batch processing mode for multiple files',
        techStack: 'Python, PIL, NumPy, OpenCV, struct',
        projectUrl: null,
        imageUrl: null,
      },
      {
        id: 'r5',
        title: 'CTF Challenge Platform',
        description: 'A fully-featured Capture The Flag platform built for hosting cybersecurity competitions with dynamic challenges and real-time scoring.<br><br><b>Key Features:</b><br>• Web exploitation, cryptography, OSINT, and forensics challenges<br>• Dynamic scoring that decreases with each solve<br>• Progressive hint system with point penalties<br>• Real-time leaderboard with live updates<br>• Docker-based challenge isolation for security',
        techStack: 'Node.js, Express, MongoDB, Docker, EJS, Socket.io',
        projectUrl: null,
        imageUrl: null,
      },
      {
        id: 'r6',
        title: 'Wi-Fi Deauth Detection & Prevention',
        description: 'A Raspberry Pi-based intrusion detection system that monitors 802.11 Wi-Fi networks for deauthentication attacks and responds automatically.<br><br><b>Key Features:</b><br>• Real-time deauth packet detection using Scapy<br>• Offender MAC address logging with timestamps<br>• Push notification alerts via Twilio SMS<br>• Automated countermeasure deployment<br>• Web dashboard for historical attack review',
        techStack: 'Python, Scapy, Raspberry Pi, Twilio API, SQLite, Flask',
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
      { title: 'Functional English', issuer: '', duration: '4 Months' },
      { title: 'Microsoft Office', issuer: '', duration: '4 Months' },
      { title: 'Office Automation & Typing Program', issuer: '', duration: '6 Days' },
      { title: 'JR Penetration Tester', issuer: 'TryHackMe', duration: 'Certified' },
      { title: 'Cybersecurity 101', issuer: 'TryHackMe', duration: 'Certified' },
      { title: 'Certified in Cybersecurity', issuer: 'ISC2', duration: 'Certified' }
    ];
    res.render('pages/certifications', { title: 'Certifications — Shayan Ahmed', cvCerts });
  });

  router.get('/mission', async (req, res) => {
    const mission = await prisma.mission.findFirst({ where: { active: true } });
    res.render('pages/mission', { title: 'Mission — Shayan Ahmed', mission });
  });

  router.get('/skills', async (req, res) => {
    let dbSkills = await prisma.skill.findMany({ orderBy: { sortOrder: 'asc' } });
    if (!dbSkills.length) {
      dbSkills = [
        { name: 'Ethical Hacking', level: 90, category: 'Offensive Security' },
        { name: 'Threat Hunting', level: 85, category: 'Defensive Security' },
        { name: 'Python Development', level: 92, category: 'Development' },
        { name: 'Networking Analysis', level: 85, category: 'Infrastructure' },
        { name: 'Malware Investigation', level: 80, category: 'Reverse Engineering' },
        { name: 'AI-driven Security Tools', level: 75, category: 'Innovation' },
        { name: 'Bug Bounty Hunting', level: 78, category: 'Offensive Security' },
        { name: 'OSINT & Reconnaissance', level: 82, category: 'Intelligence Gathering' },
      ];
    }
    res.render('pages/skills', { title: 'Skills — Shayan Ahmed', skills: dbSkills });
  });

  router.get('/education', (req, res) => {
    res.render('pages/education', { title: 'Education — Shayan Ahmed' });
  });

  router.use('/projects', projectsRoutes(prisma));
  router.use('/contact', contactRoutes(prisma, contactLimiter));
  router.use('/cv', cvRoutes(prisma));
  router.use('/social', socialRoutes());
  router.use('/admin', adminRoutes(prisma));

  return router;
};
