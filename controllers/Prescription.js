const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');
const medicalProfileSchema =  require('../models/Public_Medical_Profile');

//@desc     GET Prescription of logged user
//@router   GET /api/0/people/prescription

exports.getUserPrescriptions = asyncHandler( async (req, res, next) => {

    const data = await medicalProfileSchema.findOne({_id: req.user.med_id});

    if (!data) {
        return next(
            new ErrorResponse('No Data found. ID not valid.', 404)
        )
    }

    res.status(200).json({success: true, count: data.appointments.length, data: data.appointments})
})