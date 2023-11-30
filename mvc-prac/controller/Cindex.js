const userData = require("../model/Mindex");

exports.index = (req, res) => {
    res.render("index");
};
exports.ajaxget = (req, res) => {
    console.log(req.query);
    res.send(req.query);
};
exports.ajaxpost = (req, res) => {
    console.log(req.body);
    res.send(req.body);
};
exports.axiosget = (req, res) => {
    console.log(req.query);
    res.send(req.query);
};
exports.axiospost = (req, res) => {
    console.log(req.body);
    // res.send(req.body);
    // res.json("hi");
    res.send("hi");
};
exports.fetchget = (req, res) => {
    console.log(req.query);
    res.send(req.query);
};
exports.fetchpost = (req, res) => {
    console.log(req.body);
    res.send({ name: req.body.name, gender: req.body.gender, msg: "fetch 성공!" });
};
exports.practice1 = (req, res) => {
    res.render("practice1");
};
exports.practice2 = (req, res) => {
    res.render("practice2");
};
exports.axios1 = (req, res) => {
    console.log(req.query);
    res.send(req.query);
};
exports.axios2 = (req, res) => {
    console.log(req.body);
    if (userData.userId === req.body.userId && userData.userPw === req.body.userPw) {
        res.send({ userInfo: req.body, isSuccess: true });
    } else {
        res.send({ isSuccess: false });
    }
};
