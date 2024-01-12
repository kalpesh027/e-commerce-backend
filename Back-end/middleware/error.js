const ErrorHandelr = require('../middleware/error');

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";

    // wrong Mnngoodb ID Error
    if (err.name === "CastError") {
        const message = `Resource not found. Invalid: ${err.path}`;
        err = new ErrorHandelr(message, 400);
    }

    res.status(err.statusCode).json({
        susccess: false,
        message: err.message,
    });
};