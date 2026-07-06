const realProjects = [
  {
    id: 'r1',
    title: 'CGS CTF 2026 Platform',
    description: 'A fully-featured Capture The Flag competition platform built for CyberGuardiansSociety. Features dynamic challenges spanning web exploitation, cryptography, OSINT, and forensics, with real-time scoring, progressive hints, and Docker-based challenge isolation for secure competition hosting.',
    techStack: 'Node.js, Express, MongoDB, Docker, EJS, Socket.io',
    projectUrl: null,
  },
  {
    id: 'r2',
    title: 'CGS Community Website 2026',
    description: 'The public website for the CyberGuardiansSociety community. Built to serve as a hub for cybersecurity enthusiasts with resources, event information, blog content, and community engagement features.',
    techStack: 'React, Next.js, Tailwind CSS, PostgreSQL',
    projectUrl: null,
  },
  {
    id: 'r3',
    title: 'Student Management System',
    description: 'A comprehensive system for managing student records, attendance, grades, and administrative workflows. Designed for educational institutions to centralize student data management.',
    techStack: 'Python, Django, SQLite, HTML/CSS, JavaScript',
    projectUrl: null,
  },
  {
    id: 'r4',
    title: 'DeepShield Deepfake Detection Platform',
    description: 'An AI-powered platform for detecting deepfake media. Utilizes machine learning models trained on extensive datasets of manipulated images and videos to identify synthetic content with high accuracy.',
    techStack: 'Python, TensorFlow, OpenCV, Flask, React, AI/ML',
    projectUrl: null,
  },
  {
    id: 'r5',
    title: 'Web Based Vulnerability Scanner',
    description: 'A browser-based security scanning tool that identifies common web vulnerabilities including XSS, SQL injection, CSRF, and misconfigurations. Generates detailed reports with remediation guidance.',
    techStack: 'Python, Flask, JavaScript, SQLite, Burpsuite',
    projectUrl: null,
  },
  {
    id: 'r6',
    title: 'AI Powered Phishing Detector',
    description: 'A machine learning-based tool for identifying phishing attempts in emails and web pages. Analyzes content, headers, URLs, and metadata to classify threats with high precision.',
    techStack: 'Python, Scikit-learn, Flask, NLP, JavaScript',
    projectUrl: null,
  },
  {
    id: 'r7',
    title: 'AetherCode Project Listing Marketplace',
    description: 'A marketplace-style website for listing and discovering software projects. Features user profiles, project listings with detailed descriptions, tag-based discovery, and collaboration tools.',
    techStack: 'Node.js, Express, MongoDB, EJS, JavaScript, HTML/CSS',
    projectUrl: null,
  },
];

exports.getById = (prisma) => async (req, res) => {
  try {
    const id = req.params.id;
    const realProject = realProjects.find((p) => p.id === id);
    if (realProject) return res.json(realProject);

    const project = await prisma.project.findUnique({
      where: { id: parseInt(id) },
    });
    if (!project) return res.status(404).json({ error: 'Not found' });
    res.json(project);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};
