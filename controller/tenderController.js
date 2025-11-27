

// const Tender = require('../models/tender');
// const User = require('../models/user');

// exports.addTender = async (req, res) => {
//     try {
//         const {
//             tenderId,
//             tenderType,
//             tenderCategory,
//             formOfContract,
//             noOfCovers,
//             coverType,
//             tenderFee,
//             emdAmount,
//             tenderTitle,
//             workDescription,
//             tenderValueInRs,
//             productCategory,
//             bidValidityDays,
//             periodOfWorkDays,
//             preBidMeetingPlace,
//             preBidMeetingAddress,
//             preBidMeetingDate,
//             criticalDates,
//             publishedDate,
//             documentDownloadSaleEndDate,
//             bidSubmissionStartDate,
//             bidSubmissionEndDate,
//             tendersDocuments,
//             technicalDocumentOfBidder,
//             financialDocumentOfBidder,
//             documentType,
//             tenderInvitingAuthority,
//             tname,
//             address,
//             estimateCost,
//             subCategory,
//             organizationChain,
//             tenderRefNo,
//             tenderStatus,
//             bidNumber,
//             bidderName,
//             awardedCurrency,
//             awardedValue,
//             documentLink
//         } = req.body;

       

//         const newMeter = new Meter({
//             tenderId,
//             tenderType,
//             tenderCategory,
//             formOfContract,
//             noOfCovers,
//             coverType,
//             tenderFee,
//             emdAmount,
//             tenderTitle,
//             workDescription,
//             tenderValueInRs,
//             productCategory,
//             bidValidityDays,
//             periodOfWorkDays,
//             preBidMeetingPlace,
//             preBidMeetingAddress,
//             preBidMeetingDate,
//             criticalDates,
//             publishedDate,
//             documentDownloadSaleEndDate,
//             bidSubmissionStartDate,
//             bidSubmissionEndDate,
//             tendersDocuments,
//             technicalDocumentOfBidder,
//             financialDocumentOfBidder,
//             documentType,
//             tenderInvitingAuthority,
//             tname,
//             address,
//             estimateCost,
//             subCategory,
//             organizationChain,
//             tenderRefNo,
//             tenderStatus,
//             bidNumber,
//             bidderName,
//             awardedCurrency,
//             awardedValue,
//             documentLink
//         });

//         await newMeter.save();

//         res.status(201).json({
//             message: "Tender added successfully.",
//             meter: newMeter,
//         });
//     } catch (error) {
//         console.error('Error adding tender:', error);
//         res.status(500).json({
//             message: "An error occurred while adding the tender.",
//             error: error.message,
//         });
//     }
// };




// exports.addTender = async (req, res) => {
//     try {
//         // Destructure all non-file fields from req.body
//         const {
//             tenderId,
//             tenderType,
//             tenderCategory,
//             formOfContract,
//             noOfCovers,
//             coverType,
//             tenderFee,
//             emdAmount,
//             tenderTitle,
//             workDescription,
//             tenderValueInRs,
//             productCategory,
//             bidValidityDays,
//             periodOfWorkDays,
//             preBidMeetingPlace,
//             preBidMeetingAddress,
//             preBidMeetingDate,
//             criticalDates,
//             publishedDate,
//             documentDownloadSaleEndDate,
//             bidSubmissionStartDate,
//             bidSubmissionEndDate,
//             documentType,
//             tenderInvitingAuthority,
//             tname,
//             address,
//             estimateCost,
//             nameOfBidder,
//             subCategory,
//             organisationChain,
//             tenderRefNo,
//             tenderStatus,
//             bidNumber,
//             bidderName,
//             awardedCurrency,
//             awardedValue,
//             documentLink,
//             AOC

//         } = req.body;

//         // Helper to format file info from multer
//         const formatFiles = (files) => {
//             if (!files) return [];
//             return files.map(file => ({
//                 originalName: file.originalname,
//                 fileName: file.filename,
//                 filePath: file.path,
//                 fileType: file.mimetype,
//             }));
//         };

//         // Process uploaded files from multer
//         const tendersDocuments = formatFiles(req.files?.tendersDocuments);
//         const technicalDocumentOfBidder = formatFiles(req.files?.technicalDocumentOfBidder);
//         const financialDocumentOfBidder = formatFiles(req.files?.financialDocumentOfBidder);

//         const newMeter = new Meter({
//             tenderId,
//             tenderType,
//             tenderCategory,
//             formOfContract,
//             noOfCovers,
//             coverType,
//             tenderFee,
//             emdAmount,
//             tenderTitle,
//             workDescription,
//             tenderValueInRs,
//             productCategory,
//             bidValidityDays,
//             periodOfWorkDays,
//             preBidMeetingPlace,
//             preBidMeetingAddress,
//             preBidMeetingDate,
//             criticalDates,
//             publishedDate,
//             documentDownloadSaleEndDate,
//             bidSubmissionStartDate,
//             bidSubmissionEndDate,
//             tendersDocuments,
//             technicalDocumentOfBidder,
//             financialDocumentOfBidder,
//             documentType,
//             tenderInvitingAuthority,
//             tname,
//             address,
//             estimateCost,
//             nameOfBidder,
//             subCategory,
//             organisationChain,
//             tenderRefNo,
//             tenderStatus,
//             bidNumber,
//             bidderName,
//             awardedCurrency,
//             awardedValue,
//             documentLink,
//             AOC
//         });

//         await newTender.save();

//         res.status(201).json({
//             message: "Tender added successfully.",
//             tender: newTender,
//         });
//     } catch (error) {
//         console.error('Error adding tender:', error);
//         res.status(500).json({
//             message: "An error occurred while adding the tender.",
//             error: error.message,
//         });
//     }
// };




// exports.getTenders = async (req, res) => {
//     try {
//         const tenders = await Tender.find();
//         res.status(200).json(tenders);
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({
//             message: 'Internal Server Error'
//         });
//     }
// };

// exports.deleteTender = async (req, res) => {
//     const { tender_id } = req.params;
//     try {
//         const deletedTender = await Tender.findByIdAndDelete(tender_id);
//         if (!deletedTender) {
//             return res.status(404).json({
//                 message: "Tender not found",
//             });
//         }
//         res.status(200).json({
//             message: "Tender deleted successfully",
//             tender: deletedTender,
//         });
//     } catch (error) {
//         console.error('Error deleting tender', error);
//         res.status(500).json({
//             message: "Internal Server Error"
//         });
//     }
// };

// // exports.editTender = async (req, res) => {
// //     const { meter_id } = req.params;
// //     const {
// //         tenderId,
// //         tenderType,
// //         tenderCategory,
// //         formOfContract,
// //         noOfCovers,
// //         coverType,
// //         tenderFee,
// //         emdAmount,
// //         tenderTitle,
// //         workDescription,
// //         tenderValueInRs,
// //         productCategory,
// //         bidValidityDays,
// //         periodOfWorkDays,
// //         preBidMeetingPlace,
// //         preBidMeetingAddress,
// //         preBidMeetingDate,
// //         criticalDates,
// //         publishedDate,
// //         documentDownloadSaleEndDate,
// //         bidSubmissionStartDate,
// //         bidSubmissionEndDate,
// //         tendersDocuments,
// //         technicalDocumentOfBidder,
// //         financialDocumentOfBidder,
// //         documentType,
// //         tenderInvitingAuthority,
// //         tname,
// //         address,
// //         estimateCost,
// //         subCategory,
// //         organizationChain,
// //         tenderRefNo,
// //         tenderStatus,
// //         bidNumber,
// //         bidderName,
// //         awardedCurrency,
// //         awardedValue,
// //         documentLink
// //     } = req.body;

// //     try {
// //         const meterUpdateData = {
// //             ...(tenderId && { tenderId }),
// //             ...(tenderType && { tenderType }),
// //             ...(tenderCategory && { tenderCategory }),
// //             ...(formOfContract && { formOfContract }),
// //             ...(noOfCovers && { noOfCovers }),
// //             ...(coverType && { coverType }),
// //             ...(tenderFee && { tenderFee }),
// //             ...(emdAmount && { emdAmount }),
// //             ...(tenderTitle && { tenderTitle }),
// //             ...(workDescription && { workDescription }),
// //             ...(tenderValueInRs && { tenderValueInRs }),
// //             ...(productCategory && { productCategory }),
// //             ...(bidValidityDays && { bidValidityDays }),
// //             ...(periodOfWorkDays && { periodOfWorkDays }),
// //             ...(preBidMeetingPlace && { preBidMeetingPlace }),
// //             ...(preBidMeetingAddress && { preBidMeetingAddress }),
// //             ...(preBidMeetingDate && { preBidMeetingDate }),
// //             ...(criticalDates && { criticalDates }),
// //             ...(publishedDate && { publishedDate }),
// //             ...(documentDownloadSaleEndDate && { documentDownloadSaleEndDate }),
// //             ...(bidSubmissionStartDate && { bidSubmissionStartDate }),
// //             ...(bidSubmissionEndDate && { bidSubmissionEndDate }),
// //             ...(tendersDocuments && { tendersDocuments }),
// //             ...(technicalDocumentOfBidder && { technicalDocumentOfBidder }),
// //             ...(financialDocumentOfBidder && { financialDocumentOfBidder }),
// //             ...(documentType && { documentType }),
// //   ...(tenderInvitingAuthority && { tenderInvitingAuthority }), 
// //    ...(tname && { tname }), 
// //    ...(address && { address }),  
// //    ...(estimateCost && { estimateCost }),
// //      ...(subCategory && { subCategory }),
// //             ...(organizationChain && { organizationChain }),
// //             ...(tenderRefNo && { tenderRefNo }),
// //             ...(tenderStatus && { tenderStatus }),
// //             ...(bidNumber && { bidNumber }),
// //             ...(bidderName && { bidderName }),
// //             ...(awardedCurrency && { awardedCurrency }),
// //             ...(awardedValue && { awardedValue }),
// //             ...(documentLink && { documentLink })
// //         };

// //         const updatedMeter = await Meter.findByIdAndUpdate(
// //             meter_id,
// //             meterUpdateData,
// //             { new: true, runValidators: true }
// //         );

// //         if (!updatedMeter) {
// //             return res.status(404).json({
// //                 message: "Tender not found",
// //             });
// //         }

// //         res.status(200).json({
// //             message: "Tender updated successfully",
// //             meter: updatedMeter,
// //         });
// //     } catch (error) {
// //         console.error('Error updating meter:', error);
// //         res.status(500).json({
// //             message: "Internal Server Error",
// //         });
// //     }
// // };



// exports.editTender = async (req, res) => {
//     const { tender_id } = req.params;
//     try {
//         // Destructure normal fields
//         const {
//             tenderId,
//             tenderType,
//             tenderCategory,
//             formOfContract,
//             noOfCovers,
//             coverType,
//             tenderFee,
//             emdAmount,
//             tenderTitle,
//             workDescription,
//             tenderValueInRs,
//             productCategory,
//             bidValidityDays,
//             periodOfWorkDays,
//             preBidMeetingPlace,
//             preBidMeetingAddress,
//             preBidMeetingDate,
//             criticalDates,
//             publishedDate,
//             documentDownloadSaleEndDate,
//             bidSubmissionStartDate,
//             bidSubmissionEndDate,
//             documentType,
//             tenderInvitingAuthority,
//             tname,
//             address,
//             estimateCost,
//             nameOfBidder,
//             subCategory,
//             organisationChain,
//             tenderRefNo,
//             tenderStatus,
//             bidNumber,
//             bidderName,
//             awardedCurrency,
//             awardedValue,
//             documentLink,
//             AOC
//         } = req.body;

//         // Helper to format files from multer
//         const formatFiles = (files) => {
//             if (!files) return undefined;
//             return files.map(file => ({
//                 originalName: file.originalname,
//                 fileName: file.filename,
//                 filePath: file.path,
//                 fileType: file.mimetype,
//             }));
//         };

//         // Prepare update data object
//         const tenderUpdateData = {
//             ...(tenderId && { tenderId }),
//             ...(tenderType && { tenderType }),
//             ...(tenderCategory && { tenderCategory }),
//             ...(formOfContract && { formOfContract }),
//             ...(noOfCovers && { noOfCovers }),
//             ...(coverType && { coverType }),
//             ...(tenderFee && { tenderFee }),
//             ...(emdAmount && { emdAmount }),
//             ...(tenderTitle && { tenderTitle }),
//             ...(workDescription && { workDescription }),
//             ...(tenderValueInRs && { tenderValueInRs }),
//             ...(productCategory && { productCategory }),
//             ...(bidValidityDays && { bidValidityDays }),
//             ...(periodOfWorkDays && { periodOfWorkDays }),
//             ...(preBidMeetingPlace && { preBidMeetingPlace }),
//             ...(preBidMeetingAddress && { preBidMeetingAddress }),
//             ...(preBidMeetingDate && { preBidMeetingDate }),
//             ...(criticalDates && { criticalDates }),
//             ...(publishedDate && { publishedDate }),
//             ...(documentDownloadSaleEndDate && { documentDownloadSaleEndDate }),
//             ...(bidSubmissionStartDate && { bidSubmissionStartDate }),
//             ...(bidSubmissionEndDate && { bidSubmissionEndDate }),
//             ...(documentType && { documentType }),
//             ...(tenderInvitingAuthority && { tenderInvitingAuthority }),
//             ...(tname && { tname }),
//             ...(address && { address }),
//             ...(estimateCost && { estimateCost }),
//             ...(nameOfBidder && { nameOfBidder }),
//             ...(subCategory && { subCategory }),
//             ...(organisationChain && { organisationChain }),
//             ...(tenderRefNo && { tenderRefNo }),
//             ...(tenderStatus && { tenderStatus }),
//             ...(bidNumber && { bidNumber }),
//             ...(bidderName && { bidderName }),
//             ...(awardedCurrency && { awardedCurrency }),
//             ...(awardedValue && { awardedValue }),
//             ...(documentLink && { documentLink }),
//              ...(AOC && { AOC }),
//         };

//         // Add uploaded files (overwrite existing arrays if files uploaded)
//         const tendersDocuments = formatFiles(req.files?.tendersDocuments);
//         if (tendersDocuments) tenderUpdateData.tendersDocuments = tendersDocuments;

//         const technicalDocumentOfBidder = formatFiles(req.files?.technicalDocumentOfBidder);
//         if (technicalDocumentOfBidder) tenderUpdateData.technicalDocumentOfBidder = technicalDocumentOfBidder;

//         const financialDocumentOfBidder = formatFiles(req.files?.financialDocumentOfBidder);
//         if (financialDocumentOfBidder) tenderUpdateData.financialDocumentOfBidder = financialDocumentOfBidder;

//         const updatedTender = await Tender.findByIdAndUpdate(
//             tender_id,
//             tenderUpdateData,
//             { new: true, runValidators: true }
//         );

//         if (!updatedTender) {
//             return res.status(404).json({
//                 message: "Tender not found",
//             });
//         }

//         res.status(200).json({
//             message: "Tender updated successfully",
//             tender: updatedTender,
//         });
//     } catch (error) {
//         console.error('Error updating tender:', error);
//         res.status(500).json({
//             message: "Internal Server Error",
//         });
//     }
// };


// exports.importExcel = async (req, res) => {
//   try {
//     const tenders = req.body;
// console.log("req tenders data testing",tenders)
//     if (!Array.isArray(tenders) || tenders.length === 0) {
//       return res.status(400).json({ message: "Invalid data. Please provide an array of tenders." });
//     }

//     let insertedCount = 0;
//     let updatedCount = 0;

//     for (const tenderData of tenders) {
//       const { tenderId } = tenderData;

//       if (!tenderId) continue; // Skip if no tenderId

//       const existingTender = await Tender.findOne({ tenderId }); // Use Tender model now

//       if (existingTender) {
//         await Tender.updateOne({ tenderId }, { $set: tenderData });
//         updatedCount++;
//       } else {
//         await Tender.create(tenderData);
//         insertedCount++;
//       }
//     }

//     res.status(201).json({
//       message: "Tender Excel import completed",
//       insertedCount,
//       updatedCount,
//     });

//   } catch (error) {
//     console.error("Error importing tender data:", error);
//     res.status(500).json({
//       message: "Error importing tender data",
//       error: error.message,
//     });
//   }
// };



// exports.deleteAll = async (req, res) => {
//   try {
//     const result = await Tender.deleteMany({});

//     if (result.deletedCount > 0) {
//       res.status(200).json({
//         message: 'All tenders deleted successfully',
//         deletedCount: result.deletedCount,
//       });
//     } else {
//       res.status(404).json({
//         message: 'No tenders found to delete',
//       });
//     }
//   } catch (error) {
//     console.error('Error deleting tenders:', error);
//     res.status(500).json({
//       message: 'Error deleting tenders',
//       error: error.message,
//     });
//   }
// };


// // exports.importExcel = async (req, res) => {
// //   try {
// //     const tenders = req.body;
// //     console.log("req tenders data testing", tenders);

// //     if (!Array.isArray(tenders) || tenders.length === 0) {
// //       return res.status(400).json({ message: "Invalid data. Please provide an array of tenders." });
// //     }

// //     let insertedCount = 0;
// //     let updatedCount = 0;

// //     for (const tenderData of tenders) {
// //       const { tenderId } = tenderData;

// //       if (!tenderId) continue; // Skip if no tenderId

// //       const existingTender = await Meter.findOne({ tenderId });

// //       if (existingTender) {
// //         // ✅ Update only fields that are missing/empty in DB but present in request
// //         const updateFields = {};
// //         for (const key in tenderData) {
// //           const newValue = tenderData[key];
// //           const existingValue = existingTender[key];

// //           if (
// //             newValue !== undefined &&
// //             newValue !== '' &&
// //             (existingValue === undefined || existingValue === '')
// //           ) {
// //             updateFields[key] = newValue;
// //           }
// //         }

// //         if (Object.keys(updateFields).length > 0) {
// //           await Meter.updateOne({ tenderId }, { $set: updateFields });
// //           updatedCount++;
// //         }
// //       } else {
// //         await Meter.create(tenderData);
// //         insertedCount++;
// //       }
// //     }

// //     res.status(201).json({
// //       message: "Tender Excel import completed",
// //       insertedCount,
// //       updatedCount,
// //     });

// //   } catch (error) {
// //     console.error("Error importing tender data:", error);
// //     res.status(500).json({
// //       message: "Error importing tender data",
// //       error: error.message,
// //     });
// //   }
// // };



// ----------------------------------------------------------------------
// *** 2July
// ==============================================================

// exports.addTender = async (req, res) => {
//     try {
//         // Destructure all non-file fields from req.body
//         const {
//             tenderId,
//             tenderType,
//             tenderCategory,
//             formOfContract,
//             noOfCovers,
//             coverType,
//             tenderFee,
//             emdAmount,
//             tenderTitle,
//             workDescription,
//             tenderValueInRs,
//             productCategory,
//             bidValidityDays,
//             periodOfWorkDays,
//             preBidMeetingPlace,
//             preBidMeetingAddress,
//             preBidMeetingDate,
//             criticalDates,
//             publishedDate,
//             documentDownloadSaleEndDate,
//             bidSubmissionStartDate,
//             bidSubmissionEndDate,
//             documentType,
//             tenderInvitingAuthority,
//             tname,
//             address,
//             estimateCost,
//             nameOfBidder,
//             subCategory,
//             organisationChain,
//             tenderRefNo,
//             tenderStatus,
//             bidNumber,
//             bidderName,
//             awardedCurrency,
//             awardedValue,
//             documentLink,
//             AOC
//         } = req.body;

//         // Helper to format file info from multer
//         const formatFiles = (files) => {
//             if (!files) return [];
//             return files.map(file => ({
//                 originalName: file.originalname,
//                 fileName: file.filename,
//                 filePath: file.path,
//                 fileType: file.mimetype,
//             }));
//         };

//         // Process uploaded files from multer
//         const tendersDocuments = formatFiles(req.files?.tendersDocuments);
//         const technicalDocumentOfBidder = formatFiles(req.files?.technicalDocumentOfBidder);
//         const financialDocumentOfBidder = formatFiles(req.files?.financialDocumentOfBidder);

//         const newTender = new Tender({
//             tenderId,
//             tenderType,
//             tenderCategory,
//             formOfContract,
//             noOfCovers,
//             coverType,
//             tenderFee,
//             emdAmount,
//             tenderTitle,
//             workDescription,
//             tenderValueInRs,
//             productCategory,
//             bidValidityDays,
//             periodOfWorkDays,
//             preBidMeetingPlace,
//             preBidMeetingAddress,
//             preBidMeetingDate,
//             criticalDates,
//             publishedDate,
//             documentDownloadSaleEndDate,
//             bidSubmissionStartDate,
//             bidSubmissionEndDate,
//             tendersDocuments,
//             technicalDocumentOfBidder,
//             financialDocumentOfBidder,
//             documentType,
//             tenderInvitingAuthority,
//             tname,
//             address,
//             estimateCost,
//             nameOfBidder,
//             subCategory,
//             organisationChain,
//             tenderRefNo,
//             tenderStatus,
//             bidNumber,
//             bidderName,
//             awardedCurrency,
//             awardedValue,
//             documentLink,
//             AOC
//         });

//         await newTender.save();

//         res.status(201).json({
//             message: "Tender added successfully.",
//             tender: newTender,
//         });
//     } catch (error) {
//         console.error('Error adding tender:', error);
//         res.status(500).json({
//             message: "An error occurred while adding the tender.",
//             error: error.message,
//         });
//     }
// };

// // Updated getTenders with pagination support
// exports.getTenders = async (req, res) => {
//     try {
//         const page = parseInt(req.query.page) || 1;
//         const limit = parseInt(req.query.limit) || 50;
//         const skip = (page - 1) * limit;
        
//         // Build search query if tenderId is provided
//         let searchQuery = {};
//         if (req.query.tenderId) {
//             searchQuery.tenderId = { $regex: req.query.tenderId, $options: 'i' };
//         }

//         // Get total count for pagination info
//         const totalTenders = await Tender.countDocuments(searchQuery);
        
//         // Fetch tenders with pagination
//         const tenders = await Tender.find(searchQuery)
//             .skip(skip)
//             .limit(limit)
//             .sort({ createdAt: -1 }); // Sort by newest first

//         // Calculate pagination info
//         const totalPages = Math.ceil(totalTenders / limit);
//         const hasNextPage = page < totalPages;
//         const hasPrevPage = page > 1;

//         res.status(200).json({
//             tenders,
//             pagination: {
//                 currentPage: page,
//                 totalPages,
//                 totalTenders,
//                 hasNextPage,
//                 hasPrevPage,
//                 limit
//             }
//         });
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({
//             message: 'Internal Server Error'
//         });
//     }
// };

// exports.deleteTender = async (req, res) => {
//     const { tender_id } = req.params;
//     try {
//         const deletedTender = await Tender.findByIdAndDelete(tender_id);
//         if (!deletedTender) {
//             return res.status(404).json({
//                 message: "Tender not found",
//             });
//         }
//         res.status(200).json({
//             message: "Tender deleted successfully",
//             tender: deletedTender,
//         });
//     } catch (error) {
//         console.error('Error deleting tender', error);
//         res.status(500).json({
//             message: "Internal Server Error"
//         });
//     }
// };

// exports.editTender = async (req, res) => {
//     const { tender_id } = req.params;
//     try {
//         // Destructure normal fields
//         const {
//             tenderId,
//             tenderType,
//             tenderCategory,
//             formOfContract,
//             noOfCovers,
//             coverType,
//             tenderFee,
//             emdAmount,
//             tenderTitle,
//             workDescription,
//             tenderValueInRs,
//             productCategory,
//             bidValidityDays,
//             periodOfWorkDays,
//             preBidMeetingPlace,
//             preBidMeetingAddress,
//             preBidMeetingDate,
//             criticalDates,
//             publishedDate,
//             documentDownloadSaleEndDate,
//             bidSubmissionStartDate,
//             bidSubmissionEndDate,
//             documentType,
//             tenderInvitingAuthority,
//             tname,
//             address,
//             estimateCost,
//             nameOfBidder,
//             subCategory,
//             organisationChain,
//             tenderRefNo,
//             tenderStatus,
//             bidNumber,
//             bidderName,
//             awardedCurrency,
//             awardedValue,
//             documentLink,
//             AOC
//         } = req.body;

//         // Helper to format files from multer
//         const formatFiles = (files) => {
//             if (!files) return undefined;
//             return files.map(file => ({
//                 originalName: file.originalname,
//                 fileName: file.filename,
//                 filePath: file.path,
//                 fileType: file.mimetype,
//             }));
//         };

//         // Prepare update data object
//         const tenderUpdateData = {
//             ...(tenderId && { tenderId }),
//             ...(tenderType && { tenderType }),
//             ...(tenderCategory && { tenderCategory }),
//             ...(formOfContract && { formOfContract }),
//             ...(noOfCovers && { noOfCovers }),
//             ...(coverType && { coverType }),
//             ...(tenderFee && { tenderFee }),
//             ...(emdAmount && { emdAmount }),
//             ...(tenderTitle && { tenderTitle }),
//             ...(workDescription && { workDescription }),
//             ...(tenderValueInRs && { tenderValueInRs }),
//             ...(productCategory && { productCategory }),
//             ...(bidValidityDays && { bidValidityDays }),
//             ...(periodOfWorkDays && { periodOfWorkDays }),
//             ...(preBidMeetingPlace && { preBidMeetingPlace }),
//             ...(preBidMeetingAddress && { preBidMeetingAddress }),
//             ...(preBidMeetingDate && { preBidMeetingDate }),
//             ...(criticalDates && { criticalDates }),
//             ...(publishedDate && { publishedDate }),
//             ...(documentDownloadSaleEndDate && { documentDownloadSaleEndDate }),
//             ...(bidSubmissionStartDate && { bidSubmissionStartDate }),
//             ...(bidSubmissionEndDate && { bidSubmissionEndDate }),
//             ...(documentType && { documentType }),
//             ...(tenderInvitingAuthority && { tenderInvitingAuthority }),
//             ...(tname && { tname }),
//             ...(address && { address }),
//             ...(estimateCost && { estimateCost }),
//             ...(nameOfBidder && { nameOfBidder }),
//             ...(subCategory && { subCategory }),
//             ...(organisationChain && { organisationChain }),
//             ...(tenderRefNo && { tenderRefNo }),
//             ...(tenderStatus && { tenderStatus }),
//             ...(bidNumber && { bidNumber }),
//             ...(bidderName && { bidderName }),
//             ...(awardedCurrency && { awardedCurrency }),
//             ...(awardedValue && { awardedValue }),
//             ...(documentLink && { documentLink }),
//              ...(AOC && { AOC }),
//         };

//         // Add uploaded files (overwrite existing arrays if files uploaded)
//         const tendersDocuments = formatFiles(req.files?.tendersDocuments);
//         if (tendersDocuments) tenderUpdateData.tendersDocuments = tendersDocuments;

//         const technicalDocumentOfBidder = formatFiles(req.files?.technicalDocumentOfBidder);
//         if (technicalDocumentOfBidder) tenderUpdateData.technicalDocumentOfBidder = technicalDocumentOfBidder;

//         const financialDocumentOfBidder = formatFiles(req.files?.financialDocumentOfBidder);
//         if (financialDocumentOfBidder) tenderUpdateData.financialDocumentOfBidder = financialDocumentOfBidder;

//         const updatedTender = await Tender.findByIdAndUpdate(
//             tender_id,
//             tenderUpdateData,
//             { new: true, runValidators: true }
//         );

//         if (!updatedTender) {
//             return res.status(404).json({
//                 message: "Tender not found",
//             });
//         }

//         res.status(200).json({
//             message: "Tender updated successfully",
//             tender: updatedTender,
//         });
//     } catch (error) {
//         console.error('Error updating tender:', error);
//         res.status(500).json({
//             message: "Internal Server Error",
//         });
//     }
// };

// exports.importExcel = async (req, res) => {
//   try {
//     const tenders = req.body;
//     console.log("req tenders data testing", tenders);

//     if (!Array.isArray(tenders) || tenders.length === 0) {
//       return res.status(400).json({ message: "Invalid data. Please provide an array of tenders." });
//     }

//     let insertedCount = 0;
//     let updatedCount = 0;

//     for (const tenderData of tenders) {
//       const { tenderId } = tenderData;

//       if (!tenderId) continue; // Skip if no tenderId

//       const existingTender = await Tender.findOne({ tenderId });

//       if (existingTender) {
//         await Tender.updateOne({ tenderId }, { $set: tenderData });
//         updatedCount++;
//       } else {
//         await Tender.create(tenderData);
//         insertedCount++;
//       }
//     }

//     res.status(201).json({
//       message: "Tender Excel import completed",
//       insertedCount,
//       updatedCount,
//     });

//   } catch (error) {
//     console.error("Error importing tender data:", error);
//     res.status(500).json({
//       message: "Error importing tender data",
//       error: error.message,
//     });
//   }
// };

// exports.deleteAll = async (req, res) => {
//   try {
//     const result = await Tender.deleteMany({});

//     if (result.deletedCount > 0) {
//       res.status(200).json({
//         message: 'All tenders deleted successfully',
//         deletedCount: result.deletedCount,
//       });
//     } else {
//       res.status(404).json({
//         message: 'No tenders found to delete',
//       });
//     }
//   } catch (error) {
//     console.error('Error deleting tenders:', error);
//     res.status(500).json({
//       message: 'Error deleting tenders',
//       error: error.message,
//     });
//   }
// };

// =============================================================


const Tender = require('../models/tender');
const User = require('../models/user');

exports.addTender = async (req, res) => {
    try {
        // Destructure all non-file fields from req.body
        const {
            tenderId,
            tenderType,
            tenderCategory,
            formOfContract,
            noOfCovers,
            coverType,
            tenderFee,
            emdAmount,
            tenderTitle,
            workDescription,
            tenderValueInRs,
            productCategory,
            bidValidityDays,
            periodOfWorkDays,
            preBidMeetingPlace,
            preBidMeetingAddress,
            preBidMeetingDate,
            criticalDates,
            publishedDate,
            documentDownloadSaleEndDate,
            bidSubmissionStartDate,
            bidSubmissionEndDate,
            documentType,
            tenderInvitingAuthority,
            tname,
            address,
            estimateCost,
            nameOfBidder,
            subCategory,
            organisationChain,
            tenderRefNo,
            tenderStatus,
            bidNumber,
            bidderName,
            awardedCurrency,
            awardedValue,
            documentLink,
            AOC
        } = req.body;

        // Helper to format file info from multer
        const formatFiles = (files) => {
            if (!files) return [];
            return files.map(file => ({
                originalName: file.originalname,
                fileName: file.filename,
                filePath: file.path,
                fileType: file.mimetype,
            }));
        };

        // Process uploaded files from multer
        const tendersDocuments = formatFiles(req.files?.tendersDocuments);
        const technicalDocumentOfBidder = formatFiles(req.files?.technicalDocumentOfBidder);
        const financialDocumentOfBidder = formatFiles(req.files?.financialDocumentOfBidder);

        const newTender = new Tender({
            tenderId,
            tenderType,
            tenderCategory,
            formOfContract,
            noOfCovers,
            coverType,
            tenderFee,
            emdAmount,
            tenderTitle,
            workDescription,
            tenderValueInRs,
            productCategory,
            bidValidityDays,
            periodOfWorkDays,
            preBidMeetingPlace,
            preBidMeetingAddress,
            preBidMeetingDate,
            criticalDates,
            publishedDate,
            documentDownloadSaleEndDate,
            bidSubmissionStartDate,
            bidSubmissionEndDate,
            tendersDocuments,
            technicalDocumentOfBidder,
            financialDocumentOfBidder,
            documentType,
            tenderInvitingAuthority,
            tname,
            address,
            estimateCost,
            nameOfBidder,
            subCategory,
            organisationChain,
            tenderRefNo,
            tenderStatus,
            bidNumber,
            bidderName,
            awardedCurrency,
            awardedValue,
            documentLink,
            AOC
        });

        await newTender.save();

        res.status(201).json({
            message: "Tender added successfully.",
            tender: newTender,
        });
    } catch (error) {
        console.error('Error adding tender:', error);
        res.status(500).json({
            message: "An error occurred while adding the tender.",
            error: error.message,
        });
    }
};

// Updated getTenders with pagination support
exports.getTenders = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 50;
        const skip = (page - 1) * limit;
        
        // Build search query if tenderId is provided
        let searchQuery = {};
        if (req.query.tenderId) {
            searchQuery.tenderId = { $regex: req.query.tenderId, $options: 'i' };
        }

        // Get total count for pagination info
        const totalTenders = await Tender.countDocuments(searchQuery);
        
        // Fetch tenders with pagination
        const tenders = await Tender.find(searchQuery)
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 }); // Sort by newest first

        // Calculate pagination info
        const totalPages = Math.ceil(totalTenders / limit);
        const hasNextPage = page < totalPages;
        const hasPrevPage = page > 1;

        res.status(200).json({
            tenders,
            pagination: {
                currentPage: page,
                totalPages,
                totalTenders,
                hasNextPage,
                hasPrevPage,
                limit
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Internal Server Error'
        });
    }
};

exports.deleteTender = async (req, res) => {
    const { tender_id } = req.params;
    try {
        const deletedTender = await Tender.findByIdAndDelete(tender_id);
        if (!deletedTender) {
            return res.status(404).json({
                message: "Tender not found",
            });
        }
        res.status(200).json({
            message: "Tender deleted successfully",
            tender: deletedTender,
        });
    } catch (error) {
        console.error('Error deleting tender', error);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
};

exports.editTender = async (req, res) => {
    const { tender_id } = req.params;
    try {
        // Destructure normal fields
        const {
            tenderId,
            tenderType,
            tenderCategory,
            formOfContract,
            noOfCovers,
            coverType,
            tenderFee,
            emdAmount,
            tenderTitle,
            workDescription,
            tenderValueInRs,
            productCategory,
            bidValidityDays,
            periodOfWorkDays,
            preBidMeetingPlace,
            preBidMeetingAddress,
            preBidMeetingDate,
            criticalDates,
            publishedDate,
            documentDownloadSaleEndDate,
            bidSubmissionStartDate,
            bidSubmissionEndDate,
            documentType,
            tenderInvitingAuthority,
            tname,
            address,
            estimateCost,
            nameOfBidder,
            subCategory,
            organisationChain,
            tenderRefNo,
            tenderStatus,
            bidNumber,
            bidderName,
            awardedCurrency,
            awardedValue,
            documentLink,
            AOC
        } = req.body;

        // Helper to format files from multer
        const formatFiles = (files) => {
            if (!files) return undefined;
            return files.map(file => ({
                originalName: file.originalname,
                fileName: file.filename,
                filePath: file.path,
                fileType: file.mimetype,
            }));
        };

        // Prepare update data object
        const tenderUpdateData = {
            ...(tenderId && { tenderId }),
            ...(tenderType && { tenderType }),
            ...(tenderCategory && { tenderCategory }),
            ...(formOfContract && { formOfContract }),
            ...(noOfCovers && { noOfCovers }),
            ...(coverType && { coverType }),
            ...(tenderFee && { tenderFee }),
            ...(emdAmount && { emdAmount }),
            ...(tenderTitle && { tenderTitle }),
            ...(workDescription && { workDescription }),
            ...(tenderValueInRs && { tenderValueInRs }),
            ...(productCategory && { productCategory }),
            ...(bidValidityDays && { bidValidityDays }),
            ...(periodOfWorkDays && { periodOfWorkDays }),
            ...(preBidMeetingPlace && { preBidMeetingPlace }),
            ...(preBidMeetingAddress && { preBidMeetingAddress }),
            ...(preBidMeetingDate && { preBidMeetingDate }),
            ...(criticalDates && { criticalDates }),
            ...(publishedDate && { publishedDate }),
            ...(documentDownloadSaleEndDate && { documentDownloadSaleEndDate }),
            ...(bidSubmissionStartDate && { bidSubmissionStartDate }),
            ...(bidSubmissionEndDate && { bidSubmissionEndDate }),
            ...(documentType && { documentType }),
            ...(tenderInvitingAuthority && { tenderInvitingAuthority }),
            ...(tname && { tname }),
            ...(address && { address }),
            ...(estimateCost && { estimateCost }),
            ...(nameOfBidder && { nameOfBidder }),
            ...(subCategory && { subCategory }),
            ...(organisationChain && { organisationChain }),
            ...(tenderRefNo && { tenderRefNo }),
            ...(tenderStatus && { tenderStatus }),
            ...(bidNumber && { bidNumber }),
            ...(bidderName && { bidderName }),
            ...(awardedCurrency && { awardedCurrency }),
            ...(awardedValue && { awardedValue }),
            ...(documentLink && { documentLink }),
             ...(AOC && { AOC }),
        };

        // Add uploaded files (overwrite existing arrays if files uploaded)
        const tendersDocuments = formatFiles(req.files?.tendersDocuments);
        if (tendersDocuments) tenderUpdateData.tendersDocuments = tendersDocuments;

        const technicalDocumentOfBidder = formatFiles(req.files?.technicalDocumentOfBidder);
        if (technicalDocumentOfBidder) tenderUpdateData.technicalDocumentOfBidder = technicalDocumentOfBidder;

        const financialDocumentOfBidder = formatFiles(req.files?.financialDocumentOfBidder);
        if (financialDocumentOfBidder) tenderUpdateData.financialDocumentOfBidder = financialDocumentOfBidder;

        const updatedTender = await Tender.findByIdAndUpdate(
            tender_id,
            tenderUpdateData,
            { new: true, runValidators: true }
        );

        if (!updatedTender) {
            return res.status(404).json({
                message: "Tender not found",
            });
        }

        res.status(200).json({
            message: "Tender updated successfully",
            tender: updatedTender,
        });
    } catch (error) {
        console.error('Error updating tender:', error);
        res.status(500).json({
            message: "Internal Server Error",
        });
    }
};

exports.importExcel = async (req, res) => {
  try {
    const tenders = req.body;
    console.log("req tenders data testing", tenders);

    if (!Array.isArray(tenders) || tenders.length === 0) {
      return res.status(400).json({ message: "Invalid data. Please provide an array of tenders." });
    }

    let insertedCount = 0;
    let updatedCount = 0;

    for (const tenderData of tenders) {
      const { tenderId } = tenderData;

      if (!tenderId) continue; // Skip if no tenderId

      const existingTender = await Tender.findOne({ tenderId });

      if (existingTender) {
        await Tender.updateOne({ tenderId }, { $set: tenderData });
        updatedCount++;
      } else {
        await Tender.create(tenderData);
        insertedCount++;
      }
    }

    res.status(201).json({
      message: "Tender Excel import completed",
      insertedCount,
      updatedCount,
    });

  } catch (error) {
    console.error("Error importing tender data:", error);
    res.status(500).json({
      message: "Error importing tender data",
      error: error.message,
    });
  }
};

exports.deleteAll = async (req, res) => {
  try {
    const result = await Tender.deleteMany({});

    if (result.deletedCount > 0) {
      res.status(200).json({
        message: 'All tenders deleted successfully',
        deletedCount: result.deletedCount,
      });
    } else {
      res.status(404).json({
        message: 'No tenders found to delete',
      });
    }
  } catch (error) {
    console.error('Error deleting tenders:', error);
    res.status(500).json({
      message: 'Error deleting tenders',
      error: error.message,
    });
  }
};











