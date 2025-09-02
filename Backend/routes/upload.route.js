const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload.middleware');

router.post('/', upload.single('product'), (req, res) => {
  res.json({
    success: true,
    image_url: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  });
});

module.exports = router;
