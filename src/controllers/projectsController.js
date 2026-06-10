const realProjects = [
  {
    id: 'r1',
    title: 'Phishing Simulation Toolkit',
    description: 'A comprehensive phishing simulation framework designed for security awareness training in organizations.<br><br><b>Key Features:</b><br>• Automated email campaign creation with customizable HTML templates<br>• Real-time open/click tracking with geo-location logging<br>• Security awareness report generation (PDF)<br>• Target list management with CSV import<br>• Multi-round campaign support with progress tracking',
    techStack: 'Python, SMTP, HTML/CSS, SQLite, ReportLab, Jinja2',
    projectUrl: null,
  },
  {
    id: 'r2',
    title: 'Network Vulnerability Scanner',
    description: 'A high-performance multi-threaded network scanner that identifies open ports, running services, and potential vulnerabilities across large network ranges.<br><br><b>Key Features:</b><br>• Multi-threaded architecture scanning 1000+ hosts concurrently<br>• Service fingerprinting and version detection<br>• CVE database matching for identified services<br>• Customizable scan profiles (Quick, Full, Stealth)<br>• JSON and HTML report export with severity ratings',
    techStack: 'Python, Nmap, Socket Programming, JSON, SQLite, threading',
    projectUrl: null,
  },
  {
    id: 'r3',
    title: 'SOC Log Analyzer & Alert System',
    description: 'A centralized security operations dashboard that aggregates logs from multiple sources, detects threats using Sigma rules, and triggers real-time alerts.<br><br><b>Key Features:</b><br>• Syslog and Windows Event Log ingestion pipeline<br>• Custom Sigma rule engine for threat correlation<br>• Real-time alerting via Slack webhooks and email<br>• Interactive Kibana dashboards for log visualization<br>• Case management system for incident tracking',
    techStack: 'Python, Elasticsearch, Kibana, Sigma Rules, Slack API, Logstash',
    projectUrl: null,
  },
  {
    id: 'r4',
    title: 'Steganography Detection Tool',
    description: 'A forensic CLI tool that uncovers hidden data embedded within image files using multiple detection techniques.<br><br><b>Key Features:</b><br>• LSB (Least Significant Bit) analysis for hidden payloads<br>• Histogram comparison to detect anomalies<br>• EXIF and metadata extraction and analysis<br>• Support for PNG, JPEG, BMP, and GIF formats<br>• Batch processing mode for multiple files',
    techStack: 'Python, PIL, NumPy, OpenCV, struct',
    projectUrl: null,
  },
  {
    id: 'r4',
    title: 'Steganography Detection Tool',
    description: 'A forensic CLI tool that uncovers hidden data embedded within image files using multiple detection techniques.<br><br><b>Key Features:</b><br>• LSB (Least Significant Bit) analysis for hidden payloads<br>• Histogram comparison to detect anomalies<br>• EXIF and metadata extraction and analysis<br>• Support for PNG, JPEG, BMP, and GIF formats<br>• Batch processing mode for multiple files',
    techStack: 'Python, PIL, NumPy, OpenCV, struct',
    projectUrl: null,
  },
  {
    id: 'r5',
    title: 'CTF Challenge Platform',
    description: 'A fully-featured Capture The Flag platform built for hosting cybersecurity competitions with dynamic challenges and real-time scoring.<br><br><b>Key Features:</b><br>• Web exploitation, cryptography, OSINT, and forensics challenges<br>• Dynamic scoring that decreases with each solve<br>• Progressive hint system with point penalties<br>• Real-time leaderboard with live updates<br>• Docker-based challenge isolation for security',
    techStack: 'Node.js, Express, MongoDB, Docker, EJS, Socket.io',
    projectUrl: null,
  },
  {
    id: 'r6',
    title: 'Wi-Fi Deauth Detection & Prevention',
    description: 'A Raspberry Pi-based intrusion detection system that monitors 802.11 Wi-Fi networks for deauthentication attacks and responds automatically.<br><br><b>Key Features:</b><br>• Real-time deauth packet detection using Scapy<br>• Offender MAC address logging with timestamps<br>• Push notification alerts via Twilio SMS<br>• Automated countermeasure deployment<br>• Web dashboard for historical attack review',
    techStack: 'Python, Scapy, Raspberry Pi, Twilio API, SQLite, Flask',
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
