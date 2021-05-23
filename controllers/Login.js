const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const LoginSchema = require('../models/LoginSchema');
const bcrypt = require('bcryptjs');

//@desc     POST to register a user
//@router   POST /api/0/people/login

exports.loginUser = asyncHandler( async (req, res, next) => {

    const { birthdate, phonenumber, password } = req.body;

    if (!birthdate || !password || !phonenumber) {
        return next(new ErrorResponse('Input fields properly!', 400))
    }

    const user = await LoginSchema.findOne({ 
        birthDate: birthdate,
        phoneNumber: phonenumber 
    }).select('+password');

    if (!user) {
        return next(new ErrorResponse('User does not exists!', 401))
    }

    // Password matching
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
        return next(new ErrorResponse('Invalid password!', 401))
    }

    // Sending token response
    tokenResponse(user, 200, res);
})


// Creating cookie 
const tokenResponse = (user, statusCode, res) => {
    // Create token
    const token = user.getSignedJwtToken(); 

    const options = {
        expires: new Date(Date.now + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
        httpOnly: true,
        secure: false
    };

    res.status(statusCode)
        .cookie('token', token, options)
        .json({success: true}) 
}