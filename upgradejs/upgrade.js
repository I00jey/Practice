
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