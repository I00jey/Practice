
$(window).on("load", function () {
    if (localStorage.getItem('loggedIn')) {
        $('#loginbtn').css("display", "none");
    } else {
        $('#logoutbtn').css("display", "none");
    }
});

// Open modal function (move it outside the window load block)
document.getElementById("loginbtn").addEventListener("click", function () {
    document.getElementById("loginModal").style.display = "block";
});

function logout() {
    localStorage.removeItem('loggedIn');
    alert('로그아웃 되었습니다.');
    location.href = 'index.html';
}

var id = ['aaaa', 'bbbb', 'cccc'];
var pw = ['1111', '2222', '3333'];
function login() {
    const inputId = document.getElementById('loginid');
    const inputPw = document.getElementById('loginpw');

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

function closeModal() {
    document.getElementById("loginModal").style.display = "none";
}