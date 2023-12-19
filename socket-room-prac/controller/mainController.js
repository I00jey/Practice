const socketController = require("./socketController");
module.exports = function (server) {
    socketController(server);
};
