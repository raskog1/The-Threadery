const mongoose = require("mongoose");

const DMCSChema = new mongoose.Schema(
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
            default: ""
        }
    }
);

module.exports = DMC = mongoose.model("dmc", DMCSChema);