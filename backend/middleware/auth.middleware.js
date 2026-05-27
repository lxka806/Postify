const jwt = require("jsonwebtoken");
const Users = require("../model/auth.model"); 
const AppError = require("../utils/AppError");

const protect = async (req, res, next) => {
    try {
        let token;

        // 1. Check if token exists in cookies
        if (req.cookies && req.cookies.lg) {
            token = req.cookies.lg;
        } 
        // 2. Fallback to check if token exists in Authorization Header
        else if (
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")
        ) {
            token = req.headers.authorization.split(" ")[1];
        }

        // If no token is found anywhere, stop the request
        if (!token) {
            return next(new AppError("Not logged in! Please log in to get access.", 401));
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await Users.findById(decoded.id);

        if (!user) {
            return next(new AppError("The user belonging to this token no longer exists.", 401));
        }

        req.user = user;
        next();

    } catch (err) {
        console.error("JWT Error:", err.message);
        return next(new AppError("Invalid token", 401));
    }
};

module.exports = { protect };