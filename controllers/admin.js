/*
 * @Author       : xujian
 * @LastEditors  : xujian
 * @Date         : 2021-07-22 22:14:29
 * @LastEditTime : 2021-08-01 22:08:28
 * @Description  : 管理员管理模块处理方法
 * @FilePath     : \blog-admin-api\controllers\admin.js
 */
const Common = require('./common')
const Constant = require('../constant/constant')
const AdminModel = require('../models/admin')
const dateFormat = require('dateformat')
const exportObj = {
  list,
  info,
  add,
  update,
  remove
}
module.exports = exportObj
// 获取管理员列表方法
function list(req, res) {
  const { rows, page, username } = req.query
  //    定义一个返回对象
  let resObj = Common.clone(Constant.DEFAULT_SUCCESS)
  //    定义一个async任务
  let tasks = {
    checkParams: cb => {
      Common.checkParams(req.query, ['rows', 'page'], cb)
    },
    query: [
      'checkParams',
      (results, cb) => {
        let offset = rows * (page - 1) || 0
        let limit = parseInt(rows) || 20
        let whereCondition = {}
        if (username) {
          whereCondition.username = username
        }
        AdminModel.findAndCountAll({
          where: whereCondition,
          offset: offset,
          limit: limit,
          order: [['created_at', 'desc']]
        })
          .then(function (result) {
            console.log(result)
            let list = []
            result.rows.forEach(v => {
              let obj = {
                id: v.id,
                username: v.username,
                name: v.name,
                role: v.role,
                lastLoginAt: dateFormat(v.lastLoginAt, 'yyyy-mm-dd HH:MM:ss'),
                createdAt: dateFormat(v.createdAt, 'yyyy-mm-dd HH:MM:ss')
              }
              list.push(obj)
            })
            resObj.data = {
              list,
              count: result.count
            }
            cb(null)
          })
          .catch(function (err) {
            console.log(err)
            cb(Constant.DEFAULT_ERROR)
          })
      }
    ]
  }
  //    调用公共方法中的autofn方法,返回数据
  Common.autoFn(tasks, res, resObj)
}
// 获取单条管理员信息
function info(req, res) {
  //    定义一个返回对象
  let resObj = Common.clone(Constant.DEFAULT_SUCCESS)
  //    定义一个async任务
  let tasks = {
    checkParams: cb => {
      Common.checkParams(req.params, ['id'], cb)
    },
    query: [
      'checkParams',
      (results, cb) => {
        AdminModel.findByPk(req.params.id)
          .then(function (result) {
            if (result) {
              resObj.data = {
                id: result.id,
                username: result.username,
                name: result.name,
                role: result.role,
                lastLoginAt: dateFormat(result.lastLoginAt, 'yyyy-mm-dd HH:MM:ss'),
                createdAt: dateFormat(result.createdAt, 'yyyy-mm-dd HH:MM:ss')
              }
              cb(null)
            } else {
              cb(Constant.ADMIN_NOT_EXSIT)
            }
          })
          .catch(function (err) {
            console.log(err)
            cb(Constant.DEFAULT_ERROR)
          })
      }
    ]
  }
  //    调用公共方法中的autofn方法,返回数据
  Common.autoFn(tasks, res, resObj)
}
// 添加管理员方法
function add(req, res) {
  //    定义一个返回对象
  let resObj = Common.clone(Constant.DEFAULT_SUCCESS)
  //    定义一个async任务
  let tasks = {
    checkParams: cb => {
      Common.checkParams(req.body, ['username', 'password', 'name', 'role'], cb)
    },
    add: [
      'checkParams',
      (results, cb) => {
        AdminModel.create({
          username: req.body.username,
          password: req.body.password,
          name: req.body.name,
          role: req.body.role
        })
          .then(function (result) {
            console.log(result)
            cb(null)
          })
          .catch(function (err) {
            console.log(err)
            cb(Constant.DEFAULT_ERROR)
          })
      }
    ]
  }
  //    调用公共方法中的autofn方法,返回数据
  Common.autoFn(tasks, res, resObj)
}
// 修改管理员方法
function update(req, res) {
  //    定义一个返回对象
  let resObj = Common.clone(Constant.DEFAULT_SUCCESS)
  //    定义一个async任务
  let tasks = {
    checkParams: cb => {
      Common.checkParams(req.body, ['id', 'username', 'password', 'name', 'role'], cb)
    },
    update: [
      'checkParams',
      (results, cb) => {
        AdminModel.update(
          {
            username: req.body.username,
            password: req.body.password,
            name: req.body.name,
            role: req.body.role
          },
          {
            where: {
              id: req.body.id
            }
          }
        )
          .then(function (result) {
            if (result[0]) {
              cb(null)
            } else {
              cb(Constant.ADMIN_NOT_EXSIT)
            }
          })
          .catch(function (err) {
            console.log(err)
            cb(Constant.DEFAULT_ERROR)
          })
      }
    ]
  }
  //    调用公共方法中的autofn方法,返回数据
  Common.autoFn(tasks, res, resObj)
}
// 删除管理员方法
function remove(req, res) {
  //    定义一个返回对象
  let resObj = Common.clone(Constant.DEFAULT_SUCCESS)
  //    定义一个async任务
  let tasks = {
    checkParams: cb => {
      Common.checkParams(req.body, ['id'], cb)
    },
    delete: [
      'checkParams',
      (results, cb) => {
        AdminModel.destroy({
          where: {
            id: req.body.id
          }
        })
          .then(function (result) {
            if (result) {
              cb(null)
            } else {
              cb(Constant.ADMIN_NOT_EXSIT)
            }
          })
          .catch(function (err) {
            console.log(err)
            cb(Constant.DEFAULT_ERROR)
          })
      }
    ]
  }
  //    调用公共方法中的autofn方法,返回数据
  Common.autoFn(tasks, res, resObj)
}
