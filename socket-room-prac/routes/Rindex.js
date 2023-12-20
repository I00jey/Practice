const express = require("express");
const router = express.Router();
const controller = require("../controller/mainController");

router.get("/", controller.product);
router.get("/chatrooms", controller.getchatrooms);
router.post("/chatrooms", controller.createchatroom);
router.get("/chats", controller.getchats);
router.post("/chats", controller.putchats);
module.exports = router;
