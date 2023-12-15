// app.js 파일에 추가
const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.port;

app.set("view engine", "ejs");
app.set("views", "./views");
app.use("/static", express.static("/static"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const connectDB = require("./config/mongoose");
connectDB();

const indexRouter = require("./routes/Rindex");
app.use("/", indexRouter);

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
