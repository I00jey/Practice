const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
    res.render("index");
});
app.get("/ajax", (req, res) => {
    console.log(req.query);
    res.send(req.query);
});
app.post("/ajax", (req, res) => {
    console.log(req.body);
    res.send(req.body);
});
app.get("/axios", (req, res) => {
    console.log(req.query);
    res.send(req.query);
});
app.post("/axios", (req, res) => {
    console.log(req.body);
    res.send(req.body);
});
app.get("/fetch", (req, res) => {
    console.log(req.query);
    res.send(req.query);
});
app.post("/fetch", (req, res) => {
    console.log(req.body);
    res.send(req.body);
});
app.listen(8000, function () {
    console.log(`http://localhost:8000`);
});
