const socketController = require("../controller/socketController");
const chatrooms = require("../models/chatrooms");
require("dotenv").config();

exports.product = (req, res) => {
    res.render("product");
};
exports.getchatrooms = async (req, res) => {
    let mychatrooms;
    const { myid, yourid } = req.query;
    console.log(myid, yourid);
    try {
        const frommyid = await chatrooms.find({
            myid: myid,
        });
        console.log("내가 보낸 채팅방", frommyid);
        const tomyid = await chatrooms.find({
            yourid: myid,
        });
        console.log("내가 받은 채팅방", tomyid);
        if (frommyid.length > 0 || tomyid.length > 0) {
            mychatrooms = [...frommyid, ...tomyid];
            console.log("내가 포함된 모든 채팅방 >", mychatrooms);
        } else {
            mychatrooms = await chatrooms.create({
                myid: myid,
                yourid: yourid,
            });
            console.log("새로 생성된 room >", mychatrooms);
        }
    } catch (error) {
        console.log("crate 오류 >", error);
    }
    res.render("chatrooms", { mychatrooms });
};

exports.createchatroom = async (req, res) => {
    const { roomid } = req.params;
    console.log(yourid);
    const newchatroom = await chatrooms.create({
        myid: myid,
        yourid: yourid,
    });
    const roomId = newchatroom._id;
    res.send({ newchatroom, roomId });
};
exports.getchats = async (req, res) => {
    const { roomid } = req.query.roomid;
    console.log(roomid);
    res.render("chats");
};
