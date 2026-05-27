const express = require("express")
const authrouter = express.Router()
const {
    signUp,
    verify,
    login
} = require("../controller/auth.controller")

authrouter.post("/signup", signUp);

authrouter.get("/verify/:code", verify);

authrouter.post("/login", login);

module.exports = authrouter