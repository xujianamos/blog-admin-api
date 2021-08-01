/*
 * @Author       : xujian
 * @LastEditors  : xujian
 * @Date         : 2021-07-22 22:07:49
 * @LastEditTime : 2021-08-01 22:15:45
 * @Description  : 文章模块接口
 * @FilePath     : \blog-admin-api\controllers\article.js
 */
// 引入公共方法
const Common = require('./common')
// 引入article表的model
const ArticleModel = require('../models/article')
// 引入cate表的model
const CateModel = require('../models/cate')
// 引入常量
const Constant = require('../constant/constant')
// 引入dateformat包
const dateFormat = require('dateformat')
let exportObj = {
  list,
  info,
  add,
  update,
  remove
}
module.exports = exportObj

/**
 * @Author: xujian
 * @description:获取文章列表
 * @param {*} req
 * @param {*} res
 * @return {*}
 */
function list(req, res) {
  //    定义一个返回对象
  let resObj = Common.clone(Constant.DEFAULT_SUCCESS)
  //    定义一个async任务
  let tasks = {
    //    校验参数方法
    checkParams: cb => {
      //  调用公共方法中的校验参数方法，如果成功则继续后面的操作
      //  如果失败则传递错误信息到async的最终方法中
      Common.checkParams(req.query, ['page', 'rows'], cb)
    },
    //    查询方法
    query: [
      'checkParams',
      (results, cb) => {
        // 根据前端提交的参数计算SQL语句中需要的offset，即从多少条开始查询
        let offset = req.query.rows * (req.query.page - 1) || 0
        //  根据前端提交的参数计算SQL语句中需要的limit，即查询多少条
        let limit = parseInt(req.query.rows) || 20
        // 设定一个查询条件对象
        let whereCondition = {}
        // 如果查询标题存在，则查询对象增加标题
        if (req.query.title) {
          whereCondition.title = req.query.title
        }
        // 通过offset和limit使用article的model去数据库中查询并按照创建时间排序
        ArticleModel.findAndCountAll({
          where: whereCondition,
          offset: offset,
          limit: limit,
          order: [['created_at', 'DESC']],
          //  关联cate表进行联表查询
          include: [
            {
              model: CateModel
            }
          ]
        })
          .then(function (result) {
            //  查询结果处理
            //  定义一个空数组list，用来存放最终结果
            let list = []
            //  遍历SQL查询出来的结果，处理后装入list
            result.rows.forEach(v => {
              let obj = {
                id: v.id,
                title: v.title,
                desc: v.desc.substr(0, 20) + '...',
                cate: v.cate,
                cateName: v.Cate.name, // 获取联表查询中cate表中的name
                content: v.content,
                createdAt: dateFormat(v.createdAt, 'yyyy-mm-dd HH:MM:ss')
              }
              list.push(obj)
            })
            //  给返回结果赋值，包括列表和总条数
            resObj.data = {
              list,
              count: result.count
            }
            // 继续后续操作
            cb(null)
          })
          .catch(function (err) {
            //  错误处理
            //  打印错误日志
            console.log(err)
            //  传递错误信息到async最终方法中
            cb(Constant.DEFAULT_ERROR)
          })
      }
    ]
  }
  // 调用公共方法中的autofn，返回数据
  Common.autoFn(tasks, res, resObj)
}
/**
 * @Author: xujian
 * @description:获取单条文章
 * @param {*} req
 * @param {*} res
 * @return {*}
 */
function info(req, res) {
  //    定义一个返回对象
  let resObj = Common.clone(Constant.DEFAULT_SUCCESS)
  //    定义一个async任务
  let tasks = {}
  //    调用公共方法中的autofn，返回数据
  Common.autoFn(tasks, res, resObj)
}
/**
 * @Author: xujian
 * @description:添加文章方法
 * @param {*} req
 * @param {*} res
 * @return {*}
 */
function add(req, res) {
  //    定义一个返回对象
  let resObj = Common.clone(Constant.DEFAULT_SUCCESS)
  //    定义一个async任务
  let tasks = {}
  //    调用公共方法中的autofn，返回数据
  Common.autoFn(tasks, res, resObj)
}
/**
 * @Author: xujian
 * @description:修改文章方法
 * @param {*} req
 * @param {*} res
 * @return {*}
 */
function update(req, res) {
  //    定义一个返回对象
  let resObj = Common.clone(Constant.DEFAULT_SUCCESS)
  //    定义一个async任务
  let tasks = {}
  //    调用公共方法中的autofn，返回数据
  Common.autoFn(tasks, res, resObj)
}
/**
 * @Author: xujian
 * @description:删除文章方法
 * @param {*} req
 * @param {*} res
 * @return {*}
 */
function remove(req, res) {
  //    定义一个返回对象
  let resObj = Common.clone(Constant.DEFAULT_SUCCESS)
  //    定义一个async任务
  let tasks = {}
  //    调用公共方法中的autofn，返回数据
  Common.autoFn(tasks, res, resObj)
}
