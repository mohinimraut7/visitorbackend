const Visitor = require('../models/visitor');



exports.addVisitor = async (req, res) => {
    try {
        // 1. सारे टेक्स्ट फील्ड्स req.body से लो
        const {
            fullName,
            mobileNumber,
            fullAddress,
            pincode,
            district,
            policeStation,
            contactPerson,
            reasonToVisit,
            spOfficeBranch,
            feedback,
            nextAppointmentDate,
            feedbackGiven
        } = req.body;

        // 2. visitorPhoto अब req.body से नहीं → req.file से आएगा (Cloudinary)
        const visitorPhoto = req.file ? req.file.path : null;   // ← यही सबसे ज़रूरी बदलाव!

        // Safe trimming
        const trimmed = {
            fullName: (fullName || '').trim(),
            mobileNumber: (mobileNumber || '').trim(),
            fullAddress: (fullAddress || '').trim(),
            pincode: (pincode || '').trim(),
            district: (district || '').trim(),
            policeStation: (policeStation || '').trim(),
            contactPerson: contactPerson?.trim() || null,
            reasonToVisit: (reasonToVisit || '').trim(),
            spOfficeBranch: (spOfficeBranch || '').trim(),
            feedback: feedback?.trim() || null,
            feedbackGiven: feedbackGiven === true || feedbackGiven === 'true' || feedbackGiven === '1'
        };

        // Required fields check
        if (!trimmed.fullName || !trimmed.mobileNumber || !trimmed.fullAddress || 
            !trimmed.pincode || !trimmed.district ||
            !trimmed.policeStation || !trimmed.reasonToVisit ) {
            return res.status(400).json({
                success: false,
                message: "All required fields must be filled."
            });
        }

        // Mobile & Pincode validation
        if (!/^[6-9]\d{9}$/.test(trimmed.mobileNumber)) {
            return res.status(400).json({ success: false, message: "Invalid 10-digit mobile number" });
        }
        if (!/^\d{6}$/.test(trimmed.pincode)) {
            return res.status(400).json({ success: false, message: "Pincode must be 6 digits" });
        }

        // Appointment date validation
        let finalAppointmentDate = null;
        if (nextAppointmentDate) {
            const date = new Date(nextAppointmentDate);
            if (isNaN(date.getTime()) || date <= new Date()) {
                return res.status(400).json({ success: false, message: "Next appointment date must be in future" });
            }
            finalAppointmentDate = date;
        }

        // नया Visitor बनाओ
        const newVisitor = new Visitor({
            fullName: trimmed.fullName,
            visitorPhoto,                    // ← Cloudinary का पूरा URL यहाँ जाएगा
            mobileNumber: trimmed.mobileNumber,
            fullAddress: trimmed.fullAddress,
            pincode: trimmed.pincode,
            district: trimmed.district,
            policeStation: trimmed.policeStation,
            contactPerson: trimmed.contactPerson,
            reasonToVisit: trimmed.reasonToVisit,
            spOfficeBranch: trimmed.spOfficeBranch,
            feedback: trimmed.feedback,
            nextAppointmentDate: finalAppointmentDate,
            feedbackGiven: trimmed.feedbackGiven
        });

        await newVisitor.save();

        res.status(201).json({
            success: true,
            message: "Visitor registered successfully!",
            visitor: newVisitor
        });

    } catch (error) {
        console.error('Error adding visitor:', error);

        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: "This mobile number is already registered."
            });
        }

        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
};


// Get visitor by mobile number (latest entry first)
exports.getVisitorByMobileNumber = async (req, res) => {
  try {
    const { mobileNumber } = req.query; // or req.params.mobileNumber

    // Validate mobile number
    if (!mobileNumber || !/^[6-9]\d{9}$/.test(mobileNumber)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid 10-digit Indian mobile number"
      });
    }

    // Find the most recent visitor with this mobile number
    const visitor = await Visitor.findOne({ mobileNumber })
      .sort({ entryAt: -1 })
      .select('-__v'); // optional: hide __v field

    if (!visitor) {
      return res.status(404).json({
        success: false,
        message: "No visitor found with this mobile number"
      });
    }

    res.status(200).json({
      success: true,
      message: "Visitor found successfully",
      visitor
    });

  } catch (error) {
    console.error("Error fetching visitor:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
};



// Update Visitor Feedback (by Mobile Number)
exports.editVisitor = async (req, res) => {
  try {
    const { mobileNumber } = req.params; // या req.query.mobileNumber
    const { feedback, nextAppointmentDate, remark } = req.body;

    // Validate mobile number
    if (!mobileNumber || !/^[6-9]\d{9}$/.test(mobileNumber)) {
      return res.status(400).json({
        success: false,
        message: "Valid 10-digit mobile number is required"
      });
    }

    // Prepare update object
    const updateData = {
      feedback: feedback?.trim() || null,
      feedbackGiven: true,
      updatedAt: new Date()
    };

    // Handle next appointment date
    if (nextAppointmentDate) {
      const date = new Date(nextAppointmentDate);
      if (isNaN(date.getTime()) || date <= new Date()) {
        return res.status(400).json({
          success: false,
          message: "Next appointment date must be a valid future date"
        });
      }
      updateData.nextAppointmentDate = date;
    } else {
      updateData.nextAppointmentDate = null;
    }

    // Optional remark field (if you add it later in schema)
    if (remark !== undefined) {
      updateData.remark = remark.trim() || null;
    }

    // Find and update the latest visitor with this mobile number
    const updatedVisitor = await Visitor.findOneAndUpdate(
      { mobileNumber },
      updateData,
      { new: true, sort: { entryAt: -1 } } // returns updated document
    );

    if (!updatedVisitor) {
      return res.status(404).json({
        success: false,
        message: "No visitor found with this mobile number"
      });
    }

    res.status(200).json({
      success: true,
      message: "Feedback submitted successfully!",
      visitor: updatedVisitor
    });

  } catch (error) {
    console.error("Error updating visitor feedback:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
};

// Get All Visitors - with pagination, search & latest first
exports.getAllVisitors = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || '';
    const skip = (page - 1) * limit;

    // Search by name, mobile, police station
    const searchQuery = search
      ? {
          $or: [
            { fullName: { $regex: search, $options: 'i' } },
            { mobileNumber: { $regex: search, $options: 'i' } },
            { policeStation: { $regex: search, $options: 'i' } },
          ],
        }
      : {};

    const total = await Visitor.countDocuments(searchQuery);
    const visitors = await Visitor.find(searchQuery)
      .sort({ entryAt: -1 })        // Latest entry first
      .skip(skip)
      .limit(limit)
      .select('-__v');

    res.status(200).json({
      success: true,
      message: "Visitors fetched successfully",
      data: {
        visitors,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(total / limit),
          totalVisitors: total,
          hasNext: page < Math.ceil(total / limit),
          hasPrev: page > 1,
        },
      },
    });
  } catch (error) {
    console.error("Error fetching all visitors:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};