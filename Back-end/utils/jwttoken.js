//creating token and saving in cookie

const sendToken = (user, statusCode, res) => {
    // Create token
    const token = user.getJWTToken();

    // Options for cookie
    const options = {
        expires: new Date(
            new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
        ),
        httpOnly: true,
    };

    // Send the response with the token as a cookie
    res.status(statusCode).cookie('token', token, options).json({
        success: true,
        user,
        token
    });
};

module.exports = sendToken;
