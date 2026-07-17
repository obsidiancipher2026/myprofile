const env = require('../config/env');

exports.linkedin = (req, res) => res.redirect(301, env.social.linkedin);
exports.instagram = (req, res) => res.redirect(301, env.social.instagram);
exports.youtube = (req, res) => res.redirect(301, env.social.youtube);
exports.github = (req, res) => res.redirect(301, env.social.github);
exports.fiverr = (req, res) => res.redirect(301, 'https://www.fiverr.com/s/XLG8Q5m');

exports.whatsapp = (req, res) => {
  const msg = encodeURIComponent('Hi Shayan, I saw your portfolio and would like to connect!');
  res.redirect(301, `https://wa.me/${env.social.whatsapp}?text=${msg}`);
};
