const { Router } = require('express');
const contactController = require('../controllers/contactController');

module.exports = function (prisma, limiter) {
  const router = Router();

  router.get('/', (req, res) => {
    res.render('pages/contact', { title: 'Contact — Shayan Ahmed', errors: null, form: {} });
  });

  router.post('/', limiter, contactController.submit(prisma));

  return router;
};
