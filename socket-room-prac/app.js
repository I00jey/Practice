const http = require("http");
const express = require("express");

const port = 8000;

const app = express();

app.use("/static", express.static(__dirname + "/static"));
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
    res.render("index");
});
app.get("/chat", (req, res) => {
    res.render("chat");
});
// express 앱으로 http 서버를 생성
const server = http.createServer(app);
// 소켓 초기화
const mainController = require("./controller/mainController");
mainController(server);
server.listen(port, () => {
    console.log(`http://localhost:${port}`);
});
