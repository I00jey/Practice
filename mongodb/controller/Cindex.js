const User = require("../models/Musers");

exports.index = (req, res) => {
    res.render("index");
};

exports.create = async (req, res) => {
    try {
        const userinfo = await User.create({
            id: req.body.id,
            pw: req.body.pw,
        });
        console.log("create 결과 >", userinfo);
        res.send("create 성공");
    } catch (error) {
        console.log(error);
    }
};

exports.findOne = async (req, res) => {
    try {
        const result = await User.findOne({
            id: req.query.id,
        });
        console.log("findOne 결과 >", result);
        res.json(result);
    } catch (error) {
        console.log(error);
    }
};
exports.update = async (req, res) => {
    try {
        await User.updateOne({ id: req.body.id }, { pw: req.body.pw });
        const result = await User.findOne({ id: req.body.id });
        console.log("update 결과 >", result);
        res.json(result);
    } catch (error) {
        console.log(error);
    }
};
exports.deleteDB = async (req, res) => {
    try {
        const result = await User.findOneAndDelete({ id: req.body.id });
        console.log("delete 결과 >", result);
        res.json(result);
    } catch (error) {
        console.log(error);
    }
};
