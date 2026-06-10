const { Router } = require('express');
const adminController = require('../controllers/adminController');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: path.join(__dirname, '..', 'public', 'uploads'),
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } });

module.exports = function (prisma) {
  const router = Router();

  router.get('/login', (req, res) => {
    if (req.session.admin) return res.redirect('/admin/dashboard');
    res.render('pages/admin/login', { title: 'Admin Login', error: null });
  });

  router.post('/login', adminController.login(prisma));
  router.get('/logout', adminController.logout);

  const auth = (req, res, next) => {
    if (!req.session.admin) return res.redirect('/admin/login');
    next();
  };

  router.get('/dashboard', auth, adminController.dashboard(prisma));

  // Projects CRUD
  router.get('/projects', auth, adminController.listProjects(prisma));
  router.get('/projects/new', auth, (req, res) => res.render('pages/admin/project-form', { title: 'New Project', project: null }));
  router.post('/projects', auth, upload.single('image'), adminController.createProject(prisma));
  router.get('/projects/:id/edit', auth, adminController.editProject(prisma));
  router.post('/projects/:id', auth, upload.single('image'), adminController.updateProject(prisma));
  router.post('/projects/:id/delete', auth, adminController.deleteProject(prisma));

  // Certifications CRUD
  router.get('/certifications', auth, adminController.listCertifications(prisma));
  router.get('/certifications/new', auth, (req, res) => res.render('pages/admin/cert-form', { title: 'New Certification', cert: null }));
  router.post('/certifications', auth, upload.single('image'), adminController.createCertification(prisma));
  router.get('/certifications/:id/edit', auth, adminController.editCertification(prisma));
  router.post('/certifications/:id', auth, upload.single('image'), adminController.updateCertification(prisma));
  router.post('/certifications/:id/delete', auth, adminController.deleteCertification(prisma));

  // Skills CRUD
  router.get('/skills', auth, adminController.listSkills(prisma));
  router.get('/skills/new', auth, (req, res) => res.render('pages/admin/skill-form', { title: 'New Skill', skill: null }));
  router.post('/skills', auth, adminController.createSkill(prisma));
  router.get('/skills/:id/edit', auth, adminController.editSkill(prisma));
  router.post('/skills/:id', auth, adminController.updateSkill(prisma));
  router.post('/skills/:id/delete', auth, adminController.deleteSkill(prisma));

  // Mission
  router.get('/mission', auth, adminController.editMission(prisma));
  router.post('/mission', auth, adminController.updateMission(prisma));

  // Messages
  router.get('/messages', auth, adminController.listMessages(prisma));
  router.post('/messages/:id/read', auth, adminController.markRead(prisma));
  router.post('/messages/:id/delete', auth, adminController.deleteMessage(prisma));

  return router;
};
