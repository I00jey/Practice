
// 배열 선언
const arr1 = ['apple', 'kiwi'];
// 배열 구조분해할당 기본값 할당
const [ap,ki,or = 'orange'] = arr1;
// 구조분해할당 변수 출력
console.log(ap, ki, or);

let three = 3;
let ten = 10;
[three, ten] = [ten, three] //[10, 3]
console.log(three, ten); //10, 3


// 오브젝트 선언
const obj1 = {
    name : 'ella',
    age : 20
}
// 오브젝트 구조분해할당 기본값 할당
const {name : n1, age : a1, hobby : b1 = "football"} = obj1;
// 콜론을 이용해 새 변수명 선언
console.log(n1, a1, b1);

// spread ...연산자
const spr1 = ['a','b','c'];
const spr2 = [1,2,3];
const spread = [...spr1, ...spr2];
console.log(spread); // [ 'a', 'b', 'c', 1, 2, 3 ]

const str = 'hello';
console.log(...str); // h e l l o

// ...rest
const arrrest = [1,2,3,4,5];
function rest(a,b, ...rest) {
    console.log(a);     //1
    console.log(b);     //2
    console.log(rest);  //[ 3, 4, 5 ]
}
rest(...arrrest);