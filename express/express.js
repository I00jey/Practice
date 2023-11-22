const express = require('express');
const app = express();
const port = 8000;

app.set('view engine', 'ejs');
app.set('views', './views');

// static 미들웨어 등록 (정적 파일 로드 css, js)
// 실제 경로(폴더)에 '요청 경로' 이름으로 접근하겠다.
// app.use('요청 경로', express.static('실제 경로'));
// app.use('/static', express.static(__dirname + '/static'));
app.use('/public', express.static(__dirname + '/test'));

app.get('/', function (req, res) {
    res.render('test');
})

// app.get('/test', function (req, res) {
//     res.render('test');
// })

app.listen(port,function () {
    console.log((`http://localhost:${port}`));
})

