// function test() {
//     return new Promise((resolve, reject) => {
//         if (조건) {
//             resolve("성공");
//         } else {
//             reject("실패");
//         }
//     });
// }

// test()
//     .then((result) => {
//         console.log(result); // 성공
//     })
//     .catch((error) => {
//         console.log(error); // 실패
//     });

// function go() {
//     console.log("집에 가는 중");
// }
// function traffic() {
//     return new Promise((resolve, reject) => {
//         console.log("차가 밀린다.");
//         setTimeout(() => {
//             console.log("....");
//             resolve();
//         }, 2000);
//     });
// }

// go();                               //집에 가는 중
// traffic().then(() => {              //차가 밀린다.
//     console.log("드디어 집 도착!");  //....
// });                                 // 드디어 집 도착!

// callback -> promise
// function add(n1, n2, cb) {
//     setTimeout(() => {
//         let result = n1 + n2;
//         cb(result);
//     }, 1000);
// }
// function add(n1, n2) {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             let result = n1 + n2;
//             resolve(result);
//         }, 1000);
//     });
// }
// function mul(n) {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             let result = n * 2;
//             resolve(result);
//         }, 700);
//     });
// }
// function sub(n) {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             let result = n - 1;
//             resolve(result);
//         }, 500);
//     });
// }
// // Promise 체이닝
// add(4, 3)
//     .then((result1) => {
//         console.log(result1); //7
//         return mul(result1);
//     })
//     .then((result2) => {
//         console.log(result2); //14
//         return sub(result2);
//     })
//     .then((result3) => {
//         console.log(result3); //13
//     });

// async await 사용
function call(name) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(name);
        }, 1000);
    });
}
function back() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("back");
        }, 1000);
    });
}
function hell() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject("예외 발생");
        }, 1000);
    });
}

function rejected() {
    console.log("실패하였습니다");
}
// async 함수
async function run() {
    const callawait = await call("user");
    console.log(callawait); //user
    const backawait = back();
    console.log("await 없음", backawait); //await 없음 Promise { <pending> } (진행중)
    const back2await = await back();
    console.log(`await 있음`, back2await); //await 있음 back (정상 출력)
    // 실패
    const hellawait = await hell();
    console.log("hell 성공", hellawait); //실행 X
}
// 함수 실행
run();
