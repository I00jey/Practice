const express = require("express");
const app = express();


// req.body 객체를 해석할 수 있도록 body-parser 미들웨어 등록
//post 요청으로 들어오는 모든 형식의 데이터를 파싱
app.use(express.urlencoded({ extended: true }));
 // json 형식으로 데이터를 주고받음
app.use(express.json());


app.set("view engine", "ejs");

app.set("views", "./views");


