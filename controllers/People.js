const ErrorResponse = require('../utils/errorResponse');
const PEOPLE = require('../models/Public_INFO');
const asyncHandler = require('../middleware/async');

//@desc     GET ALL PEOPLE DATA
//@router   GET /api/0/people/get

exports.getAllPeople = asyncHandler( async (req, res, next) => {

    const people = await PEOPLE.find();

    res.status(200).json({success: true, count: people.length, data: people})
})

//@desc     GET A SINGLE PEOPLE'S DATA
//@router   GET /api/0/people/:id

exports.getPeople = asyncHandler( async (req, res, next) => {

    const people = await PEOPLE.findById(req.params.id);
    
    if (!people) {
        return next(new ErrorResponse(`No data found with this id ${req.params.id}`, 404)); 
    }

    res.status(200).json({success: true, data: people})
})