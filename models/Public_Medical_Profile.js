const mongoose = require('mongoose');

const apointmentSchema = new mongoose.Schema({
        institutionType: {
            type: String,
            enum: ['Public', 'Private', 'Home']
        },
        institutionID: String,
        doctorID: String,
        prescription: String,
        medicine: [{
            type: String
        }],
        comment: String,
        timestamp: Date
    }
)

const medicalProfileSchema = new mongoose.Schema({
    peopleID: {
        type: String,
        required: ['ID Required!!!', true]
    },
    bloodGroup: {
        type: String,
        enum: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-']
    },
    ageGroup: {
        type: String,
        enum: ['Pediatric', 'Young', 'Middle Age', 'Old']
    },
    specialCondition: String,
    apointedHospital: [{
        id: String,
        admit: Date,
        release: Date
    }],
    appointments: [apointmentSchema],
    createdAt: {
        type: Date,
        default: Date.now
    }
}) 

module.exports = mongoose.model('MEDICAL_PROFILE', medicalProfileSchema)