const express = require("express");
const app = express();
const PORT = 8000;
const db = require("./models/index");

app.set("view engine", "ejs");
app.set("views", "./views");
app.use("/static", express.static(__dirname + "/static"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// [라우터 분리]
const indexRouter = require("./routes");
app.use("/", indexRouter); // localhost:PORT/

// [404 error] 맨 마지막 라우트로 선언
app.get("*", (req, res) => {
    res.render("404");
});

// Sequelize에서 제공하는 sync 메서드를 호출하여 데이터베이스를 동기화
db.sequelize.sync({ force: false }).then(() => {
    // force: false => 테이블이 없으면 생성
    // force: true => 테이블 무조건 생성 (만약 DB가 있다면 다 삭제하고 다시 생성 -> production에서 사용 X)

    app.listen(PORT, () => {
        console.log(`http://localhost:${PORT}`);
    });
});
