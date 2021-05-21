const ErrorResponse = require('../utils/errorResponse');
const medicalProfileSchema =  require('../models/Public_Medical_Profile');
const doctorSchema = require('../models/Doctors');
const asyncHandler = require('../middleware/async');

//@desc     GET Appointments of doctors by people id
//@router   GET /api/0/doc/appointment/:id

exports.getDoctorAppointment = asyncHandler( async (req, res, next) => {

    let peopleID = req.params.id;

    const data = await medicalProfileSchema.findOne({peopleID});

    if (!data) {
        return next(
            new ErrorResponse('No Data found. ID not valid.', 404)
        )
    }

    res.status(200).json({success: true, count: data.appointments.length, data: data.appointments})
})


//@desc     POST APOINTMENTS OF DOCTORS
//@router   POST /api/0/doc/appointment
exports.doctorAppointment = asyncHandler( async (req, res, next) => {

    const _data = req.body;
    const peopleID = req.params.id;
 
    const data = await medicalProfileSchema.findOneAndUpdate({peopleID}, { $push: {appointments: _data}}, {new: true, runValidators: true})

    console.log(data._id);
     
    if (!data) {
        return next(
            new ErrorResponse('No Data found. ID not valid.', 404)
        )
    }
 
    res.status(200).json({success: true, count: data.appointments.length, data})
})