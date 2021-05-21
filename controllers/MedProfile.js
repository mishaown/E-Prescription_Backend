const ErrorResponse = require('../utils/errorResponse');
const medicalProfileSchema =  require('../models/Public_Medical_Profile');
const asyncHandler = require('../middleware/async');

//@desc     GET Appointments of doctors by people id
//@router   GET /api/0/doc/people

exports.getPeopleMedData = asyncHandler( async (req, res, next) => {
    let query;

    //Copying from req.query
    const copiedQuery = {...req.query}

    //remove fields
    const removeFields = ['select'];

    //loops and deletes
    removeFields.forEach(param => delete copiedQuery[param]);

    //create query string
    let queryStirng = JSON.stringify(copiedQuery);

    // creating operators 
    queryStirng = queryStirng.replace(/\b(gt|gte|lt|lte|in)\b/g, match=> {`$${match}`});

    // finding resourses 
    query = PEOPLE.find(JSON.parse(queryStirng));

    // select field
    if (req.query.select) {
        const fields = req.query.select.split(',').join(' ');
        query = query.select(fields)
    }

    //query execution
    const haha = await query;

    const data = await medicalProfileSchema.findOne({peopleID});

    if (!data) {
        return next(
            new ErrorResponse('No Data found. ID not valid.', 404)
        )
    }

    res.status(200).json({success: true, data})
})
