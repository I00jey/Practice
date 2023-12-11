// TODO: User 모델 모듈 불러오기
const model = require("../models/index");
const User = model.User;

const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

// TODO: bcrypt 패키지 불러오기
const bcrypt = require("bcrypt");

exports.index = (req, res) => {
    // index.ejs 렌더 (data 키로 session 객체의 userInfo 전달)
    res.render("index", { data: verifyToken(req.session) });
};

exports.getRegister = (req, res) => {
    // register.ejs 렌더
    res.render("register");
};

exports.getLogin = (req, res) => {
    // login.ejs 렌더
    res.render("login");
};

exports.getUsers = async (req, res) => {
    // 세션에 userInfo 데이터가 있다면; 전체 유저를 찾음
    // 세션에 userInfo 데이터가 없다면; /login 경로로 리다이렉트
    // -> 즉, 해당 요청은 로그인한 사람만 전체 유저를 조회할 수 있음
    try {
        if (verifyToken(req.session)) {
            const users = await User.findAll();
            console.log("전체 유저 >", users);
            res.render("users", { name: verifyToken(req.session).name, users });
        } else {
            res.redirect("/login");
        }
    } catch (error) {
        console.log("getUsers error >", error);
    }
};

exports.getProfile = async (req, res) => {
    // 1. userInfo 세션에 저장된 id를 이용해 현재 로그인한 유저의 id 값으로 특정 유저 정보 하나를 조회
    // 2. profile.ejs 랜더 + data 키로 특정 유저를 찾은 결과를 넘김
    try {
        const profile = await User.findOne({
            where: { userid: verifyToken(req.session).id }
        });
        console.log("특정 유저 >", profile);
        res.render("profile", { data: profile });
    } catch (error) {
        console.log("getProfile error >", error);
    }
};

exports.postRegister = async (req, res) => {
    // 회원가입 요청시 비밀번호는 암호화한 값으로 DB에 추가
    // 응답은 {result: true}
    try {
        const savedPW = bcryptPassword(req.body.pw);
        const register = await User.create({
            userid: req.body.userid,
            pw: savedPW,
            name: req.body.name
        });
        res.send({ result: true });
    } catch (error) {
        console.log("postRegister error >", error);
    }
};

exports.postLogin = async (req, res) => {
    // Step1. 아이디를 찾아서 사용자 존재 유무 체크
    // Step2. 입력된 비밀번호 암호화하여 기존 데이터와 비교
    // 2-1. 유저 있음
    // 2-1-1. 비밀번호 일치;
    //    userInfo 키 값으로 세션 생성 (userInfo는 name키와 id 키를 갖는 "객체")
    //    응답 데이터: { result: true, data: step1에서 찾은 유저 }
    // 2-1-2. 비밀번호 불일치;
    //    응답 데이터; { result: false, message: '비밀번호가 틀렸습니다.'
    // 2-2. 유저 없음
    //    응답 데이터; { result: false, message: '존재하는 사용자가 없습니다' }
    try {
        const user = await User.findOne({
            where: { userid: req.body.userid }
        });
        if (user) {
            const compare = compareFunc(req.body.pw, user.pw);
            if (compare) {
                const token = jwt.sign(
                    {
                        name: user.name,
                        id: req.body.userid
                    },
                    process.env.SECRET
                );
                req.session.userInfo = token;
                // console.log("생성된 session >", req.session.userInfo);
                res.send({ result: true, data: user });
            } else {
                res.send({ result: false, message: "비밀번호가 틀렸습니다." });
            }
        } else {
            res.send({ result: false, message: "존재하는 사용자가 없습니다" });
        }
    } catch (error) {
        console.log("postLogin error >", error);
    }
};

exports.patchProfile = async (req, res) => {
    // 사용자가 요청한 데이터를 변경
    // 응답 데이터; { result: true }
    try {
        const updateData = await User.update(
            {
                userid: req.body.userid,
                pw: req.body.pw,
                name: req.body.name
            },
            { where: { id: req.body.id } }
        );
        res.send({ result: true });
    } catch (error) {
        console.log("patchProfile error >", error);
    }
};

exports.deleteUser = async (req, res) => {
    // 1. 유저 삭제
    // 2. 세션 삭제
    try {
        const deleteUser = await User.destroy({
            where: { id: req.body.id }
        });
        req.session.destroy((error) => {
            if (error) {
                console.log("session destroy error >", error);
            }
        });
        console.log("deleteData >", deleteUser);
        res.send({ data: deleteUser });
    } catch (error) {
        console.log("deleteUser error >", error);
    }
};

// 비밀번호 암호화 함수 => (선택) 가능하다면 비밀번호 암호화와 관련된 별도의 모듈로 작성해보기! (utils/encrypt.js)
const saltRounds = 11;
// TODO: 비밀번호를 해싱하는 함수 정의 (bcryptPassword)
function bcryptPassword(password) {
    return bcrypt.hashSync(password, saltRounds);
}
// TODO: 비밀번호와 원본 비번을를 비교하는 함수 정의 (compareFunc)
function compareFunc(originalPW, savedPW) {
    return bcrypt.compareSync(originalPW, savedPW);
}

// session.userInfo에 저장된 토큰을 검증하고 payload를 반환하는 함수
function verifyToken(session) {
    if (session.userInfo) {
        return jwt.verify(session.userInfo, process.env.SECRET);
    } else {
        return;
    }
}
