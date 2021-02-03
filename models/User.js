const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    first: {
        type: String,
        required: true,
    },
    last: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
},
    { timestamps: true }
);

module.exports = User = mongoose.model("user", UserSchema);