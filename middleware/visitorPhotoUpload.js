// middleware/visitorPhotoUpload.js   ← नया नाम

const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary'); // आपका cloudinary config

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'thane-police-gramin/visitors',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
    transformation: [
      { width: 600, height: 600, crop: 'limit' },
      { quality: 'auto', fetch_format: 'auto' }
    ],
    public_id: () => 'visitor_' + Date.now() + '_' + Math.round(Math.random() * 1E9)
  },
});

const visitorPhotoUpload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB max
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('केवल फोटो ही अपलोड करें!'), false);
    }
  }
});

module.exports = visitorPhotoUpload.single('visitorPhoto');