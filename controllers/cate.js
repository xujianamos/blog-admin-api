/*
 * @Author       : xujian
 * @LastEditors  : xujian
 * @Date         : 2021-07-22 21:59:45
 * @LastEditTime : 2021-07-26 23:04:13
 * @Description  : 分类管理模块处理方法
 * @FilePath     : \blog-admin-api\controllers\cate.js
 */
// 引入公共方法
const Common = require('./common')
// 引入cate表的model
const CateModel = require('../models/cate')
// 引入常量
const Constant = require('../constant/constant')
// 引入dateFormat包
const dateFormat = require('dateformat')
const exportObj = {
  list,
  info,
  add,
  update,
  remove
}
module.exports = exportObj

// 获取分类列表
function list(req, res) {
  const { name, rows, page } = req.query
  // 定义一个返回对象
  const resObj = Common.clone(Constant.DEFAULT_SUCCESS)
  // 定义一个async任务
  let tasks = {
    // 校验参数
    checkParams: cb => {
      // 如果传入了dropList参数，代表需要下拉列表，跳过分页逻辑
      if (req.query.dropList) {
        cb(null)
      } else {
        // 调用公共方法中的校验参数方法，如果成功，则继续后面的操作
        // 如果失败则传递错误信息到async的最终方法中
        Common.checkParams(req.query, ['page', 'rows'], cb)
      }
    },
    //  查询方法，依赖校验参数方法
    query: [
      'checkParams',
      (results, cb) => {
        // 设定搜素对象
        let searchOption
        // 判断是否传入了dropList参数
        if (req.query.dropList) {
          // 如果传入了，则不分页查询
          searchOption = {
            order: [['created_at', 'DESC']]
          }
        } else {
          //  如果没有传入，则分页查询
          //  根据前端提交的参数计算SQL语句中需要的offset，即从多少条开始查询
          let offset = rows * (page - 1) || 0
          // 根据前端提交的参数计算SQL语句中需要的limit，即查询多少条
          let limit = parseInt(rows) || 20
          // 设定一个查询条件对象
          let whereCondition = {}
          // 如果查询姓名存在，查询对象增加姓名
          if (name) {
            whereCondition.name = name
          }
          searchOption = {
            where: whereCondition,
            offset: offset,
            limit: limit,
            order: [['created_at', 'DESC']]
          }
        }
        // 通过offset和limit使用cate的model去数据库中查询，并按照创建时间排序
        CateModel.findAndCountAll(searchOption)
          .then(function (result) {
            // 查询结果处理
            // 设定一个空数组list，用来存放最终的结果
            let list = []
            result.rows.forEach((v, i) => {
              // 遍历SQL查询出来的结果，处理后装入list
              let obj = {
                id: v.id,
                name: v.name,
                createdAt: dateFormat(v.createdAt, 'yyyy-MM-dd HH:mm:ss')
              }
              list.push(obj)
            })
            // 给返回结果赋值，包括列表和总条数
            resObj.data = {
              list,
              count: result.count
            }
            // 继续后续操作
            cb(null)
          })
          .catch(function (err) {
            // 错误处理
            // 打印错误日志
            console.log(err)
            // 传递错误信息到async的最终方法中
            cb(Constant.DEFAULT_ERROR)
          })
      }
    ]
  }
  // 执行公共方法中的autoFn方法，返回数据
  Common.autoFn(tasks, res, resObj)
}

// 获取单条分类信息
function info(req, res) {
  //  定义一个返回对象
  const resObj = Common.clone(Constant.DEFAULT_SUCCESS)
  // 定义一个async任务
  let tasks = {
    //  校验参数方法
    checkParams: cb => {
      // 调用公共方法中的校验参数方法，如果成功则继续后面的操作
      // 如果失败则传递错误信息到async的最终方法中
      Common.checkParams(req.params, ['id'], cb)
    },
    //  查询方法，依赖校验参数方法
    query: [
      'checkParams',
      (results, cb) => {
        //  使用cate的model中的方法查询
        CateModel.findByPk(req.params.id)
          .then(function (result) {
            //  查询结果处理
            //  如果查询到结果
            if (result) {
              //  将查询到的结果给返回对象赋值
              resObj.data = {
                id: result.id,
                name: result.name,
                createdAt: dateFormat(result.createdAt, 'yyyy-mm-dd HH:MM:ss')
              }
              // 继续后续操作
              cb(null)
            } else {
              // 查询失败，传递错误信息到async最终方法中
              cb(Constant.CATE_NOT_EXSIT)
            }
          })
          .catch(function (err) {
            // 错误处理
            // 打印错误日志
            console.log(err)
            // 传递错误信息到async最终方法中
            cb(Constant.DEFAULT_ERROR)
          })
      }
    ]
  }
  // 执行公共方法中的autoFn方法，返回数据
  Common.autoFn(tasks, res, resObj)
}

// 新增分类
function add(req, res) {}

// 修改分类
function update(req, res) {}

// 删除分类
function remove(req, res) {}
