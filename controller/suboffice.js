// const Suboffice = require('../models/suboffice');

// // ========== ADD SUBOFFICE ==========
// exports.addSuboffice = async (req, res) => {
//     try {
//         const {
//             subofficeName,
//             address,
//             contactNumber,
//             email,
//             role,
//             headOfficeName
//         } = req.body;

//         // Required fields check
//         if (!subofficeName || !address || !headOfficeName) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Suboffice Name, Address आणि Head Office Name आवश्यक आहेत!"
//             });
//         }

//         // Check if suboffice already exists
//         const existing = await Suboffice.findOne({ subofficeName });
//         if (existing) {
//             return res.status(400).json({
//                 success: false,
//                 message: "ही Suboffice आधीच अस्तित्वात आहे!"
//             });
//         }

//         const newSuboffice = new Suboffice({
//             subofficeName,
//             address,
//             contactNumber,
//             email,
//             role: role || "Admin",
//             headOfficeName
//         });

//         await newSuboffice.save();

//         res.status(201).json({
//             success: true,
//             message: "Suboffice यशस्वीरित्या जोडले गेले!",
//             suboffice: newSuboffice
//         });

//     } catch (error) {
//         console.error("Error adding suboffice:", error);
//         res.status(500).json({
//             success: false,
//             message: "Suboffice जोडताना त्रुटी आली.",
//             error: error.message
//         });
//     }
// };

// // ========== GET ALL SUBOFFICES ==========
// exports.getSuboffices = async (req, res) => {
//     try {
//         const suboffices = await Suboffice.find().sort({ createdAt: -1 });

//         res.status(200).json({
//             success: true,
//             count: suboffices.length,
//             suboffices
//         });

//     } catch (error) {
//         console.error("Error fetching suboffices:", error);
//         res.status(500).json({
//             success: false,
//             message: "Suboffice ची यादी मिळवताना त्रुटी आली.",
//             error: error.message
//         });
//     }
// };

// // ========== EDIT SUBOFFICE ==========
// exports.editSuboffice = async (req, res) => {
//     try {
//         const { suboffice_id } = req.params;

//         const updateData = {};
//         const fields = ["subofficeName", "address", "contactNumber", "email", "role", "headOfficeName"];

//         fields.forEach(field => {
//             if (req.body[field]) updateData[field] = req.body[field];
//         });

//         const updatedSuboffice = await Suboffice.findByIdAndUpdate(
//             suboffice_id,
//             updateData,
//             { new: true, runValidators: true }
//         );

//         if (!updatedSuboffice) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Suboffice सापडले नाही!"
//             });
//         }

//         res.status(200).json({
//             success: true,
//             message: "Suboffice यशस्वीरित्या अपडेट केले!",
//             suboffice: updatedSuboffice
//         });

//     } catch (error) {
//         console.error("Error updating suboffice:", error);
//         res.status(500).json({
//             success: false,
//             message: "Suboffice अपडेट करता येत नाही.",
//             error: error.message
//         });
//     }
// };

// // ========== DELETE SUBOFFICE ==========
// exports.deleteSuboffice = async (req, res) => {
//     try {
//         const { suboffice_id } = req.params;

//         const deletedSuboffice = await Suboffice.findByIdAndDelete(suboffice_id);

//         if (!deletedSuboffice) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Suboffice सापडले नाही!"
//             });
//         }

//         res.status(200).json({
//             success: true,
//             message: "Suboffice यशस्वीरित्या डिलीट केले!",
//             deletedSuboffice
//         });

//     } catch (error) {
//         console.error("Error deleting suboffice:", error);
//         res.status(500).json({
//             success: false,
//             message: "Suboffice डिलीट करता येत नाही.",
//             error: error.message
//         });
//     }
// };


// =======================================================

// const Suboffice = require('../models/suboffice');
// const HeadOffice = require('../models/headoffice'); // HeadOffice model import

// // ========== ADD SUBOFFICE ==========
// exports.addSuboffice = async (req, res) => {
//     try {
//         const { subofficeName, address, contactNumber, email, role } = req.body;

//         // Required fields check
//         if (!subofficeName || !address) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Suboffice Name आणि Address आवश्यक आहेत!"
//             });
//         }

//         // Check if suboffice already exists
//         const existing = await Suboffice.findOne({ subofficeName });
//         if (existing) {
//             return res.status(400).json({
//                 success: false,
//                 message: "ही Suboffice आधीच अस्तित्वात आहे!"
//             });
//         }

//         // Get the single Head Office
//         const headOffice = await HeadOffice.findOne({ officeType: "Head Office" });
//         if (!headOffice) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Head Office सापडले नाही!"
//             });
//         }

//         const newSuboffice = new Suboffice({
//             subofficeName,
//             address,
//             contactNumber,
//             email,
//             role: role,
//             headOfficeId: headOffice._id   // ← link to Head Office
//         });

//         await newSuboffice.save();

//         res.status(201).json({
//             success: true,
//             message: "Suboffice यशस्वीरित्या जोडले गेले!",
//             suboffice: newSuboffice
//         });

//     } catch (error) {
//         console.error("Error adding suboffice:", error);
//         res.status(500).json({
//             success: false,
//             message: "Suboffice जोडताना त्रुटी आली.",
//             error: error.message
//         });
//     }
// };

// // ========== GET ALL SUBOFFICES ==========
// exports.getSuboffices = async (req, res) => {
//     try {
//         const suboffices = await Suboffice.find()
//             .populate('headOfficeId', 'officeName spOfficeBranch') // populate Head Office info
//             .sort({ createdAt: -1 });

//         res.status(200).json({
//             success: true,
//             count: suboffices.length,
//             suboffices
//         });

//     } catch (error) {
//         console.error("Error fetching suboffices:", error);
//         res.status(500).json({
//             success: false,
//             message: "Suboffice ची यादी मिळवताना त्रुटी आली.",
//             error: error.message
//         });
//     }
// };

// // ========== EDIT SUBOFFICE ==========
// exports.editSuboffice = async (req, res) => {
//     try {
//         const { suboffice_id } = req.params;

//         const updateData = {};
//         const fields = ["subofficeName", "address", "contactNumber", "email", "role"];
//         fields.forEach(field => {
//             if (req.body[field]) updateData[field] = req.body[field];
//         });

//         // Head Office linkage stays the same, single Head Office

//         const updatedSuboffice = await Suboffice.findByIdAndUpdate(
//             suboffice_id,
//             updateData,
//             { new: true, runValidators: true }
//         );

//         if (!updatedSuboffice) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Suboffice सापडले नाही!"
//             });
//         }

//         res.status(200).json({
//             success: true,
//             message: "Suboffice यशस्वीरित्या अपडेट केले!",
//             suboffice: updatedSuboffice
//         });

//     } catch (error) {
//         console.error("Error updating suboffice:", error);
//         res.status(500).json({
//             success: false,
//             message: "Suboffice अपडेट करता येत नाही.",
//             error: error.message
//         });
//     }
// };

// // ========== DELETE SUBOFFICE ==========
// exports.deleteSuboffice = async (req, res) => {
//     try {
//         const { suboffice_id } = req.params;

//         const deletedSuboffice = await Suboffice.findByIdAndDelete(suboffice_id);

//         if (!deletedSuboffice) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Suboffice सापडले नाही!"
//             });
//         }

//         res.status(200).json({
//             success: true,
//             message: "Suboffice यशस्वीरित्या डिलीट केले!",
//             deletedSuboffice
//         });

//     } catch (error) {
//         console.error("Error deleting suboffice:", error);
//         res.status(500).json({
//             success: false,
//             message: "Suboffice डिलीट करता येत नाही.",
//             error: error.message
//         });
//     }
// };


// ===============================================================================================

const Suboffice = require('../models/suboffice');
const HeadOffice = require('../models/headoffice'); // HeadOffice model import
const mongoose = require('mongoose');
const validRoles = ["Admin", "Administrative Officer", "Visitor"];

// ========== ADD SUBOFFICE ==========
exports.addSuboffice = async (req, res) => {
    try {
        const { subofficeName, address, contactNumber, email, role, headOfficeId } = req.body;

        // Required fields check
        if (!subofficeName || !address || !headOfficeId) {
            return res.status(400).json({
                success: false,
                message: "Suboffice Name, Address आणि Head Office ID आवश्यक आहेत!"
            });
        }

        // Role validation
        // if (!role || !validRoles.includes(role)) {
        //     return res.status(400).json({
        //         success: false,
        //         message: `Role आवश्यक आहे आणि त्यापैकी एक असावा: ${validRoles.join(", ")}`
        //     });
        // }

        // Check if suboffice already exists
        const existing = await Suboffice.findOne({ subofficeName });
        if (existing) {
            return res.status(400).json({
                success: false,
                message: "ही Suboffice आधीच अस्तित्वात आहे!"
            });
        }

        // Check Head Office exists
        const headOffice = await HeadOffice.findById(headOfficeId);
        if (!headOffice) {
            return res.status(404).json({
                success: false,
                message: "दिलेल्या ID साठी Head Office सापडले नाही!"
            });
        }

        const newSuboffice = new Suboffice({
            subofficeName,
            address,
            contactNumber,
            email,
            role,
            headOfficeId
        });

        await newSuboffice.save();

        res.status(201).json({
            success: true,
            message: "Suboffice added successfully",
            suboffice: newSuboffice
        });

    } catch (error) {
        console.error("Error adding suboffice:", error);
        res.status(500).json({
            success: false,
            message: "Failed to add suboffice.",
            error: error.message
        });
    }
};

// ========== GET ALL SUBOFFICES ==========
exports.getSuboffices = async (req, res) => {
    try {
        const suboffices = await Suboffice.find()
            .populate('headOfficeId', 'officeName spOfficeBranch') // populate Head Office info
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: suboffices.length,
            suboffices
        });

    } catch (error) {
        console.error("Error fetching suboffices:", error);
        res.status(500).json({
            success: false,
            message: "Suboffice ची यादी मिळवताना त्रुटी आली.",
            error: error.message
        });
    }
};

// ========== EDIT SUBOFFICE ==========
exports.editSuboffice = async (req, res) => {
    try {
        const { suboffice_id } = req.params;

        const updateData = {};
        const fields = ["subofficeName", "address", "contactNumber", "email", "role"];
        fields.forEach(field => {
            if (req.body[field]) updateData[field] = req.body[field];
        });

        // Optional: Role validation on update
        if (updateData.role && !validRoles.includes(updateData.role)) {
            return res.status(400).json({
                success: false,
                message: `Role वैध असावा: ${validRoles.join(", ")}`
            });
        }

        // Optional: allow updating Head Office ID
        if (req.body.headOfficeId) {
            const headOffice = await HeadOffice.findById(req.body.headOfficeId);
            if (!headOffice) {
                return res.status(404).json({
                    success: false,
                    message: "दिलेल्या ID साठी Head Office सापडले नाही!"
                });
            }
            updateData.headOfficeId = req.body.headOfficeId;
        }

        const updatedSuboffice = await Suboffice.findByIdAndUpdate(
            suboffice_id,
            updateData,
            { new: true, runValidators: true }
        );

        if (!updatedSuboffice) {
            return res.status(404).json({
                success: false,
                message: "Suboffice सापडले नाही!"
            });
        }

        res.status(200).json({
            success: true,
            message: "Suboffice यशस्वीरित्या अपडेट केले!",
            suboffice: updatedSuboffice
        });

    } catch (error) {
        console.error("Error updating suboffice:", error);
        res.status(500).json({
            success: false,
            message: "Suboffice अपडेट करता येत नाही.",
            error: error.message
        });
    }
};

// ========== DELETE SUBOFFICE ==========
exports.deleteSuboffice = async (req, res) => {
    try {
        const { suboffice_id } = req.params;

        const deletedSuboffice = await Suboffice.findByIdAndDelete(suboffice_id);

        if (!deletedSuboffice) {
            return res.status(404).json({
                success: false,
                message: "Suboffice सापडले नाही!"
            });
        }

        res.status(200).json({
            success: true,
            message: "Suboffice यशस्वीरित्या डिलीट केले!",
            deletedSuboffice
        });

    } catch (error) {
        console.error("Error deleting suboffice:", error);
        res.status(500).json({
            success: false,
            message: "Suboffice डिलीट करता येत नाही.",
            error: error.message
        });
    }
};


// ---------------------------
// Get All SubOffices by HeadOffice ID (Supports Multiple Head Offices)
// ---------------------------


exports.getSubOfficesByHeadOfficeId = async (req, res) => {
    try {
        const { headOfficeId } = req.params;

        // Validate ObjectId
        if (!mongoose.Types.ObjectId.isValid(headOfficeId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid HeadOffice ID format"
            });
        }

        // Find all SubOffices linked to this HeadOffice
        const suboffices = await Suboffice.find({ headOfficeId })
            .populate('headOfficeId', 'officeName spOfficeBranch headOfficeName email contactNumber')
            .sort({ subofficeName: 1 }); // alphabetical order

        if (suboffices.length === 0) {
            return res.status(200).json({
                success: true,
                count: 0,
                message: "No Sub Offices found for this Head Office",
                suboffices: []
            });
        }

        res.status(200).json({
            success: true,
            count: suboffices.length,
            headOfficeId,
            suboffices
        });

    } catch (error) {
        console.error("Error fetching SubOffices by HeadOffice:", error);
        res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message
        });
    }
};




// ========== GET SINGLE SUBOFFICE BY ID (FULL DETAILS) ==========
exports.getSubofficeById = async (req, res) => {
    try {
        const { suboffice_id } = req.params;

        // Validate ObjectId
        // if (!mongoose.Types.ObjectId.isValid(suboffice_id)) {
        //     return res.status(400).json({
        //         success: false,
        //         message: "Invalid Suboffice ID"
        //     });
        // }

        const suboffice = await Suboffice.findById(suboffice_id)
            .populate('headOfficeId', 'officeName headOfficeName spOfficeBranch email contactNumber address')
            .lean(); // performance साठी lean() चांगलं

        if (!suboffice) {
            return res.status(404).json({
                success: false,
                message: "Suboffice not found!"
            });
        }

        res.status(200).json({
            success: true,
            message: "Suboffice find successfully",
            suboffice
        });

    } catch (error) {
        console.error("Error fetching suboffice by ID:", error);
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
};