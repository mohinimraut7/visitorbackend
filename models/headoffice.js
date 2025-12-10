const mongoose = require('mongoose');

const headOfficeSchema = new mongoose.Schema({
    officeName: {
        type: String,
     
        unique: true
    },

    address: {
        type: String,
        
    },

    contactNumber: {
        type: String
    },

    email: {
        type: String
    },

    // Head Office = Super Admin
    role: {
        type: String,
    },

    // Main Office Type
    officeType: {
        type: String,
    },

    // Default Head Office Name
    headOfficeName: {
        type: String,
    },

    // 🔵 SP Office Branch (उदा. Bhiwandi, Shahapur, Murbad...)
   spOfficeBranch: {
    type: String
}

}, { timestamps: true });

module.exports = mongoose.model("HeadOffice", headOfficeSchema);
