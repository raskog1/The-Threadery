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
        brand: {
            type: String,
            required: true
        }
    }
);

const CaboodleSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
    drawer: {
        type: [ThreadSchema]
    },
    wishlist: {
        type: [ThreadSchema]
    },
    projects: {
        type: [Object]
    }
},
    { timestamps: true }
);

module.exports = Caboodle = mongoose.model("caboodle", CaboodleSchema);