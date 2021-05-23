const JWT = require('jsonwebtoken');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const LoginSchema = require('../models/LoginSchema');


// Protect Routes
exports.protect = asyncHandler( async (req, res, next) => {

    let token;

    if (req.headers.authorization && 
        req.headers.authorization.startsWith('MED_id')) {
        
            token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.token) {
        token = req.cookies.token;
    }

    if (!token) {
        return next(new ErrorResponse('Not Authorized!!!', 401));
    }

    try {
        // Verifiy TOken
        const decoded = JWT.verify(token, process.env.JWT_SECRET);
        
        const user = await LoginSchema.findOne({med_id: decoded.MED_id});

        req.user = {  role: user.role, med_id: user.med_id };
        next();

    } catch (error) {
        return next(new ErrorResponse('Not Authorized!!!', 401));
    }
})

// Authorize based on roles

exports.authorize = (...roles)=> {
    return (req, res, next) =>{
        if(!roles.includes(req.user.role)) {
            return next(new ErrorResponse(`${req.user.role} is not authorized to access this route!`, 403));
        }
        next();
    }
}