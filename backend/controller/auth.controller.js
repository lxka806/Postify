const Users = require("../model/auth.model.js")
const catchAsync = require("../utils/CatchAsync.js");
const AppError = require("../utils/AppError.js");
const { sendEmail } = require("../utils/email.js");

const createSendToken = (user, statusCode, res, options = {}) => {
    const token = user.signToken();

    const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
        path: "/",
        maxAge: parseInt(process.env.COOKIE_EXPIRE_IN, 10) * 24 * 60 * 60 * 1000
    };

    user.password = undefined;

    const response = res.cookie("lg", token, cookieOptions);

    if (options.redirectUrl) {
        return response.redirect(options.redirectStatus || 302, options.redirectUrl);
    }

    return response.status(statusCode).json(user);
};

const signUp = catchAsync(async (req, res, next) => {
    const { fullname, email, password } = req.body;
    const newUser = await Users.create({ fullname, email, password });

    const code = newUser.createEmailVerificationToken();
    await newUser.save({ validateBeforeSave: false });

    const url = `${req.protocol}://${req.get("host")}/api/auth/verify/${code}`;
    const html = `
        <h1>Welcome to Posts Website</h1>
        <a href="${url}">Verify Your Email</a>
    `;
    
    try {
        await sendEmail({
            to: newUser.email,
            subject: "Welcome to our Post Website - verify your email",
            html
        });

        res.status(201).json({
            message: "Verification link has been sent to your email"
        });  
    } catch (err) {
        console.log(err);
    }
});

const verify = catchAsync(async (req, res, next) => {
    const { code } = req.params;

    const user = await Users.findOne({ verificationCode: code });

    if (!user) {
        return next(new AppError("Invalid or expired verification code", 400));
    }

    user.verificationCode = undefined;
    user.isVerified = true;

    await user.save({ validateBeforeSave: false });

    res.status(200).json("Email verified successfully!");
});

const login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;

    const user = await Users.findOne({ email }).select("+password");

    if (!user) {
        return next(new AppError("Invalid email or password", 401));
    }

    if (!user.isVerified) {
        return next(new AppError("You must verify your email first", 403));
    }

    const isValidPassword = await user.comparePassword(password);

    if (!isValidPassword) {
        return next(new AppError("Invalid email or password", 401));
    }

    createSendToken(user, 200, res);
});

module.exports = {
    signUp,
    verify,
    login,
};