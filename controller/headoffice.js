

// const HeadOffice = require("../models/headoffice");

// // ---------------------------
// // 📌 Add Head Office
// // ---------------------------
// exports.addHeadoffice = async (req, res) => {
//     try {
//         const { officeName, address, contactNumber, email, spOfficeBranch } = req.body;

//         // Check if already exists
//         const officeExists = await HeadOffice.findOne({ officeName });
//         if (officeExists) {
//             return res.status(400).json({
//                 message: "Office Name already exists"
//             });
//         }

//         const newOffice = new HeadOffice({
//             officeName,
//             address,
//             contactNumber,
//             email,
//             spOfficeBranch
//         });

//         await newOffice.save();

//         res.status(201).json({
//             message: "Head Office created successfully",
//             data: newOffice
//         });

//     } catch (error) {
//         console.error("Add Head Office Error:", error);
//         res.status(500).json({ message: "Server Error" });
//     }
// };

// // ---------------------------
// // 📌 Edit Head Office
// // ---------------------------
// exports.editHeadoffice = async (req, res) => {
//     try {
//         const officeId = req.params.office_id;

//         const updatedOffice = await HeadOffice.findByIdAndUpdate(
//             officeId,
//             req.body,
//             { new: true }
//         );

//         if (!updatedOffice) {
//             return res.status(404).json({
//                 message: "Head Office not found"
//             });
//         }

//         res.status(200).json({
//             message: "Head Office updated successfully",
//             data: updatedOffice
//         });

//     } catch (error) {
//         console.error("Edit Head Office Error:", error);
//         res.status(500).json({ message: "Server Error" });
//     }
// };

// // ---------------------------
// // 📌 Get Head Office by ID
// // ---------------------------
// exports.getHeadofficeById = async (req, res) => {
//     try {
//         const officeId = req.params.office_id;

//         const office = await HeadOffice.findById(officeId);

//         if (!office) {
//             return res.status(404).json({
//                 message: "Head Office not found"
//             });
//         }

//         res.status(200).json({
//             message: "Head Office data fetched",
//             data: office
//         });

//     } catch (error) {
//         console.error("Get Head Office Error:", error);
//         res.status(500).json({ message: "Server Error" });
//     }
// };


// exports.getAllHeadoffice = async (req, res) => {
//     try {
//         const offices = await HeadOffice.find(); // Fetch all head office documents

//         res.status(200).json({
//             message: "All Head Offices fetched successfully",
//             data: offices
//         });
//     } catch (error) {
//         console.error("Get All Head Offices Error:", error);
//         res.status(500).json({ message: "Server Error" });
//     }
// };

// exports.deleteHeadOffice = async (req, res) => {
//   try {
//     const headoffice = await HeadOffice.findById(req.params.id);

//     if (!headoffice) {
//       return res.status(404).json({ message: "Head Office not found" });
//     }

//     await HeadOffice.findByIdAndDelete(req.params.id);

//     return res.status(200).json({
//       message: "Head Office deleted successfully!",
//       deletedHeadOfficeId: req.params.id,
//     });
//   } catch (error) {
//     console.error("Error in deleteHeadOffice:", error);
//     return res.status(500).json({
//       message: "Failed to delete head office",
//       error: error.message,
//     });
//   }
// };



// ==========================================


const HeadOffice = require("../models/headoffice");

// Add Head Office (officeType added + required)
exports.addHeadoffice = async (req, res) => {
  try {
    const { officeName, officeType, address, contactNumber, email, spOfficeBranch } = req.body;

    // Required fields
    if (!officeName || !officeType) {
      return res.status(400).json({
        success: false,
        message: "Office Name and Office Type are required"
      });
    }

    // Duplicate check by officeName + officeType (best practice)
    const officeExists = await HeadOffice.findOne({
      officeName: officeName.trim(),
      officeType: officeType.trim()
    });

    if (officeExists) {
      return res.status(400).json({
        success: false,
        message: "Office with this Name and Type already exists"
      });
    }

    const newOffice = new HeadOffice({
      officeName: officeName.trim(),
      officeType: officeType.trim(),
      address: address?.trim(),
      contactNumber: contactNumber?.trim(),
      email: email?.trim()?.toLowerCase(),
      spOfficeBranch: spOfficeBranch?.trim()
    });

    await newOffice.save();

    res.status(201).json({
      success: true,
      message: "Head Office created successfully",
      data: newOffice
    });

  } catch (error) {
    console.error("Add Error:", error);
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Duplicate entry: Office Name or Type already exists"
      });
    }
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Edit Head Office (officeType included)
exports.editHeadoffice = async (req, res) => {
  try {
    const { office_id } = req.params;
    const { officeName, officeType, address, contactNumber, email, spOfficeBranch } = req.body;

    if (!officeName || !officeType) {
      return res.status(400).json({
        success: false,
        message: "Office Name and Office Type are required"
      });
    }

    // Prevent duplicate (except current record)
    const duplicate = await HeadOffice.findOne({
      officeName: officeName.trim(),
      officeType: officeType.trim(),
      _id: { $ne: office_id }
    });

    if (duplicate) {
      return res.status(400).json({
        success: false,
        message: "Another office with this Name and Type already exists"
      });
    }

    const updatedOffice = await HeadOffice.findByIdAndUpdate(
      office_id,
      {
        officeName: officeName.trim(),
        officeType: officeType.trim(),
        address: address?.trim(),
        contactNumber: contactNumber?.trim(),
        email: email?.trim()?.toLowerCase(),
        spOfficeBranch: spOfficeBranch?.trim()
      },
      { new: true, runValidators: true }
    );

    if (!updatedOffice) {
      return res.status(404).json({ success: false, message: "Head Office not found" });
    }

    res.status(200).json({
      success: true,
      message: "Head Office updated successfully",
      data: updatedOffice
    });

  } catch (error) {
    console.error("Edit Error:", error);
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Duplicate entry not allowed"
      });
    }
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Get by ID
exports.getHeadofficeById = async (req, res) => {
  try {
    const office = await HeadOffice.findById(req.params.office_id);
    if (!office) return res.status(404).json({ success: false, message: "Not found" });

    res.status(200).json({
      success: true,
      message: "Head Office fetched",
      data: office
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Get All
exports.getAllHeadoffice = async (req, res) => {
  try {
    const offices = await HeadOffice.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      message: "All Head Offices fetched successfully",
      count: offices.length,
      data: offices
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Delete Head Office
exports.deleteHeadoffice = async (req, res) => {
  try {
    const { office_id } = req.params;
    const office = await HeadOffice.findByIdAndDelete(office_id);

    if (!office) {
      return res.status(404).json({ success: false, message: "Head Office not found" });
    }

    res.status(200).json({
      success: true,
      message: "Head Office deleted successfully",
      deletedId: office_id
    });
  } catch (error) {
    console.error("Delete Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};