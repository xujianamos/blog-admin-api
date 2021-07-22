const express = require('express');
const router = express.Router();

const IndexController=require('../controllers/index');
//登录路由
router.post('/login',IndexController);
module.exports = router;
