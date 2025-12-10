// const express=require('express');
// const router=express.Router();
// const {addHeadoffice,editHeadoffice,getHeadofficeById,getAllHeadoffice,deleteHeadoffice}=require('../controller/headoffice');
// router.post('/addHeadoffice',addHeadoffice);
// router.get('/getAllHeadoffice',getAllHeadoffice);

// router.post('/editheadoffice/:office_id',editHeadoffice)
// router.delete('/deleteHeadoffice/:office_id',getHeadofficeById)

// router.get('/getHeadoffice/:office_id',getHeadofficeById)
// module.exports=router;


// ===================================================


const express = require('express');
const router = express.Router();
const {
  addHeadoffice,
  editHeadoffice,
  getHeadofficeById,
  getAllHeadoffice,
  deleteHeadoffice
} = require('../controller/headoffice');

// POST   → Add Head Office
router.post('/addHeadoffice', addHeadoffice);

// GET    → Get All Head Offices
router.get('/getAllHeadoffice', getAllHeadoffice);

// GET    → Get One by ID
router.get('/getHeadoffice/:office_id', getHeadofficeById);

// POST   → Edit Head Office
router.post('/editheadoffice/:office_id', editHeadoffice);

// DELETE → Delete Head Office
router.delete('/deleteHeadoffice/:office_id', deleteHeadoffice);

module.exports = router;