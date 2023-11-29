const express = require("express");
const app = express();
const port = 8000;

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
    res.render("index");
});

app.get("/login", (req, res) => {
    console.log(req.query);
    res.render("result", {
        title: "get 요청",
        info: req.query,
    });
});
app.post("/login", (req, res) => {
    console.log(req.body);
    res.render("result", {
        title: "post 요청",
        info: req.body,
    });
});

app.listen(port, function () {
    console.log(`http://localhost:${port}`);
});
