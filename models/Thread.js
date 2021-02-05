const mongoose = require("mongoose");

const ThreadSChema = new mongoose.Schema(
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
        }
    }
);

module.exports = Thread = mongoose.model("thread", ThreadSChema);