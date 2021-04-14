const mongoose = require('mongoose');

const DoctorSchema = new mongoose.Schema({
    peopleID: {
        type: String,
        required: ['ID Required!!!', true]
    },
    education: [{
        degree: String,
        institutionName: String,
        graduationYear: Date,
        professionalStatement: String
    }],
    doctorID: Number,
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
    }]

})

module.exports = mongoose.model('Doctors', DoctorSchema);
