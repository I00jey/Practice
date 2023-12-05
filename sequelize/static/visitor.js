const tbody = document.querySelector("tbody");
const btnGroup = document.querySelector("#button-group");

// 폼의 등록 버튼 클릭시
// - 테이블에 데이터 추가
function createVisitor() {
    const form = document.forms["visitor-form"];

    if (form.name.value.length === 0 || form.comment.value.length === 0) {
        alert("이름 또는 방명록 기입해주세요!");
        return;
    }

    // name 10글자 유효성 검사
    if (form.name.value.length > 10) {
        alert("이름은 10글자 미만입니다!");
        return;
    }

    axios({
        method: "POST",
        url: "/visitor",
        data: {
            name: form.name.value,
            comment: form.comment.value
        }
    }).then((res) => {
        console.log(res.data);
        const data = res.data;

        const html = `
            <tr id="tr_${data.id}">
                <td>${data.id}</td>
                <td>${data.name}</td>
                <td>${data.comment}</td>
                <td><button type="button" onclick="editVisitor(${data.id})">수정</button></td>
                <td><button type="button" onclick="deleteVisitor(this, ${data.id})">삭제</button></td>
            </tr>
        `;
        // insertAdjacentHTML: 특정 요소에 html 추가
        tbody.insertAdjacentHTML("beforeend", html);
        // 입력창 초기화 method
        form.reset();
    });
}

// 폼의 수정 버튼 클릭시
// - form input에 값 넣기
// - 변경, 취소 버튼 보이기
function editVisitor(id) {
    // (1) form input 값 넣기 (DB에서 값 받아서)
    axios({
        method: "get",

        // 1) req.query (서버 경로 -> /visitor) -> url: visitor?id=${id}
        // url: `/visitor?id=${id}`

        // 2-1) params 사용 -> req.query (서버 경로 -> /visitor)
        // url: "/visitor",
        // params: { id: id }

        // 2-2) (서버) req.params -> /visitor/:id
        url: `/visitor/${id}`
    }).then((res) => {
        console.log("editVisitor get data >", res.data);
        // { id: 4, name: 'apple', comment: '사과' }
        const { name, comment } = res.data;
        const form = document.forms["visitor-form"];
        form.name.value = name;
        form.comment.value = comment;
    });
    // (2) 변경, 취소 버튼 보이기
    const html = `
    <button type='button' onclick="editDo('${id}')">변경</button>
    <button type='button' onclick="editCancel()">취소</button>`;

    btnGroup.innerHTML = html;
}

// 수정 -> 변경 버튼 나오니까
// 변경 버튼 클릭시 데이터 변경
function editDo(id) {
    const form = document.forms["visitor-form"];

    axios({
        method: "PATCH",
        url: "/visitor",
        data: {
            id: id,
            name: form.name.value,
            comment: form.comment.value
        }
    }).then((res) => {
        console.log(res.data);

        const children = document.querySelector(`#tr_${id}`).children; //tr의 children -> td들
        children[1].textContent = form.name.value;
        children[2].textContent = form.comment.value;
        // 입력창 초기화 method
        editCancel();
    });
}

// 취소 버튼 클릭시
// - input 초기화
// - 등록 버튼 보이기
function editCancel() {
    const form = document.forms["visitor-form"];
    // input 초기화
    form.reset();

    // 등록 버튼 보이기
    const html = `<button type="button" onclick="createVisitor()">등록</button>`;
    btnGroup.innerHTML = html;
}

// 삭제 버튼 클릭시
// - DB에 삭제
// - 테이블(EJS)에서 해당 행 삭제
function deleteVisitor(object, id) {
    console.log("obj >", object); // button 태그

    // console.log(confirm("정말 삭제하시겠습니까?"));
    if (!confirm("정말 삭제하시겠습니까?")) return;

    axios({
        method: "DELETE",
        url: "/visitor",
        data: {
            id: id
        }
    }).then((res) => {
        console.log(res.data);

        // 1) parentElement 두번해서 직접 접근
        // object.parentElement.parentElement.remove();

        // 2) closest() 메서드
        object.closest(`#tr_${id}`).remove();
    });
}
