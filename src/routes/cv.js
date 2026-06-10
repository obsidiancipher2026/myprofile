const { Router } = require('express');
const cvController = require('../controllers/cvController');

module.exports = function (prisma) {
  const router = Router();
  router.get('/download', cvController.download(prisma));
  router.get('/preview', cvController.preview(prisma));
  return router;
};
