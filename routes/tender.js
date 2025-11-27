// const express=require('express');
// const router=express.Router();
// const {addTender,getTenders,deleteTender,editTender}=require('../controller/meter');
// router.post('/addMeter',addTender);
// router.get('/getMeters',getTenders)
// router.delete('/deleteMeter/:meter_id',deleteTender)
// router.post('/editMeter/:meter_id',editTender)
// module.exports=router;
// --------------------------------------------
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { addTender, getTenders, deleteTender, editTender,importExcel,deleteAll  } = require('../controller/tenderController');

// Multer storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');  // folder to save files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // unique file name
  }
});

const upload = multer({ storage });

// Multer fields for multiple documents
const tenderUploads = upload.fields([
  { name: 'tendersDocuments', maxCount: 10 },
  { name: 'technicalDocumentOfBidder', maxCount: 10 },
  { name: 'financialDocumentOfBidder', maxCount: 10 }
]);

// Routes with multer middleware for file upload
router.post('/addTender', tenderUploads, addTender);
router.get('/getTenders', getTenders);
router.delete('/deleteTender/:tender_id', deleteTender);
router.post('/editTender/:tender_id', tenderUploads, editTender);  // also for editing with files
router.post('/import-excel', importExcel);
router.delete('/deleteAllTenders',deleteAll);
module.exports = router;
