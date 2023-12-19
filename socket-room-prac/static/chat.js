const chatForm = document.getElementById("chat-form");
const chatMessages = document.querySelector(".chat-messages");
const roomName = document.getElementById("room-name");
const userList = document.getElementById("users");

const { username, yourname } = Qs.parse(location.search, {
    ignoreQueryPrefix: true,
});
var chatUsers = [username, yourname].sort();
let room = "";
for (let i = 0; i < chatUsers.length; i++) {
    room += chatUsers[i];
}
console.log(room);

const socket = io();

socket.emit("joinRoom", { username, room });

socket.on("roomUsers", ({ room, users }) => {
    outputRoomName(room);
    outputUsers(users);
});

socket.on("message", (message) => {
    console.log(message);
    outputMessage(message);
    chatMessages.scrollTop = chatMessages.scrollHeight;
});

chatForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const msg = e.target.elements.msg.value;
    socket.emit("chatMessage", msg);
    e.target.elements.msg.value = "";
    e.target.elements.msg.focus();
});

function outputMessage(message) {
    const div = document.createElement("div");
    div.classList.add("message");
    div.innerHTML = `
    <p class="meta">${message.name} <span>${message.time}</span></p>
    <p class="text">${message.text}</p>`;
    document.querySelector(".chat-messages").appendChild(div);
}

function outputRoomName(room) {
    roomName.innerText = room;
}

function outputUsers(users) {
    userList.innerHTML = `${users
        .map((user) => `<li id=${user.username}>${user.username}</li>`)
        .join("")}`;
}

socket.on("updateUsers", (username) => {
    const deletelist = document.getElementById(`${username}`);
    if (deletelist) {
        deletelist.remove();
    }
});

function exit() {
    console.log("나가기 버튼");
    // socket.emit("disconnect");

    // 서버에서 처리된 후 updateUsers 이벤트를 받아 사용자 목록을 업데이트함
    // const deletelist = document.getElementById(`${username}`);
    // deletelist.remove();
    socket.disconnect();
    location.href = "/";
}
