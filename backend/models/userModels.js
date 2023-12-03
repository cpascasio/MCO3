const mongoose = require("mongoose")

const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        default: "https://static.thenounproject.com/png/5034901-200.png",
    },
    description: {
        type: String,
        default: "No description provided.",
    },
    status: {
        type: String,
        default: "User",
    },
    storeID: {
        type: String,
        ref: "Store",
        default: "",
    },
    upvotes: {
        type: [Schema.Types.ObjectId],
    },
    downvotes: {
        type: [Schema.Types.ObjectId],
    },
    

    
    
    
    
})

module.exports = mongoose.model("User", userSchema, "Users");
