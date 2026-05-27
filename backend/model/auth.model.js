const mongoose = require("mongoose");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const usersSchema = new mongoose.Schema(
    {
        fullname: {
            type: String,
            required: [true, "Fullname is required"],
            lowercase: true,
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: 6,
            maxLength: 12,
            trim: true,
            select: false
        },
        isVerified: {
            type: Boolean,
            default: false
        },
        verificationCode: String
    },
    {
        timestamps: true
    }
);

usersSchema.pre("save", async function () {
    if (!this.isModified("password")) return;
    this.password = await bcrypt.hash(this.password, 10);
});

usersSchema.methods.createEmailVerificationToken = function() {
    const code = crypto.randomBytes(12).toString("hex");
    this.verificationCode = code;
    return code;
};
usersSchema.methods.signToken = function() {
    return jwt.sign({id: this._id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_SECRET_EXPIRES_IN})
};

usersSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password)
};

const Users = mongoose.model("Users", usersSchema);

module.exports = Users;