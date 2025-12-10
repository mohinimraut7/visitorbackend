const mongoose = require('mongoose');

const officeSchema = new mongoose.Schema({
    officeType: {
        type: String,
    },
}, { timestamps: true });

module.exports = mongoose.model("Office",officeSchema);
