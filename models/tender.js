const mongoose = require('mongoose');

const tenderSchema = new mongoose.Schema({
    tenderId: {
        type: String,
    },
    tenderType: {
        type: String,
    },
     tenderCategory: {
        type: String,
    },
    formOfContract: {
        type: String,
    },
    noOfCovers: {
        type: String,
    },
     coverType: {
        type: String,
    },
     tenderFee: {
        type:Number,
    },
     emdAmount: {
        type:Number,
    },
    tenderTitle: {
        type: String,
    },
     workDescription: {
        type: String,
    },
     tenderValueInRs: {
        type: String,
    },
    productCategory: {
        type: String,
    },
     bidValidityDays: {
        type: String,
    },
      periodOfWorkDays: {
        type: String,
    },
     preBidMeetingPlace:{
        type: String,
     },
      preBidMeetingAddress:{
        type: String,
     },
     preBidMeetingDate: {
        type: String,
      },
     criticalDates:{
      type: String,
     },
     publishedDate:{
      type: String,
     },
     documentDownloadSaleEndDate:{
      type: String,
     },
      bidSubmissionStartDate:{
      type: String,
     },
     bidSubmissionEndDate:{
      type: String,
     },
    tendersDocuments: [
    {
      originalName: String,
      fileName: String,
      filePath: String,
      fileType: String,
    }
  ],
  technicalDocumentOfBidder: [
    {
      originalName: String,
      fileName: String,
      filePath: String,
      fileType: String,
    }
  ],
  financialDocumentOfBidder: [
    {
      originalName: String,
      fileName: String,
      filePath: String,
      fileType: String,
    }
  ],
   AOC:{
      type: String,
     },
     documentType:{
      type: String,
     },
      tenderInvitingAuthority:{
      type: String,
     },
     tname:{
      type: String,
     },
 address:{
      type: String,
     },
     estimateCost:{
      type: String,
     },
     nameOfBidder:{
 type: String,
     },
subCategory:{
      type: String,
     },
     organisationChain:{
        type: String,
     },
     tenderRefNo:{
        type: String,
     },
    tenderStatus:{
      type: String,
    },
    bidNumber:{
       type:Number,  
    },
    awardedCurrency:{
      type: String,
    },
    awardedValue:{
      type: String,
    },
     documentLink:{
      type: String,
    }
    
}, { timestamps: true }); 

module.exports = mongoose.model('Tender', tenderSchema);
          