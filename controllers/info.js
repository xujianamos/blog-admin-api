/*
 * @Author       : xujian
 * @LastEditors  : xujian
 * @Date         : 2021-07-22 22:11:43
 * @LastEditTime : 2021-08-01 22:08:37
 * @Description  : 博客信息管理模块的处理方法
 * @FilePath     : \blog-admin-api\controllers\info.js
 */
// 引入公共方法
const Common = require('./common')
// 引入常量
const Constant = require('../constant/constant')
// 引入info表的model
const InfoModel = require('../models/info')
// 引入dateFormat包
const dateFormat = require('dateformat')
const exportObj = {
  info,
  update
}
module.exports = exportObj

// 获取博客信息
function info(req, res) {
  //    定义一个返回对象
  let resObj = Common.clone(Constant.DEFAULT_SUCCESS)
  //    定义一个async任务
  let tasks = {
    query: cb => {
      InfoModel.findByPk(1)
        .then(function (result) {
          if (result) {
            resObj.data = {
              id: result.id,
              title: result.title,
              subtitle: result.subtitle,
              about: result.about,
              createdAt: dateFormat(result.createdAt, 'yyyy-mm-dd HH:MM:ss')
            }
            cb(null)
          } else {
            cb(Constant.BLOG_INFO_NOT_EXSIT)
          }
        })
        .catch(function (err) {
          console.log(err)
          cb(Constant.DEFAULT_ERROR)
        })
    }
  }
  //    执行公共方法中的autofn方法，返回数据
  Common.autoFn(tasks, res, resObj)
}
// 修改博客信息
function update(req, res) {
  //  定义一个返回对象
  let resObj = Common.clone(Constant.DEFAULT_SUCCESS)
  //  定义一个async任务
  let tasks = {
    update: cb => {
      InfoModel.update(
        {
          title: req.body.title,
          subtitle: req.body.subtitle,
          about: req.body.about
        },
        {
          where: {
            id: 1
          }
        }
      )
        .then(function (result) {
          if (result[0]) {
            cb(null)
          } else {
            cb(Constant.BLOG_INFO_NOT_EXSIT)
          }
        })
        .catch(function (err) {
          console.log(err)
          cb(Constant.DEFAULT_ERROR)
        })
    }
  }
  //  执行公共方法中的autofn方法，返回数据
  Common.autoFn(tasks, res, resObj)
}
