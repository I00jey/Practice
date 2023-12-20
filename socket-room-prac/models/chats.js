const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const chatsSchema = new Schema(
    {
        roomid: {
            type: Schema.Types.ObjectId,
            ref: "chatrooms",
            require: true,
        },
        fromid: {
            type: String,
            require: true,
        },
        msg: {
            type: String,
            require: false,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("chats", chatsSchema);
