const express = require('express');
const session = require('express-session');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cookieParser = require('cookie-parser');
const path = require('path');
const { PrismaClient } = require('@prisma/client');
const env = require('./config/env');
const routes = require('./routes');

const app = express();
const prisma = new PrismaClient();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(helmet({ contentSecurityPolicy: false }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());
app.use(session({
  secret: env.sessionSecret,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: !env.isDev,
    sameSite: 'lax',
    maxAge: 24 * 60 * 60 * 1000,
  },
}));

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { error: 'Too many submissions. Try again later.' },
});

app.use((req, res, next) => {
  res.locals.user = req.session.admin || null;
  res.locals.path = req.path;
  res.locals.env = env;
  next();
});

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes(prisma, contactLimiter));

app.use((req, res) => {
  res.status(404).render('pages/404', { title: 'Page Not Found' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('pages/500', { title: 'Server Error' });
});

if (require.main === module) {
  app.listen(env.port, () => {
    console.log(`Portfolio running on http://localhost:${env.port}`);
  });

  process.on('SIGINT', async () => {
    await prisma.$disconnect();
    process.exit(0);
  });
}

module.exports = app;
