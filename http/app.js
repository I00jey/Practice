// http 모듈로 웹 서버 생성
// const http = require('http');
// const fs = require('fs');

// const server = http.createServer( function (req,res) {
//     res.writeHead(200);
//     res.write("<h1>response</h1>")
//     res.end()
// });

// server.on("request", function (code) {
//     console.log("request 이벤트 발생");
// })

// // 서버를 첫번째 매개변수의 포트로 실행
// server.listen(8000, function () {
//     console.log("8000 포트로 실행");
// })


const http = require('http');
const fs = require('fs');

const server = http.createServer(function (req, res) {
    // 예외처리 -> try-catch문
    try {
        const data = fs.readFileSync('./index.html');
        res.writeHead(200, {'content-type': 'text/html; charset=utf8'});
        res.write(data);
        res.end();
    } catch (error) {
        // console.log(error);
        const data2 = fs.readFileSync('./404.html');
        res.writeHead(200, {'content-type': 'text/html; charset=utf8'});
        res.write(data2);
        res.end();
    }
});

server.listen(8000, function () {
    console.log('서버에 연결되었습니다');
})
