const mongoose = require('mongoose');

const subofficeSchema = new mongoose.Schema({

    subofficeName: {
        type: String,
        required: true,
        unique: true
    },

    address: {
        type: String,
        required: true
    },

    contactNumber: {
        type: String
    },

    email: {
        type: String
    },

    role: {
        type: String,
    },

    // Sub Office Type
    officeType: {
        type: String,
        default: "Sub Office",
        required: true
    },
    
       headOfficeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "HeadOffice",
        required: true
    }

}, { timestamps: true });

module.exports = mongoose.model("Suboffice", subofficeSchema);
