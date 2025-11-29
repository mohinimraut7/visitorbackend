// // middleware/visitorPhotoUpload.js   ← नया नाम

// const multer = require('multer');
// const { CloudinaryStorage } = require('multer-storage-cloudinary');
// const cloudinary = require('../config/cloudinary'); // आपका cloudinary config

// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: {
//     folder: 'thane-police-gramin/visitors',
//     allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
//     transformation: [
//       { width: 600, height: 600, crop: 'limit' },
//       { quality: 'auto', fetch_format: 'auto' }
//     ],
//     public_id: () => 'visitor_' + Date.now() + '_' + Math.round(Math.random() * 1E9)
//   },
// });

// const visitorPhotoUpload = multer({
//   storage: storage,
//   limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB max
//   fileFilter: (req, file, cb) => {
//     if (file.mimetype.startsWith('image/')) {
//       cb(null, true);
//     } else {
//       cb(new Error('केवल फोटो ही अपलोड करें!'), false);
//     }
//   }
// });

// module.exports = visitorPhotoUpload.single('visitorPhoto');


// ==========================================================================
// middleware/visitorPhotoUpload.js

const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const cloudinary = require('../config/cloudinary');

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'thane-police-gramin/visitors',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp', 'pdf'], // PDF पण allow
    transformation: [
      { width: 800, height: 800, crop: 'limit' },
      { quality: 'auto', fetch_format: 'auto' }
    ],
    public_id: (req, file) => {
      const type = file.fieldname === 'visitorPhoto' ? 'photo' : 'doc';
      return `${type}_${Date.now()}_${Math.round(Math.random() * 1E9)}`;
    }
  },
});

// आता दोन fields accept करतो
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB max total
  fileFilter: (req, file, cb) => {
    const allowed = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'application/pdf'];
    if (allowed.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('फक्त फोटो किंवा PDF अपलोड करा!'), false);
    }
  }
});

// हे महत्वाचे: .fields() वापर → दोन्ही fields allow
module.exports = upload.fields([
  { name: 'visitorPhoto', maxCount: 1 },     // फोटो अनिवार्य
  { name: 'uploadDocument', maxCount: 5 }   // दस्तऐवज optional (max 5)
]);