//分类模块路由处理
const express=require('express');
const router=express.Router();

const CateController=require('../controllers/cate')
//分类列表
router.get('/',CateController.list)
//单条分类路由
router.get('/:id',CateController.info)
//添加分类路由
router.post('/',CateController.add)
//修改分类路由
router.put('/',CateController.update)
//删除分类
router.delete('/',CateController.remove)

module.exports=router