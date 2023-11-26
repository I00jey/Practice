function callBack(a, callback) {
    console.log(a);
    callback();
}
function call() {
    console.log("call");
}

callBack(10, call);
