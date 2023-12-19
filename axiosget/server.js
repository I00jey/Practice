const { urlencoded } = require("body-parser");
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
app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});
