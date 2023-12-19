const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const chatroomsSchema = new Schema(
    {
        myid: {
            unique: true,
            type: String,
            unique: false,
        },
        yourid: {
            require: true,
            type: String,
            unique: false,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("chatrooms", chatroomsSchema);
