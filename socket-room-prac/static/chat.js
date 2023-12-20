const chatForm = document.getElementById("chat-form");
const chatMessages = document.querySelector(".chat-messages");
const roomName = document.getElementById("room-name");
const userList = document.getElementById("users");

let { room, username } = Qs.parse(location.search, {
    ignoreQueryPrefix: true,
});

console.log(room, username);

const socket = io();

socket.emit("joinRoom", { username, room });

socket.on("roomFull", () => {
    alert(`채팅방 인원은 최대 2명입니다`);
    socket.disconnect();
    window.history.back();
});

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

    socket.disconnect();
    window.history.back();
}
