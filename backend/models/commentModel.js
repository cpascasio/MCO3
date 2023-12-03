const mongoose = require("mongoose")

const Schema = mongoose.Schema

const commentSchema = new Schema({   
    date: {
        type: Date,
        default: Date.now,
      },
    sourceID: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Post",
    },
    userID: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    media: {
        type: [String],
    },
    helpful: {
        type: Number,
        default: 0,
    },
    notHelpful: {
        type: Number,
        default: 0,

    },
    edited: {
        type: Boolean,
        default: false,
    },
    
    
    
})

module.exports = mongoose.model("Comment", commentSchema, "Comments")
