const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const LoginSchema = require('../models/LoginSchema');
const PEOPLE = require('../models/Public_INFO');
const MEDICAL_PROFILE = require('../models/Public_Medical_Profile');

//@desc     POST to register a user
//@router   POST /api/0/people/reg

exports.registerUser = asyncHandler( async (req, res, next) => {
    
    const { firstName, lastName, nid, selectGender, birthDate, postCode, email, phoneNumber, password } = req.body;

    const queryData = {
        "nid": nid,
        "name.last_name": lastName,
        "birthdate": birthDate,
        "gender" : selectGender,
        "address.zipcode": postCode
    }

// MATCHING REGISTRATION INFORMATION 
    const applicant = await PEOPLE.findOne(queryData);

    if (!applicant) {
        return next(
            new ErrorResponse('Data not found!!! invalid.', 404)
        )
    }

// CHECKING IF ALREADY A MEDICAL PROFILE EXISTS OR NOT 
    const CheckMedProfile = await MEDICAL_PROFILE.findOne({peopleID: applicant._id});

    if (CheckMedProfile) {
        return next(
            new ErrorResponse('Account Already Exists', 403)
        )
    }

// CREATING A MEIDCAL PEOFILE 
    const medProfile = await MEDICAL_PROFILE.create({ peopleID: applicant._id, name: applicant.name, address: applicant.address})

    if (!medProfile) {
        return next(
            new ErrorResponse('Uable to create medical profile!!!', 403)
        )
    }

// SIGINGING UP USER INFORMATION 
    const user = await LoginSchema.create({med_id: medProfile._id, nid, password, email, birthDate, phoneNumber})

    if (!user) {
        return next(
            new ErrorResponse('Uable to create an account!!!', 403)
        )
    }

    res.status(200).json({success: true, user})
})