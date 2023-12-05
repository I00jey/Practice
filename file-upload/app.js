const { log } = require("console");
const express = require("express");
const app = express();
const port = 8310;

// static 등록 => 이미지 경로 접근 (프론트)
app.use("/uploads", express.static(__dirname + "/uploads"));

// multer 관련 설정
const multer = require("multer");
const path = require("path"); // 경로에 관한 내장 모듈
// const upload = multer({
//     dest: "uploads/" // dest : 클라이언트가 업로드한 파일을 저장할 서버측 경로
// });

// multer 세부 설정
const uploadDetail = multer({
    // storage : 저장할 공간에 대한 정보
    storage: multer.diskStorage({
        // destination : 경로 설정
        destination(req, file, done) {
            // done : callback 함수
            // done(error, '경로')  error = null -> 에러가 없다는 의미
            done(null, "uploads"); // 파일을 업로드할 경로 설정
        },
        filename(req, file, done) {
            // 파일의 확장자를 추출 => "path" 모듈 활용
            const ext = path.extname(file.originalname);
            // console.log("ext :", ext);
            // console.log("filename :", path.basename(file.originalname, ext));
            // 확장자를 제외한 파일이름
            // 확장자를 붙였다 떼였다하는 이유 -> Date.now()를 넣어 파일명 중복을 없애기 위해
            done(null, path.basename(file.originalname, ext) + ext);
        }
    })
});

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
    res.render("index");
});

app.post("/upload/single", uploadDetail.single("single"), (req, res) => {
    console.log(req.file);
    console.log(req.body);
    res.render("resultsingle", {
        file: req.file,
        data: req.body
    });
});
app.post("/upload/array", uploadDetail.array("array"), (req, res) => {
    console.log(req.files);
    console.log(req.body);
    res.render("resultarray", {
        file: req.files,
        data: req.body
    });
});
app.post(
    "/upload/fields",
    uploadDetail.fields([{ name: "fields1" }, { name: "fields2" }]),
    (req, res) => {
        console.log(req.files);
        console.log(req.body);
        console.log(req.body.title);
        console.log(req.files.fields1[0].path);
        res.render("resultfields", {
            file1: req.files.fields1,
            file2: req.files.fields2,
            data: req.body.title
        });
    }
);

app.listen(port, function () {
    console.log(`http://localhost:${port}`);
});
