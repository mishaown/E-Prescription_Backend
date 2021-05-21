const mongoose = require('mongoose');

const apointmentSchema = new mongoose.Schema({
        institutionType: {
            type: String,
            enum: ['Public', 'Private', 'Solo']
        },
        institutionID: String,
        doctorID: String,
        prescription: String,
        medicine: [{
            name: String,
            noOfDays: Number,
            noOfTime: Number
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
    name:{
        last_name: {
            type: String,
            required: [true, 'Please add a last name'],
            trim: true,
            maxlength: [15, 'Name can not be more than 15 characters']
        },
        first_name: {
            type: String,
            required: [true, 'Please add a first name'],
            trim: true,
            maxlength: [35, 'Name can not be more than 35 characters']
        }
    }, 
    address: {
        house: String,
        street: String,
        thana: String,
        post_office: String,
        zilla: String,
        division: String,
        zipcode: Number
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