// 文章管理模块路由
const express = require("express");
const router = express.Router();

const ArticleController = require("../controllers/article");

// 文章列表路由
router.get("/", ArticleController.list);
// 文章详情路由
router.get("/:id", ArticleController.info);
// 新增文章路由
router.post("/", ArticleController.add);
// 修改文章路由
router.put("/", ArticleController.update);
// 删除文章路由
router.delete("/", ArticleController.remove);

module.exports = router;
