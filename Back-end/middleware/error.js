const ErrorHander = require('../utils/errorhandler');

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";

    // wrong Mnngoodb ID Error
    if (err.name === "CastError") {
        const message = `Resource not found. Invalid: ${err.path}`;
        err = new ErrorHander(message, 400);
    }

    // mongoose duplicate key error
    if (err.code === 11000) {
        const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
        err = new ErrorHander(message, 400);
    }

    // wrong JWT token
    if (err.name === "JsonWebTokenError") { 
        const message = "Json Web Token is invalid, Try again";
        err = new ErrorHander(message, 400);
    }

    // JWT expire token
    if (err.name === "TokenExpiredeError") { 
        const message = "Json Web Token is Expired, Try again";
        err = new ErrorHander(message, 400);
    }

    res.status(err.statusCode).json({
        susccess: false,
        message: err.message,
    });
};