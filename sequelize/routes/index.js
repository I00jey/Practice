const express = require("express");
const router = express.Router();
const controller = require("../controller/Cvisitor");

// 기본주소 : localhost:PORT

// GET /
router.get("/", controller.main);

// GET /visitors - 전체 조회
router.get("/visitors", controller.get_visitors);

// POST /visitor
router.post("/visitor", controller.post_visitor);

// GET /visitor - 하나 조회
router.get("/visitor", controller.get_visitor); // req.query
router.get("/visitor/:id", controller.get_visitor2); // req.params

/**
 * // 주의) params 사용 시 라우터 정의 순서에 주의
 * router.get("/visitor/:id", controller.get_visitor2); // id = test
 * router.get("/visitor/test", controller.get_visitor2); // params보다 위에 넣어야함
 */

// PATCH /visitor - 하나 수정
router.patch("/visitor", controller.patch_visitor);

// DELETE /visitor - 하나 삭제
router.delete("/visitor", controller.delete_visitor);
module.exports = router;
