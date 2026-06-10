const { Router } = require('express');
const projectsController = require('../controllers/projectsController');

module.exports = function (prisma) {
  const router = Router();
  router.get('/:id', projectsController.getById(prisma));
  return router;
};
