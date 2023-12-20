const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const chatroomsSchema = new Schema(
    {
        myid: {
            type: String,
            unique: false,
            require: true,
        },
        yourid: {
            require: true,
            type: String,
            unique: false,
        },
        // roomid: {
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: "chats",
        //     unique: true,
        //     require: true,
        // },
    },
    {
        timestamps: true,
    }
);

// 저장하기 전에 roomid를 _id 값으로 설정
// Middleware to set roomid to _id before saving
// chatroomsSchema.pre("save", function (next) {
//     this.roomid = this._id;
//     next();
// });

module.exports = mongoose.model("chatrooms", chatroomsSchema);
