const auth = require('../models/auth')

// Middleware to check if the user has correct auth token
// if invalid token, return 401
// if token is expired, it is deleted and 401 is returned
// if token is valid, call next middleware
async function auth_middleware(req, res, next) {
    if (req.path === process.env.BASE_URL + '/login') {
        return next()
    }
    const token = req.headers['authorization'];
    const expiry = await auth.get_expiry(token);
    if (!expiry) {
        return res.status(401).send({ success: false, message: "Invalid Token" });
    }
    else if (new Date() > new Date(expiry.valid_till)) {
        await auth.delete_token(token);
        return res.status(401).send({ success: false, message: "Token expired, deleted it" });
    }
    else {
        next()
    }
}

module.exports = auth_middleware