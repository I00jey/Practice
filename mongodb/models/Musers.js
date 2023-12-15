const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const userSchema = new Schema({
    id: {
        required: true,
        unique: true,
        type: String,
    },
    pw: {
        required: true,
        type: String,
    },
});

module.exports = mongoose.model("User", userSchema);
