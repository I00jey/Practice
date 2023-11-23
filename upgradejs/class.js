
// 부모 클래스 정의
class Animal {
    // 생성자 정의
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    // 메소드 정의
    logName() {
        console.log(this.name);
    }
    getAge() {
        this.age += 1;
        return this.age;
    }
}
// 자식 클래스 정의
class Cat extends Animal {
    // 생성자 재정의
    constructor(name, age, gender) {
        // 부모 생성자 불러오기
        super(name, age);
        this.gender = gender;
    }
    // 메소드 재정의
    logName(){
        console.log('cat name :');
        // 부모 메서드 불러오기
        super.logName();
    }
}

const siru = new Cat('siru', 4,'man');
console.log(siru.gender);   // man
siru.logName();             // cat name : siru
