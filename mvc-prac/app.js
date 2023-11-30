const express = require("express");
const app = express();
const PORT = 8000;

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const indexRouter = require("./routes/Rindex");
app.use("/", indexRouter);

// ---------------------------------------

// app.get("/", (req, res) => {
//     res.render("index");
// });

// // ajax
// app.get("/ajax", (req, res) => {
//     console.log(req.query);
//     res.send(req.query);
// });

// app.post("/ajax", (req, res) => {
//     console.log(req.body);
//     res.send(req.body);
// });

// // axios
// app.get("/axios", (req, res) => {
//     console.log(req.query);
//     res.send(req.query);

//     // 의도적으로 에러 발생
//     // res.status(400).send('error msg!');
// });

// app.post("/axios", (req, res) => {
//     console.log(req.body);
//     // res.send(req.body);
//     // res.json("hi");
//     res.send("hi");
// });

// // fetch
// app.get("/fetch", (req, res) => {
//     console.log(req.query);
//     res.send(req.query);
// });

// app.post("/fetch", (req, res) => {
//     console.log(req.body);
//     res.send({ name: req.body.name, gender: req.body.gender, msg: "fetch 성공!" });
// });

// // ------------실습-----------------

// const userId = "홍길동";
// const userPw = "1234";

// app.get("/practice1", (req, res) => {
//     res.render("practice1");
// });

// app.get("/practice2", (req, res) => {
//     res.render("practice2");
// });

// app.get("/axios1", (req, res) => {
//     console.log(req.query);
//     res.send(req.query);
// });

// app.post("/axios2", (req, res) => {
//     console.log(req.body); // { userId: 'banana', userPw: '1234' }

//     // userId, userPw 라는 변수 값과 클라이언트에서 넘겨받은 값이 일치하는지 검사
//     if (userId === req.body.userId && userPw === req.body.userPw) {
//         res.send({ userInfo: req.body, isSuccess: true });
//     } else {
//         res.send({ isSuccess: false });
//     }
//     // 결과 값을 반환
// });

// ---------------------------------------

app.get("*", (req, res) => {
    res.render("404");
});

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});
