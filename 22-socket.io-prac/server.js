const express = require("express");
const http = require("http");
const socketIO = require("socket.io");

const app = express();
// express app으로 http 서버 생성
const server = http.createServer(app);
// socket.io를 http 서버에 연결
const io = socketIO(server);
const PORT = 8000;

const userObjects = {};

app.set("view engine", "ejs");
app.set("views", "./views");

app.get("/", (req, res) => {
    res.render("main");
});

app.get("/chat", (req, res) => {
    res.render("chat");
});

io.on("connection", (socket) => {
    console.log("서버 연결 완료 >", socket.id);

    socket.on("send", (data) => {
        if (data.dm === "all") {
            io.emit("newMessage", {
                id: socket.id,
                username: data.username,
                msg: data.msg,
            });
        } else {
            const dmSocketId = userObjects[data.dm];
            console.log("dmSocketId >", dmSocketId);
            const sendData = {
                id: socket.id,
                username: data.username,
                msg: data.msg,
                dm: "(속닥속닥) ",
            };
            console.log("sendData >", sendData);
            io.to(dmSocketId).emit("newMessage", sendData);
            socket.emit("newMessage", sendData);
        }
    });

    socket.on("setUserList", (data) => {
        if (userObjects[data.username]) {
            io.emit(
                "entryFailed",
                `${data.username}는 사용 중인 아이디입니다.`
            );
        } else {
            console.log("유저 입장 : ", data.username);
            io.emit("notice", `${data.username}님이 입장하셨습니다.`);

            userObjects[data.username] = data.id;
            socket.emit("entrySuccess", data.username);
            io.emit("updateUsers", userObjects);
        }
    });

    socket.on("deletename", (username) => {
        io.emit("deleteuser", username);
    });

    socket.on("disconnect", () => {
        console.log("User disconnected");
        console.log("before >", userObjects);
        for (let key in userObjects) {
            if (socket.id === userObjects[key]) {
                delete userObjects[key];
                io.emit("deleteUser", key);
            }
            console.log("after >", userObjects);
        }
    });
});
server.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});
