const bcrypt = require('bcryptjs');
const xss = require('xss');

exports.login = (prisma) => async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await prisma.admin.findUnique({ where: { email } });
    if (!admin || !(await bcrypt.compare(password, admin.password))) {
      return res.render('pages/admin/login', { title: 'Admin Login', error: 'Invalid credentials.' });
    }
    req.session.admin = { id: admin.id, email: admin.email, name: admin.name };
    res.redirect('/admin/dashboard');
  } catch (err) {
    res.render('pages/admin/login', { title: 'Admin Login', error: 'Server error.' });
  }
};

exports.logout = (req, res) => {
  req.session.destroy(() => res.redirect('/admin/login'));
};

exports.dashboard = (prisma) => async (req, res) => {
  const [projects, certs, skills, messages, unread] = await Promise.all([
    prisma.project.count(),
    prisma.certification.count(),
    prisma.skill.count(),
    prisma.contactMessage.count(),
    prisma.contactMessage.count({ where: { read: false } }),
  ]);
  res.render('pages/admin/dashboard', {
    title: 'Admin Dashboard',
    stats: { projects, certs, skills, messages, unread },
  });
};

// Projects
exports.listProjects = (prisma) => async (req, res) => {
  const projects = await prisma.project.findMany({ orderBy: { createdAt: 'desc' } });
  res.render('pages/admin/projects', { title: 'Manage Projects', projects });
};

exports.createProject = (prisma) => async (req, res) => {
  const { title, description, projectUrl, techStack, category } = req.body;
  const imageUrl = req.file ? '/uploads/' + req.file.filename : null;
  await prisma.project.create({
    data: {
      title: xss(title),
      description: xss(description),
      projectUrl: projectUrl || null,
      techStack: techStack || null,
      category: category || null,
      imageUrl,
    },
  });
  res.redirect('/admin/projects');
};

exports.editProject = (prisma) => async (req, res) => {
  const project = await prisma.project.findUnique({ where: { id: parseInt(req.params.id) } });
  if (!project) return res.redirect('/admin/projects');
  res.render('pages/admin/project-form', { title: 'Edit Project', project });
};

exports.updateProject = (prisma) => async (req, res) => {
  const id = parseInt(req.params.id);
  const { title, description, projectUrl, techStack, category } = req.body;
  const data = {
    title: xss(title),
    description: xss(description),
    projectUrl: projectUrl || null,
    techStack: techStack || null,
    category: category || null,
  };
  if (req.file) data.imageUrl = '/uploads/' + req.file.filename;
  await prisma.project.update({ where: { id }, data });
  res.redirect('/admin/projects');
};

exports.deleteProject = (prisma) => async (req, res) => {
  await prisma.project.delete({ where: { id: parseInt(req.params.id) } });
  res.redirect('/admin/projects');
};

// Certifications
exports.listCertifications = (prisma) => async (req, res) => {
  const certs = await prisma.certification.findMany({ orderBy: { date: 'desc' } });
  res.render('pages/admin/certifications', { title: 'Manage Certifications', certs });
};

exports.createCertification = (prisma) => async (req, res) => {
  const { title, issuer, date, credentialUrl } = req.body;
  const imageUrl = req.file ? '/uploads/' + req.file.filename : null;
  await prisma.certification.create({
    data: {
      title: xss(title),
      issuer: xss(issuer),
      date: new Date(date),
      credentialUrl: credentialUrl || null,
      imageUrl,
    },
  });
  res.redirect('/admin/certifications');
};

exports.editCertification = (prisma) => async (req, res) => {
  const cert = await prisma.certification.findUnique({ where: { id: parseInt(req.params.id) } });
  if (!cert) return res.redirect('/admin/certifications');
  res.render('pages/admin/cert-form', { title: 'Edit Certification', cert });
};

exports.updateCertification = (prisma) => async (req, res) => {
  const id = parseInt(req.params.id);
  const { title, issuer, date, credentialUrl } = req.body;
  const data = {
    title: xss(title),
    issuer: xss(issuer),
    date: new Date(date),
    credentialUrl: credentialUrl || null,
  };
  if (req.file) data.imageUrl = '/uploads/' + req.file.filename;
  await prisma.certification.update({ where: { id }, data });
  res.redirect('/admin/certifications');
};

exports.deleteCertification = (prisma) => async (req, res) => {
  try {
    await prisma.certification.delete({ where: { id: parseInt(req.params.id) } });
  } catch (e) {
    console.error('Delete certification error:', e.message);
  }
  res.redirect('/admin/certifications');
};

// Skills
exports.listSkills = (prisma) => async (req, res) => {
  const skills = await prisma.skill.findMany({ orderBy: { sortOrder: 'asc' } });
  res.render('pages/admin/skills', { title: 'Manage Skills', skills });
};

exports.createSkill = (prisma) => async (req, res) => {
  const { name, level, category, sortOrder } = req.body;
  await prisma.skill.create({
    data: {
      name: xss(name),
      level: parseInt(level) || 50,
      category: category || null,
      sortOrder: parseInt(sortOrder) || 0,
    },
  });
  res.redirect('/admin/skills');
};

exports.editSkill = (prisma) => async (req, res) => {
  const skill = await prisma.skill.findUnique({ where: { id: parseInt(req.params.id) } });
  if (!skill) return res.redirect('/admin/skills');
  res.render('pages/admin/skill-form', { title: 'Edit Skill', skill });
};

exports.updateSkill = (prisma) => async (req, res) => {
  const id = parseInt(req.params.id);
  const { name, level, category, sortOrder } = req.body;
  await prisma.skill.update({
    where: { id },
    data: {
      name: xss(name),
      level: parseInt(level) || 50,
      category: category || null,
      sortOrder: parseInt(sortOrder) || 0,
    },
  });
  res.redirect('/admin/skills');
};

exports.deleteSkill = (prisma) => async (req, res) => {
  try {
    await prisma.skill.delete({ where: { id: parseInt(req.params.id) } });
  } catch (e) {
    console.error('Delete skill error:', e.message);
  }
  res.redirect('/admin/skills');
};

// Mission
exports.editMission = (prisma) => async (req, res) => {
  const mission = await prisma.mission.findFirst({ where: { active: true } });
  res.render('pages/admin/mission', { title: 'Edit Mission', mission });
};

exports.updateMission = (prisma) => async (req, res) => {
  const { content } = req.body;
  let mission = await prisma.mission.findFirst({ where: { active: true } });
  if (mission) {
    await prisma.mission.update({ where: { id: mission.id }, data: { content: xss(content) } });
  } else {
    await prisma.mission.create({ data: { content: xss(content), active: true } });
  }
  res.redirect('/admin/mission');
};

// Messages
exports.listMessages = (prisma) => async (req, res) => {
  const messages = await prisma.contactMessage.findMany({ orderBy: { createdAt: 'desc' } });
  res.render('pages/admin/messages', { title: 'Contact Messages', messages });
};

exports.markRead = (prisma) => async (req, res) => {
  await prisma.contactMessage.update({
    where: { id: parseInt(req.params.id) },
    data: { read: true },
  });
  res.redirect('/admin/messages');
};

exports.deleteMessage = (prisma) => async (req, res) => {
  await prisma.contactMessage.delete({ where: { id: parseInt(req.params.id) } });
  res.redirect('/admin/messages');
};
