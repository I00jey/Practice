const express = require("express");
const app = express();
const port = 8000;

app.use("/uploads", express.static(__dirname + "/uploads"));

const multer = require("multer");
const path = require("path");

const uploadFile = multer({
    storage: multer.diskStorage({
        destination(req, file, done) {
            done(null, "uploads/");
        },
        filename(req, file, done) {
            const ext = path.extname(file.originalname);
            done(null, path.basename(file.originalname, ext) + Date.now() + ext);
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

app.post("/register", uploadFile.single("fileInput"), (req, res) => {
    console.log(req.file);
    console.log(req.body);
    res.send({
        file: req.file,
        info: req.body
    });
});

app.listen(port, function () {
    console.log(`http://localhost:${port}`);
});
