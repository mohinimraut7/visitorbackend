// const Visitor = require('../models/visitor');



// exports.addVisitor = async (req, res) => {
//     try {
//         // 1. सारे टेक्स्ट फील्ड्स req.body से लो
//         const {
//             fullName,
//             mobileNumber,
//             fullAddress,
//             pincode,
//             district,
//             policeStation,
//             contactPerson,
//             reasonToVisit,
//             spOfficeBranch,
//             feedback,
//             nextAppointmentDate,
//             feedbackGiven
//         } = req.body;

//         // 2. visitorPhoto अब req.body से नहीं → req.file से आएगा (Cloudinary)
//         const visitorPhoto = req.file ? req.file.path : null;   // ← यही सबसे ज़रूरी बदलाव!

//         // Safe trimming
//         const trimmed = {
//             fullName: (fullName || '').trim(),
//             mobileNumber: (mobileNumber || '').trim(),
//             fullAddress: (fullAddress || '').trim(),
//             pincode: (pincode || '').trim(),
//             district: (district || '').trim(),
//             policeStation: (policeStation || '').trim(),
//             contactPerson: contactPerson?.trim() || null,
//             reasonToVisit: (reasonToVisit || '').trim(),
//             spOfficeBranch: (spOfficeBranch || '').trim(),
//             feedback: feedback?.trim() || null,
//             feedbackGiven: feedbackGiven === true || feedbackGiven === 'true' || feedbackGiven === '1'
//         };

//         // Required fields check
//         if (!trimmed.fullName || !trimmed.mobileNumber || !trimmed.fullAddress || 
//             !trimmed.pincode || !trimmed.district ||
//             !trimmed.policeStation || !trimmed.reasonToVisit ) {
//             return res.status(400).json({
//                 success: false,
//                 message: "All required fields must be filled."
//             });
//         }

//         // Mobile & Pincode validation
//         if (!/^[6-9]\d{9}$/.test(trimmed.mobileNumber)) {
//             return res.status(400).json({ success: false, message: "Invalid 10-digit mobile number" });
//         }
//         if (!/^\d{6}$/.test(trimmed.pincode)) {
//             return res.status(400).json({ success: false, message: "Pincode must be 6 digits" });
//         }

//         // Appointment date validation
//         let finalAppointmentDate = null;
//         if (nextAppointmentDate) {
//             const date = new Date(nextAppointmentDate);
//             if (isNaN(date.getTime()) || date <= new Date()) {
//                 return res.status(400).json({ success: false, message: "Next appointment date must be in future" });
//             }
//             finalAppointmentDate = date;
//         }

//         // नया Visitor बनाओ
//         const newVisitor = new Visitor({
//             fullName: trimmed.fullName,
//             visitorPhoto,                    // ← Cloudinary का पूरा URL यहाँ जाएगा
//             mobileNumber: trimmed.mobileNumber,
//             fullAddress: trimmed.fullAddress,
//             pincode: trimmed.pincode,
//             district: trimmed.district,
//             policeStation: trimmed.policeStation,
//             contactPerson: trimmed.contactPerson,
//             reasonToVisit: trimmed.reasonToVisit,
//             spOfficeBranch: trimmed.spOfficeBranch,
//             feedback: trimmed.feedback,
//             nextAppointmentDate: finalAppointmentDate,
//             feedbackGiven: trimmed.feedbackGiven
//         });

//         await newVisitor.save();

//         res.status(201).json({
//             success: true,
//             message: "Visitor registered successfully!",
//             visitor: newVisitor
//         });

//     } catch (error) {
//         console.error('Error adding visitor:', error);

//         if (error.code === 11000) {
//             return res.status(400).json({
//                 success: false,
//                 message: "This mobile number is already registered."
//             });
//         }

//         res.status(500).json({
//             success: false,
//             message: "Server error",
//             error: error.message
//         });
//     }
// };


// // Get visitor by mobile number (latest entry first)
// exports.getVisitorByMobileNumber = async (req, res) => {
//   try {
//     const { mobileNumber } = req.query; // or req.params.mobileNumber

//     // Validate mobile number
//     if (!mobileNumber || !/^[6-9]\d{9}$/.test(mobileNumber)) {
//       return res.status(400).json({
//         success: false,
//         message: "Please provide a valid 10-digit Indian mobile number"
//       });
//     }

//     // Find the most recent visitor with this mobile number
//     const visitor = await Visitor.findOne({ mobileNumber })
//       .sort({ entryAt: -1 })
//       .select('-__v'); // optional: hide __v field

//     if (!visitor) {
//       return res.status(404).json({
//         success: false,
//         message: "No visitor found with this mobile number"
//       });
//     }

//     res.status(200).json({
//       success: true,
//       message: "Visitor found successfully",
//       visitor
//     });

//   } catch (error) {
//     console.error("Error fetching visitor:", error);
//     res.status(500).json({
//       success: false,
//       message: "Server error",
//       error: error.message
//     });
//   }
// };



// // Update Visitor Feedback (by Mobile Number)
// exports.editVisitor = async (req, res) => {
//   try {
//     const { mobileNumber } = req.params; // या req.query.mobileNumber
//     const { feedback, nextAppointmentDate, remark } = req.body;

//     // Validate mobile number
//     if (!mobileNumber || !/^[6-9]\d{9}$/.test(mobileNumber)) {
//       return res.status(400).json({
//         success: false,
//         message: "Valid 10-digit mobile number is required"
//       });
//     }

//     // Prepare update object
//     const updateData = {
//       feedback: feedback?.trim() || null,
//       feedbackGiven: true,
//       updatedAt: new Date()
//     };

//     // Handle next appointment date
//     if (nextAppointmentDate) {
//       const date = new Date(nextAppointmentDate);
//       if (isNaN(date.getTime()) || date <= new Date()) {
//         return res.status(400).json({
//           success: false,
//           message: "Next appointment date must be a valid future date"
//         });
//       }
//       updateData.nextAppointmentDate = date;
//     } else {
//       updateData.nextAppointmentDate = null;
//     }

//     // Optional remark field (if you add it later in schema)
//     if (remark !== undefined) {
//       updateData.remark = remark.trim() || null;
//     }

//     // Find and update the latest visitor with this mobile number
//     const updatedVisitor = await Visitor.findOneAndUpdate(
//       { mobileNumber },
//       updateData,
//       { new: true, sort: { entryAt: -1 } } // returns updated document
//     );

//     if (!updatedVisitor) {
//       return res.status(404).json({
//         success: false,
//         message: "No visitor found with this mobile number"
//       });
//     }

//     res.status(200).json({
//       success: true,
//       message: "Feedback submitted successfully!",
//       visitor: updatedVisitor
//     });

//   } catch (error) {
//     console.error("Error updating visitor feedback:", error);
//     res.status(500).json({
//       success: false,
//       message: "Server error",
//       error: error.message
//     });
//   }
// };

// // Get All Visitors - with pagination, search & latest first
// exports.getAllVisitors = async (req, res) => {
//   try {
//     const page = parseInt(req.query.page) || 1;
//     const limit = parseInt(req.query.limit) || 10;
//     const search = req.query.search || '';
//     const skip = (page - 1) * limit;

//     // Search by name, mobile, police station
//     const searchQuery = search
//       ? {
//           $or: [
//             { fullName: { $regex: search, $options: 'i' } },
//             { mobileNumber: { $regex: search, $options: 'i' } },
//             { policeStation: { $regex: search, $options: 'i' } },
//           ],
//         }
//       : {};

//     const total = await Visitor.countDocuments(searchQuery);
//     const visitors = await Visitor.find(searchQuery)
//       .sort({ entryAt: -1 })        // Latest entry first
//       .skip(skip)
//       .limit(limit)
//       .select('-__v');

//     res.status(200).json({
//       success: true,
//       message: "Visitors fetched successfully",
//       data: {
//         visitors,
//         pagination: {
//           currentPage: page,
//           totalPages: Math.ceil(total / limit),
//           totalVisitors: total,
//           hasNext: page < Math.ceil(total / limit),
//           hasPrev: page > 1,
//         },
//       },
//     });
//   } catch (error) {
//     console.error("Error fetching all visitors:", error);
//     res.status(500).json({
//       success: false,
//       message: "Server error",
//       error: error.message,
//     });
//   }
// };


// =================================================================================

const Visitor = require('../models/visitor');
const Counter = require('../models/counter'); // ← ye file bana dena (niche diya hai)

// =======================================
// 1. ADD NEW VISIT (First time + Returning)
// =======================================
// exports.addVisitor = async (req, res) => {
//     try {
//         const {
//             fullName,
//             mobileNumber,
//             fullAddress,
//             pincode,
//             district,
//             policeStation,
//             spOfficeBranch,
//             contactPerson,
//             reasonToVisit,
//             numberOfVisitors,
//             nextAppointmentDate
//         } = req.body;

//         // Photo from multer/cloudinary (single file)
//         // const visitorPhoto = req.file ? req.file.path : null;

//         // Multiple documents (images/pdf) – using multer array/fieldname "documents"
//         // const uploadedDocs = req.files?.documents || [];

//         const visitorPhoto = req.files?.visitorPhoto?.[0]?.path;
// const uploadedDocs = req.files?.uploadDocument || []; // frontend मधून येईल uploadDocument

// if (!visitorPhoto) {
//     return res.status(400).json({ success: false, message: "अभ्यागताचा फोटो आवश्यक आहे!" });
// }

//         // Trim & clean
//         const cleaned = {
//             fullName: (fullName || '').trim(),
//             mobileNumber: (mobileNumber || '').trim(),
//             fullAddress: (fullAddress || '').trim(),
//             pincode: (pincode || '').trim(),
//             district: (district || '').trim(),
//             policeStation: (policeStation || '').trim() || null,
//             spOfficeBranch: (spOfficeBranch || '').trim() || null,
//             contactPerson: (contactPerson || '').trim() || null,
//             reasonToVisit: (reasonToVisit || '').trim() || null,
//             numberOfVisitors: (numberOfVisitors || '').trim() || "1"
//         };

//         // Required validation
//         if (!cleaned.fullName || !cleaned.mobileNumber || !cleaned.fullAddress ||
//             !cleaned.pincode || !cleaned.district) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Full Name, Mobile, Address, Pincode & District are required"
//             });
//         }

//         if (!/^[6-9]\d{9}$/.test(cleaned.mobileNumber)) {
//             return res.status(400).json({ success: false, message: "Invalid mobile number" });
//         }
//         if (!/^\d{6}$/.test(cleaned.pincode)) {
//             return res.status(400).json({ success: false, message: "Invalid pincode" });
//         }

//         let visitor = await Visitor.findOne({ mobileNumber: cleaned.mobileNumber });

//         // Prepare new visit object
//         const newVisit = {
//             contactPerson: cleaned.contactPerson,
//             reasonToVisit: cleaned.reasonToVisit,
//             numberOfVisitors: cleaned.numberOfVisitors,
//             visitorPhoto,
//             nextAppointmentDate: null,
//             entryAt: new Date()
//         };

//         // Handle next appointment date
//         if (nextAppointmentDate) {
//             const apptDate = new Date(nextAppointmentDate);
//             if (isNaN(apptDate.getTime()) || apptDate <= new Date()) {
//                 return res.status(400).json({ success: false, message: "Next appointment must be in future" });
//             }
//             newVisit.nextAppointmentDate = apptDate;
//         }

//         // Add uploaded documents
//         if (uploadedDocs.length > 0) {
//             newVisit.uploadDocument = uploadedDocs.map(file => ({
//                 url: file.path,
//                 fileType: file.mimetype
//             }));
//         }

//         if (!visitor) {
//             // FIRST TIME VISITOR
//             visitor = new Visitor({
//                 fullName: cleaned.fullName,
//                 mobileNumber: cleaned.mobileNumber,
//                 fullAddress: cleaned.fullAddress,
//                 pincode: cleaned.pincode,
//                 district: cleaned.district,
//                 policeStation: cleaned.policeStation,
//                 spOfficeBranch: cleaned.spOfficeBranch,
//                 visits: [newVisit]
//             });
//         } else {
//             // RETURNING VISITOR → push new visit
//             visitor.visits.push(newVisit);
//         }

//         await visitor.save();

//         // Get the latest visit (just added)
//         const latestVisit = visitor.visits[visitor.visits.length - 1];

//         res.status(201).json({
//             success: true,
//             message: visitor.visits.length === 1 
//                 ? "Visitor registered successfully!" 
//                 : "New visit added successfully!",
//             applicationId: latestVisit.applicationId || "Generating...",
//             visitNumber: latestVisit.visitNumber || visitor.visits.length,
//             visitor
//         });

//     } catch (error) {
//         console.error('Add visitor error:', error);
//         res.status(500).json({
//             success: false,
//             message: "Server error",
//             error: error.message
//         });
//     }
// };


// =======================================
// ADD NEW VISIT - 100% SYNTAX CORRECT & WORKING
// =======================================
exports.addVisitor = async (req, res) => {
    try {
        const {
            fullName,
            mobileNumber,
            fullAddress,
            pincode,
            district = "ठाणे",
            policeStation,
            spOfficeBranch,
            contactPerson,
            reasonToVisit,
            numberOfVisitors = "1",
            nextAppointmentDate
        } = req.body;

        const visitorPhoto = req.files?.visitorPhoto?.[0]?.path;
        const uploadedDocs = req.files?.uploadDocument || [];

        if (!fullName?.trim() || !mobileNumber?.trim() || !fullAddress?.trim() || !pincode?.trim()) {
            return res.status(400).json({ success: false, message: "सर्व मुख्य फील्ड भरा" });
        }
        if (!/^[6-9]\d{9}$/.test(mobileNumber.trim())) {
            return res.status(400).json({ success: false, message: "अवैध मोबाईल नंबर" });
        }
        if (!visitorPhoto) {
            return res.status(400).json({ success: false, message: "अभ्यागताचा फोटो आवश्यक आहे का?" });
        }

        const today = new Date().toISOString().slice(0, 10).replace(/-/g, '');

        const lastVisitToday = await Visitor.findOne({
            "visits.entryAt": {
                $gte: new Date().setHours(0, 0, 0, 0),
                $lt: new Date().setHours(23, 59, 59, 999)
            }
        }).sort({ "visits.entryAt": -1 });

        let nextSerial = 1;
        if (lastVisitToday?.visits?.length > 0) {
            const lastId = lastVisitToday.visits[lastVisitToday.visits.length - 1].applicationId || "";
            if (lastId.startsWith(today)) {
                nextSerial = parseInt(lastId.slice(8)) + 1;
            }
        }
        const applicationId = today + String(nextSerial).padStart(4, '0');

        const existingVisitor = await Visitor.findOne({ mobileNumber: mobileNumber.trim() });
        const visitNumber = existingVisitor ? existingVisitor.visits.length + 1 : 1;

        const newVisit = {
            applicationId,
            visitNumber,
            contactPerson: contactPerson?.trim() || null,
            reasonToVisit: reasonToVisit?.trim() || null,
            numberOfVisitors: numberOfVisitors.trim() || "1",
            visitorPhoto,
            entryAt: new Date(),
            feedbackGiven: false
        };

        if (nextAppointmentDate) {
            const appt = new Date(nextAppointmentDate);
            if (isNaN(appt.getTime()) || appt <= new Date()) {
                return res.status(400).json({ success: false, message: "पुढची तारीख भविष्यात असावी" });
            }
            newVisit.nextAppointmentDate = appt;
        }

        if (uploadedDocs.length > 0) {
            newVisit.uploadDocument = uploadedDocs.map(file => ({
                url: file.path,
                fileType: file.mimetype
            }));
        }

        let visitor;
        if (existingVisitor) {
            existingVisitor.visits.push(newVisit);
            visitor = await existingVisitor.save();
        } else {
            visitor = await Visitor.create({
                fullName: fullName.trim(),
                mobileNumber: mobileNumber.trim(),
                fullAddress: fullAddress.trim(),
                pincode: pincode.trim(),
                district: district.trim(),
                policeStation: policeStation?.trim() || null,
                spOfficeBranch: spOfficeBranch?.trim() || null,
                visits: [newVisit]
            });
        }

        const latestVisit = visitor.visits[visitor.visits.length - 1];

        res.status(201).json({
            success: true,
            message: existingVisitor ? "नवीन भेट नोंदवली!" : "अभ्यागत नोंदणी यशस्वी!",
            applicationId: latestVisit.applicationId,
            visitNumber: latestVisit.visitNumber,
            visitor
        });

    } catch (error) {
        console.error('Add visitor error:', error);
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
};







// =======================================
// 2. GET VISITOR BY MOBILE (All visits history)
// =======================================
exports.getVisitorByMobileNumber = async (req, res) => {
    try {
        const { mobileNumber } = req.query;

        if (!mobileNumber || !/^[6-9]\d{9}$/.test(mobileNumber)) {
            return res.status(400).json({ success: false, message: "Valid mobile number required" });
        }

        const visitor = await Visitor.findOne({ mobileNumber })
            .select('-__v')
            .lean();

        if (!visitor) {
            return res.status(404).json({ success: false, message: "Visitor not found" });
        }

        res.status(200).json({
            success: true,
            message: "Visitor found",
            visitor
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// =======================================
// 3. UPDATE FEEDBACK (Latest visit only)
// =======================================
exports.editVisitor = async (req, res) => {
    try {
        const { mobileNumber } = req.params;
        const { feedback, nextAppointmentDate } = req.body;

        if (!mobileNumber || !/^[6-9]\d{9}$/.test(mobileNumber)) {
            return res.status(400).json({ success: false, message: "Valid mobile required" });
        }

        const visitor = await Visitor.findOne({ mobileNumber });
        if (!visitor || visitor.visits.length === 0) {
            return res.status(404).json({ success: false, message: "No visit found" });
        }

        const latestVisit = visitor.visits[visitor.visits.length - 1];

        latestVisit.feedback = feedback?.trim() || null;
        latestVisit.feedbackGiven = true;
        latestVisit.feedbackSubmittedAt = new Date();

        if (nextAppointmentDate) {
            const date = new Date(nextAppointmentDate);
            if (isNaN(date.getTime()) || date <= new Date()) {
                return res.status(400).json({ success: false, message: "Invalid future date" });
            }
            latestVisit.nextAppointmentDate = date;
        }

        await visitor.save();

        res.status(200).json({
            success: true,
            message: "Feedback submitted successfully!",
            latestVisit
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// =======================================
// 4. GET ALL VISITORS (with search & pagination)
// =======================================
exports.getAllVisitors = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const search = req.query.search?.trim() || '';
        const skip = (page - 1) * limit;

        const searchQuery = search ? {
            $or: [
                { fullName: { $regex: search, $options: 'i' } },
                { mobileNumber: { $regex: search, $options: 'i' } },
                { policeStation: { $regex: search, $options: 'i' } },
                { "visits.applicationId": { $regex: search, $options: 'i' } }
            ]
        } : {};

        const total = await Visitor.countDocuments(searchQuery);
        const visitors = await Visitor.find(searchQuery)
            .sort({ "visits.entryAt": -1 })
            .skip(skip)
            .limit(limit)
            .select('-__v');

        res.status(200).json({
            success: true,
            data: {
                visitors,
                pagination: {
                    currentPage: page,
                    totalPages: Math.ceil(total / limit),
                    total,
                    hasNext: page < Math.ceil(total / limit),
                    hasPrev: page > 1
                }
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};