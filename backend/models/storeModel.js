const mongoose = require("mongoose")

const Schema = mongoose.Schema

const storeSchema = new Schema({
    ownerID: {
        type: String,
        required: true,
    },
    storeName: {
        type: String,
        required: true,
    },
    icon: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        default: "No description provided.",
        required: true,
    },
    rating: {
        type: Number,
        default: 0,
    },
    price: {
        type: Number,
        required: true,
    },
    priceRange: {
        type: String,
        required: true,
    },
    mode: {
        type: String,
        default: "Dine-in / Takeout",
    },
    image: {
        type: [String],
        required: true,
    },
    location: {
        type: String,
        required: true,
    },

    schedule: {
        type: [String],
        required: true,
    },
    contact: {
        type: String,
        required: true,
    },
    


    
})

module.exports = mongoose.model("Store", storeSchema, "Stores")
