const path = require('path');

exports.download = () => async (req, res) => {
  const filePath = path.join(__dirname, '..', 'public', 'uploads', 'cv.pdf');
  const fs = require('fs');
  if (!fs.existsSync(filePath)) {
    return res.status(404).send('CV not available yet. Please check back later.');
  }
  res.download(filePath, 'Shayan_Ahmed_CV.pdf');
};

exports.preview = () => async (req, res) => {
  const fs = require('fs');
  const filePath = path.join(__dirname, '..', 'public', 'uploads', 'cv.pdf');
  if (!fs.existsSync(filePath)) {
    return res.status(404).send('CV not available yet.');
  }
  res.sendFile(filePath);
};
