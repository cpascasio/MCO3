require("dotenv").config()

const express = require("express")
const userRoutes = require("./routes/users")
const storeRoutes = require("./routes/stores")
const { default: mongoose } = require("mongoose")
const cors = require("cors")
const fileUpload = require("express-fileupload")
const postRouter = require("./routes/posts")
const commentRouter = require("./routes/comments")

// express app
const app = express()

// middleware
app.use(express.json())
app.use(cors())
app.use(fileUpload({useTempFiles: true}))

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// routes
app.use("/api/users", userRoutes);
app.use("/api/stores", storeRoutes);
app.use("/api/posts", postRouter)
app.use("/api/comments", commentRouter)


// connect to db
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log("listening for requests on port", process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })
