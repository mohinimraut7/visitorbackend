const express=require('express');
const router=express.Router();
const {addOffice,getOffices,getOfficeById,editOffice,deleteOffice}=require('../controller/office');
router.post('/addOffice',addOffice);
router.get('/getOffices',getOffices);

router.post('/editoffice/:id',editOffice)
router.get('/getOffice/:id',getOfficeById)
router.delete('/deleteOffice/:id',deleteOffice)


module.exports=router;