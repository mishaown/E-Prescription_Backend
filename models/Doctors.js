const mongoose = require('mongoose');

const DoctorSchema = new mongoose.Schema({
    peopleID: {
        type: String,
        required: ['ID Required!!!', true],
        unique: ['ID already exists!!!',true]
    },
    education: [{
        degree: String,
        institutionName: String,
        graduationYear: Date,
        professionalStatement: String
    }],
    doctorID: {
        type: String,
        required: ['Doctor ID Required!!!', true],
        unique: ['DOCTOR ID already exists!!!',true]
    },
    feildOfExpertise: [String],
    practicingStatus: {
        type: String,
        enum: ['Private', 'Public', 'Solo', 'Suspend', 'Revoked'],
        default: 'Solo'
    },
    hospitalAffliation: [{
        hospitalID: String,
        hospitalName: String,
        startDate: Date,
        endDate: Date
    }],
    appointments: [{
        id: String,
        peopleID: String,
        timestamp: Date
    }]

})

module.exports = mongoose.model('Doctors', DoctorSchema);
