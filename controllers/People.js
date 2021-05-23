const ErrorResponse = require('../utils/errorResponse');
const PEOPLE = require('../models/Public_INFO');
const asyncHandler = require('../middleware/async');

//@desc     GET ALL PEOPLE DATA
//@router   GET /api/0/people/get

exports.getAllPeople = asyncHandler( async (req, res, next) => {

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
    const people = await query;

    res.status(200).json({success: true, count: people.length, data: people})
})

//@desc     GET A SINGLE PEOPLE'S DATA
//@router   GET /api/0/people/get/:id

exports.getPeople = asyncHandler( async (req, res, next) => {

    const people = await PEOPLE.findById(req.params.id);
    
    if (!people) {
        return next(new ErrorResponse(`No data found with this id ${req.params.id}`, 404)); 
    }

    res.status(200).json({success: true, data: people})
})