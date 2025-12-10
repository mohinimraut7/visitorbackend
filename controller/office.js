const Office = require('../models/office');

// ADD OFFICE TYPE
exports.addOffice = async (req, res) => {
  const { officeType } = req.body;

  try {
    if (!officeType) {
      return res.status(400).json({
        message: "officeType is required",
      });
    }

    const formattedType = officeType.trim();

    // Check duplicate officeType (case insensitive)
    const existingOffice = await Office.findOne({
      officeType: { $regex: `^${formattedType}$`, $options: 'i' }
    });

    if (existingOffice) {
      return res.status(400).json({
        message: "This office type already exists",
      });
    }

    const newOffice = new Office({
      officeType: formattedType,
    });

    await newOffice.save();

    return res.status(201).json({
      message: "Office type added successfully!",
      office: {
        id: newOffice._id,
        officeType: newOffice.officeType,
        createdAt: newOffice.createdAt,
      },
    });
  } catch (error) {
    console.error("Error in addOffice:", error);
    return res.status(500).json({
      message: "Failed to add office type",
      error: error.message,
    });
  }
};

// GET ALL OFFICE TYPES
exports.getOffices = async (req, res) => {
  try {
    const offices = await Office.find().sort({ createdAt: -1 });

    return res.status(200).json({
      message: "Office types retrieved successfully",
      count: offices.length,
      offices,
    });
  } catch (error) {
    console.error("Error in getOffices:", error);
    return res.status(500).json({
      message: "Failed to fetch office types",
      error: error.message,
    });
  }
};

// GET SINGLE OFFICE TYPE
exports.getOfficeById = async (req, res) => {
  try {
    const office = await Office.findById(req.params.id);

    if (!office) {
      return res.status(404).json({ message: "Office type not found" });
    }

    return res.status(200).json({
      message: "Office type found",
      office,
    });
  } catch (error) {
    console.error("Error in getOfficeById:", error);
    return res.status(500).json({
      message: "Failed to fetch office type",
      error: error.message,
    });
  }
};

// UPDATE OFFICE TYPE
exports.editOffice = async (req, res) => {
  const { officeType } = req.body;

  try {
    if (!officeType) {
      return res.status(400).json({
        message: "officeType is required",
      });
    }

    const office = await Office.findById(req.params.id);

    if (!office) {
      return res.status(404).json({ message: "Office type not found" });
    }

    const formattedType = officeType.trim();

    // Prevent duplicate (except current one)
    const duplicate = await Office.findOne({
      officeType: { $regex: `^${formattedType}$`, $options: 'i' },
      _id: { $ne: req.params.id }
    });

    if (duplicate) {
      return res.status(400).json({
        message: "This office type already exists",
      });
    }

    office.officeType = formattedType;
    await office.save();

    return res.status(200).json({
      message: "Office type updated successfully!",
      office: {
        id: office._id,
        officeType: office.officeType,
        updatedAt: office.updatedAt,
      },
    });
  } catch (error) {
    console.error("Error in editOffice:", error);
    return res.status(500).json({
      message: "Failed to update office type",
      error: error.message,
    });
  }
};

// DELETE OFFICE TYPE
exports.deleteOffice = async (req, res) => {
  try {
    const office = await Office.findById(req.params.id);

    if (!office) {
      return res.status(404).json({ message: "Office type not found" });
    }

    await Office.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      message: "Office type deleted successfully!",
      deletedOfficeId: req.params.id,
    });
  } catch (error) {
    console.error("Error in deleteOffice:", error);
    return res.status(500).json({
      message: "Failed to delete office type",
      error: error.message,
    });
  }
};