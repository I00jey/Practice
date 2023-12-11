const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const session = require("express-session");

const app = express();
const db = require("./models/index");
const PORT = process.env.PORT || 8888;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// TODO: express-session 미들웨어 등록
app.use(
    session({
        secret: "mySecret",
        resave: false,
        saveUninitialized: true,
        cookie: {
            httpOnly: true,
            maxAge: 60 * 1000
        }
    })
);
// TODO: routes/user 요청 경로 분리
const indexRouter = require("./routes/user");
app.use("/", indexRouter);

// TODO: 404 처리
app.get("*", (req, res) => {
    res.render("404");
});

db.sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => {
        console.log(`http://localhost:${PORT}`);
    });
});
