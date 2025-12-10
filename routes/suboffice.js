// const express=require('express');
// const router=express.Router();
// const {addSuboffice,editSuboffice,getSuboffices,getSubOfficesByHeadOfficeId}=require('../controller/suboffice');
// router.post('/addSuboffice',addSuboffice);
// router.post('/editSuboffice/:office_id',editSuboffice)
// // router.get('/getSuboffice/:office_id',getSubofficeById)
// router.get('/getAllSuboffices',getSuboffices)
// router.get('/getSubOfficesByHeadOfficeId/:headOfficeId',getSubOfficesByHeadOfficeId)


// module.exports=router;



// ===================================================================================




const express = require('express');
const router = express.Router();
const {
  addSuboffice,
  editSuboffice,
  getSuboffices,
  getSubOfficesByHeadOfficeId,
  deleteSuboffice,
  getSubofficeById
} = require('../controller/suboffice');

// ADD
router.post('/addSuboffice', addSuboffice);

// GET ALL
router.get('/getAllSuboffices', getSuboffices);

// GET BY HEAD OFFICE ID
router.get('/getSubOfficesByHeadOfficeId/:headOfficeId', getSubOfficesByHeadOfficeId);

router.get('/getSubOfficesBySubofficeId/:suboffice_id',getSubofficeById);


// EDIT → POST + :suboffice_id (तुझ्या frontend शी match)
router.post('/editSuboffice/:suboffice_id', editSuboffice);

// DELETE → DELETE + :suboffice_id (तुझ्या frontend शी match)
router.delete('/deleteSuboffice/:suboffice_id', deleteSuboffice);

module.exports = router;