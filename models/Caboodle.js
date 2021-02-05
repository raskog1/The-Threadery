const mongoose = require("mongoose");

const CaboodleSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
    drawer: {
        type: [Object]
    },
    wishlist: {
        type: [Object]
    }
},
    { timestamps: true }
);

module.exports = Caboodle = mongoose.model("caboodle", CaboodleSchema);