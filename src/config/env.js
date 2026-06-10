require('dotenv').config();

function ensureUrl(val, fallback) {
  if (!val) return fallback;
  val = val.trim();
  if (!/^https?:\/\//i.test(val)) val = 'https://' + val;
  return val;
}

const env = {
  port: parseInt(process.env.PORT, 10) || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  sessionSecret: process.env.SESSION_SECRET || 'change-me-in-production',
  databaseUrl: process.env.DATABASE_URL,
  smtp: {
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT, 10) || 587,
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || '',
    notifyEmail: process.env.ADMIN_NOTIFY_EMAIL || '',
  },
  social: {
    linkedin: ensureUrl(process.env.SOCIAL_LINKEDIN, 'https://www.linkedin.com/in/shayanahmedmughal'),
    instagram: ensureUrl(process.env.SOCIAL_INSTAGRAM, 'https://instagram.com/shayanahmed'),
    youtube: ensureUrl(process.env.SOCIAL_YOUTUBE, 'https://www.youtube.com/%40CyberGuardiansSociety'),
    whatsapp: (process.env.SOCIAL_WHATSAPP || '923261458036').replace(/\D/g, ''),
    github: ensureUrl(process.env.SOCIAL_GITHUB, 'https://github.com/OperationZero-GHH'),
  },
  admin: {
    email: process.env.ADMIN_EMAIL || 'shayan@example.com',
    password: process.env.ADMIN_PASSWORD || 'ChangeMe123!',
  },
  isDev: (process.env.NODE_ENV || 'development') === 'development',
};

module.exports = env;
