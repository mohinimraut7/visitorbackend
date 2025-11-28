const mongoose = require('mongoose');

const visitorSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, 'Full name is required'],
        trim: true,
        minlength: [3, 'Name must be at least 3 characters'],
        maxlength: [100, 'Name is too long']
    },

    mobileNumber: {
        type: String,
        required: [true, 'Mobile number is required'],
        unique: true,
        match: [/^[6-9]\d{9}$/, 'Please enter a valid 10-digit Indian mobile number']
    },

    fullAddress: {
        type: String,
        required: [true, 'Full address is required'],
        trim: true,
        maxlength: [300, 'Address is too long']
    },

    pincode: {
        type: String,
        required: [true, 'Pincode is required'],
        match: [/^\d{6}$/, 'Pincode must be exactly 6 digits']
    },

    district: {
        type: String,
        required: [true, 'District is required'],
        trim: true
    },
    policeStation: {
        type: String,
        // required: [true, 'Police station is required'],
        trim: true
    },

    contactPerson: {
        type: String,
        trim: true,
        default: null
    },

    reasonToVisit: {
        type: String,
        // required: [true, 'Reason for visit is required'],
    },

    feedback: {
        type: String,
        // enum: ['Very Satisfied', 'Satisfied', 'Neutral', 'Not Satisfied'],
        default: null
    },

    nextAppointmentDate: {
        type: Date,
        default: null,
        validate: {
            validator: function (value) {
                if (!value) return true;
                return value > new Date();
            },
            message: 'Next appointment date must be in the future'
        }
    },

    entryAt: {
        type: Date,
        default: Date.now
    },

    feedbackGiven: {
        type: Boolean,
        default: false
    },
     visitorPhoto: {
        type: String,                    // Cloudinary / AWS S3 / Local path URL store होगी
        default: null
    },
      spOfficeBranch: {
        type: String,                    // Cloudinary / AWS S3 / Local path URL store होगी
        default: null
    }


    // feedbackSubmittedAt: {
    //     type: Date,
    //     default: null
    // }

}, { 
    timestamps: true 
});

// Indexes for fast search
visitorSchema.index({ mobileNumber: 1 });
visitorSchema.index({ policeStation: 1 });
visitorSchema.index({ entryAt: -1 });

module.exports = mongoose.model('Visitor', visitorSchema);