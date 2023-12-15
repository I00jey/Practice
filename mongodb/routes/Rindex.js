const express = require("express");
const router = express.Router();
const controller = require("../controller/Cindex");

router.get("/", controller.index);
router.post("/create", controller.create);
router.get("/findOne", controller.findOne);
router.patch("/update", controller.update);
router.delete("/deleteDB", controller.deleteDB);

module.exports = router;
