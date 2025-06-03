// uploadMiddleware.js

const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../utils/cloudinary'); // <- Create this file below if you haven't

// Cloudinary storage configuration
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'task-manager', // optional folder in your Cloudinary account
    allowed_formats: ['jpg', 'jpeg', 'png'], // auto-validates mimetype
    transformation: [{ width: 800, height: 800, crop: 'limit' }] // optional resize
  },
});

// Cloudinary-based Multer uploader
const upload = multer({ storage });

module.exports = upload;
