# Shayan Ahmed — Cybersecurity Portfolio

A full-stack portfolio platform built with **Node.js (Express)**, **Prisma**, and **PostgreSQL**. Features a cyber-classical theme with responsive design, admin panel, and dynamic content management.

## Quick Start

### 1. Prerequisites

- [Node.js](https://nodejs.org/) v18+
- [PostgreSQL](https://www.postgresql.org/) 14+
- npm

### 2. Setup

```bash
# Clone and install
cd portfolio
npm install

# Copy environment variables
cp .env.example .env
# Edit .env with your PostgreSQL connection string and other settings

# Generate Prisma client and push schema to DB
npx prisma generate
npx prisma db push

# Seed the database (admin user, sample data)
npm run prisma:seed

# Start the server
npm run dev
```

Visit **http://localhost:3000**

### 3. Admin Login

Navigate to **http://localhost:3000/admin/login**

Default credentials (set via environment variables):
- Email: `shayan@example.com`
- Password: `ChangeMe123!`

## Docker Deployment

```bash
docker-compose up -d --build
```

This starts PostgreSQL and the app. The app will be available at **http://localhost:3000**.

## Environment Variables

| Variable | Description | Default |
|---|---|---|
| `DATABASE_URL` | PostgreSQL connection string | Required |
| `SESSION_SECRET` | Express session secret | Required |
| `SMTP_HOST` | SMTP server host | `smtp.gmail.com` |
| `SMTP_PORT` | SMTP port | `587` |
| `SMTP_USER` | SMTP username (email) | — |
| `SMTP_PASS` | SMTP password/app-password | — |
| `ADMIN_NOTIFY_EMAIL` | Email to receive contact form notifications | — |
| `SOCIAL_LINKEDIN` | LinkedIn profile URL | … |
| `SOCIAL_INSTAGRAM` | Instagram profile URL | … |
| `SOCIAL_YOUTUBE` | YouTube channel URL | … |
| `SOCIAL_WHATSAPP` | WhatsApp number (no +) | … |
| `SOCIAL_GITHUB` | GitHub profile URL | … |
| `PORT` | Server port | `3000` |

## Project Structure

```
portfolio/
├── prisma/
│   ├── schema.prisma          # Database models
│   └── seed.js                # Seed data
├── src/
│   ├── server.js              # Express app entry
│   ├── config/env.js          # Environment config
│   ├── controllers/           # Route handlers
│   ├── routes/                # Express routes
│   ├── public/
│   │   ├── css/style.css      # Cyber-classical theme
│   │   ├── js/main.js         # Client interactivity
│   │   └── uploads/           # Uploaded images / CV
│   └── views/
│       ├── partials/          # header, footer, head
│       └── pages/             # Page templates
│           └── admin/         # Admin panel templates
├── Dockerfile
├── docker-compose.yml
└── .env.example
```

## Features

- **Home** — Hero section, featured projects, certs preview, mission statement, core skills
- **About** — Bio, stats, CV download, social links
- **Projects Gallery** — Grid layout with hover animations, modal popups, dynamic data
- **Certifications** — Dynamically managed, display title/issuer/date with credential links
- **Mission** — Cyber-classical mission statement display
- **Skills** — Progress bars with animated fills, categorized display
- **Contact Form** — Validation, DB storage, email notification to admin
- **CV Download** — Backend handler for PDF download
- **Social Media** — Route-based redirects to LinkedIn, Instagram, YouTube, WhatsApp, GitHub
- **Admin Panel** — Full CRUD for projects, certifications, skills, mission; manage contact messages

## Tech Stack

- **Frontend:** EJS templates, custom CSS (cyber-classical theme), vanilla JS
- **Backend:** Express.js, Prisma ORM, PostgreSQL
- **Security:** Helmet, rate limiting, XSS sanitization, bcrypt password hashing
- **Email:** Nodemailer (SMTP)
