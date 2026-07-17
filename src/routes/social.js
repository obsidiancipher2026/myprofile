const { Router } = require('express');
const socialController = require('../controllers/socialController');

module.exports = function () {
  const router = Router();

  router.get('/linkedin', socialController.linkedin);
  router.get('/instagram', socialController.instagram);
  router.get('/youtube', socialController.youtube);
  router.get('/whatsapp', socialController.whatsapp);
  router.get('/github', socialController.github);
  router.get('/fiverr', socialController.fiverr);

  return router;
};
