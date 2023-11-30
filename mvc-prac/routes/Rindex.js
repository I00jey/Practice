const express = require("express");
const router = express.Router();

const controller = require("../controller/Cindex");

router.get("/", controller.index);
router.get("/ajax", controller.ajaxget);
router.post("/ajax", controller.ajaxpost);
router.get("/axios", controller.axiosget);
router.post("/axios", controller.axiospost);
router.get("/fetch", controller.fetchget);
router.post("/fetch", controller.fetchpost);
router.get("/practice1", controller.practice1);
router.get("/practice2", controller.practice2);
router.get("/axios1", controller.axios1);
router.post("/axios2", controller.axios2);

module.exports = router;
