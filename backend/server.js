const express = require("express")
const dotenv = require("dotenv")
dotenv.config()
const PORT = process.env.PORT
const morgan = require("morgan")
const PostsRouter = require("./router/post.route")
const mongoose = require("mongoose")
const AuthRouter = require("./router/auth.route")
const cookieParser = require("cookie-parser");

const app = express()

app.use(cookieParser())
app.use(morgan("dev"))
app.use(express.json())

app.use("/api/post", PostsRouter)
app.use("/api/auth", AuthRouter )

mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        console.log("DB is Connected")
        
        app.listen(PORT, () => console.log("server is running on port", PORT))
    })