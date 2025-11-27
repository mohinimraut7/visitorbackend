const express=require('express');
const router=express.Router();
const {addVisitor}=require('../controller/visitor');
const visitorPhotoUpload = require('../middleware/visitorPhotoUpload'); // ← नया नाम



const { getVisitorByMobileNumber,editVisitor,getAllVisitors } = require('../controller/visitor');




router.post('/addVisitor',visitorPhotoUpload,addVisitor);

router.get('/getVisitorByMobileNumber', getVisitorByMobileNumber);

router.put('/visitor/:mobileNumber/feedback', editVisitor);


router.get('/allVisitors', getAllVisitors);
// या चाहो तो
// router.get('/visitors', getAllVisitors);


// router.post('/import-excel',importExcel);
// router.delete('/deleteAll',deleteAll);
// router.get('/getConsumers',getConsumers)
// router.delete('/deleteConsumer/:consumer_id',deleteConsumer)
// router.put('/editConsumer/:consumerid',editConsumer)
module.exports=router;