const ErrorResponse = require("../utils/errorResponse");

const errorHandler = (err, req, res, next) => {

    let error = { ...err }
    error.message = err.message;

    //LOG FOR DEVS
    console.log(err.message);

    //MONGOOSE BAD OBJECTID
    if(err.name === 'CastError') {
        const message = `DATA not found. Object_ID Error: ${err.value}`
        error = new ErrorResponse(message, 404);
    }
    //MONGODB DUPLICATE KEY ERROR
    if (err.code === 11000) {
        const message = 'Duplicate key entered where unique is true.'
        error = new ErrorResponse(message, 400)        
    } 

    //MONGOOSE VALIDATION ERROR
    if (err.name === 'ValidationError') {
        const message = Object.values(err.errors).map(val => val.message);
        error = new ErrorResponse(message, 400);
    }

    // MONGOOSE TYPE ERROR
    if( err.name === 'TypeError') {
        const message = error.message;
        error = new ErrorResponse(message, 400);
    }

    res.status(error.statusCode || 500).json({
        success: false,
        error: error.message || 'Server ERROR!!!'
    });
}

module.exports = errorHandler;