const chatrooms = require("../models/chatrooms");
const chats = require("../models/chats");
const moment = require("moment");
require("dotenv").config();

exports.product = (req, res) => {
    res.render("product");
};
exports.getchatrooms = async (req, res) => {
    let mychatrooms;
    const { myid, yourid } = req.query;
    console.log("내 아이디와 상대방 아이디 >", myid, yourid);
    try {
        const frommyid = await chatrooms.find({
            myid: myid,
        });
        console.log("내가 보낸 채팅방", frommyid);
        const tomyid = await chatrooms.find({
            yourid: myid,
        });
        console.log("내가 받은 채팅방", tomyid);
        mychatrooms = [...frommyid, ...tomyid];

        const meYouchatroom1 = await chatrooms.find({
            myid: myid,
            yourid: yourid,
        });
        const meYouchatroom2 = await chatrooms.find({
            myid: yourid,
            yourid: myid,
        });
        if (!meYouchatroom1.length && !meYouchatroom2.length) {
            let meYouChatroom = await chatrooms.create({
                myid: myid,
                yourid: yourid,
            });
            console.log("새로운 room", meYouChatroom);
            mychatrooms.push(meYouChatroom);
        }
    } catch (error) {
        console.log("crate 오류 >", error);
    }

    // 내림차순 정렬
    mychatrooms = mychatrooms.sort(function (a, b) {
        return b.updatedAt - a.updatedAt;
    });
    mychatrooms = mychatrooms.map((room) => {
        return {
            ...room._doc,
            updatedAt: moment(room.updatedAt).format("YYYY-MM-DD HH:mm"),
        };
    });
    res.render("chatrooms", { mychatrooms, myid });
};

exports.createchatroom = async (req, res) => {
    try {
        const { yourid, myid } = req.body;
        let newchatroom = await chatrooms.create({
            myid: myid,
            yourid: yourid,
        });
        newchatroom = {
            ...newchatroom._doc,
            updatedAt: moment(newchatroom.updatedAt).format("YYYY-MM-DD HH:mm"),
        };
        console.log(newchatroom);
        res.send({ newchatroom });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Error creating chatroom" });
    }
};

exports.putchats = async (req, res) => {
    console.log(req.body.room);
    console.log(req.body.username);
    console.log(req.body.msg);
};
exports.getchats = async (req, res) => {
    const { room, username } = req.query;
    // console.log(room, username);
    const previousData = await chats.find({ roomid: room });
    console.log(previousData);
    if (!previousData.length) {
        res.render("chats");
    } else {
        res.render("chats", { previousData, username });
    }
};
