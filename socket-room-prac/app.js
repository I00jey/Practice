const http = require("http");
const express = require("express");

require("dotenv").config();
const port = process.env.PORT;

const app = express();

app.use("/static", express.static(__dirname + "/static"));
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const router = require("./routes/Rindex");
app.use("/", router);

const dbconnect = require("./models/index");
dbconnect();

// express 앱으로 http 서버를 생성
const server = http.createServer(app);

server.listen(port, () => {
    console.log(`http://localhost:${port}`);
});
