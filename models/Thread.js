const mongoose = require("mongoose");

const ThreadSchema = new mongoose.Schema(
    {
        num: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        color: {
            type: String
        },
        note: {
            type: String,
        },
        count: {
            type: Number,
            default: 0
        },
        partial: {
            type: Number,
            default: 0
        },
        favorite: {
            type: Boolean,
            default: false
        },
        wishlist: {
            type: Boolean,
            default: false
        },
        wishCount: {
            type: Number,
            default: 0
        },
        brand: {
            type: String,
            require: true
        }
    }
);

module.exports = Thread = mongoose.model("thread", ThreadSchema);