

const inputId = document.getElementById('loginid');
const inputPw = document.getElementById('loginpw');


// var user = new Object();
// var user = {id : "aaaa",
// pw : "1234"};

const id = ['aaaa', 'bbbb', 'cccc'];
const pw = ['1111', '2222', '3333'];


// 로그인 코드
const login = () => {
    if (inputId.value && inputPw.value) {
        let haveValue = false;

        for (let i = 0; i < id.length; i++) {
            if (inputId.value === id[i] && inputPw.value === pw[i]) {
                haveValue = true;
                break;
            }
        }
        if (haveValue) {
            localStorage.setItem('loggedIn', true);
            inputId.value = '';
            inputPw.value = '';
            alert('로그인을 성공했습니다.');
            location.href = "http://127.0.0.1:5500/index.html";
        } else {
            inputId.value = '';
            inputPw.value = '';
            alert('아이디 또는 비밀번호를 확인해주세요.');
        }
    } else {
        alert('아이디와 비밀번호를 입력해주세요.');
    }
}