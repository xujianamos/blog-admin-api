/*
 * @Author       : xujian
 * @LastEditors  : xujian
 * @Date         : 2021-07-22 21:54:58
 * @LastEditTime : 2021-07-22 21:59:29
 * @Description  : 登录接口处理方法
 * @FilePath     : \blog-admin-api\controllers\index.js
 */
// 引入公共方法
const Common = require('./common')
// 引入admin表的model
const AdminModel = require('../models/admin')
// 引入常量
const Constant = require('../constant/constant')
// 引入dateFormat
const dateFormat = require('dateformat')
// 引入token处理方法
const Token = require('./token')
// 设置默认token过期时间，单位：s
const TOKEN_EXPIRE_SENCOND = 3600
const exportObj = {
  login
}
module.exports = exportObj

function login(req, res) {
  //    定义一个返回对象
  const resObj = Common.clone(Constant.DEFAULT_SUCCESS)
  //    定义一个async任务
  let tasks = {
    // 校验参数方法
    checkParams: cb => {
      //  调用公共方法中的校验参数方法，如果成功则继续后面的操作
      //  如果失败则传递错误信息到async的最终方法中
      Common.checkParams(req.body, ['username', 'password'], cb)
    },
    //    查询方法
    query: [
      'checkParams',
      (results, cb) => {
        //  通过用户名和密码到数据库中查询
        AdminModel.findOne({
          where: {
            username: req.body.username,
            password: req.body.password
          }
        })
          .then(function (result) {
            //  查询结果处理
            if (result) {
              //  如果查询到结果
              //  组装数据，将查询结果组装到成功返回的数据中
              resObj.data = {
                id: result.id,
                username: result.username,
                name: result.name,
                role: result.role,
                lastLoginAt: dateFormat(result.lastLoginAt, 'yyyy-MM-dd HH:mm:ss'),
                createdAt: dateFormat(result.createdAt, 'yyyy-MM-dd HH:mm:ss')
              }
              // 将admin的id保存在token中
              const adminInfo = {
                id: result.id
              }
              //  生成token
              let token = Token.encrypt(adminInfo, TOKEN_EXPIRE_SENCOND)
              //  将token保存在返回的对象中，返回前端
              resObj.data.token = token
              //  继续后续操作，传递admin的id参数
              cb(null, result.id)
            } else {
              //    没有查询到结果，传递错误信息到async的最终方法中
              cb(Constant.LOGIN_ERROR)
            }
          })
          .catch(function (err) {
            // 错误处理
            // 打印错误日志
            console.log(err)
            // 传递错误信息到async的最终方法中
            cb(Constant.DEFAULT_ERROR)
          })
      }
    ],
    //  写入上次登录日期
    writeLastLoginAt: [
      'query',
      (results, cb) => {
        // 获取前面传递过来的参数admin的id
        let adminId = results['query']
        //  通过id查询，将当前时间更新为数据库中的上次登陆时间
        AdminModel.update(
          {
            lastLoginAt: new Date()
          },
          {
            where: {
              id: adminId
            }
          }
        )
          .then(function (result) {
            //    更新处理结果
            if (result) {
              //  如果登录成功，就继续后续操作
              cb(null)
            } else {
              //  如果更新失败，就传递错误信息到async最终方法中
              cb(Constant.DEFAULT_ERROR)
            }
          })
          .catch(function (err) {
            //  错误处理
            //  打印错误日志
            console.log(err)
            //  传递错误信息到async的最终方法中
            cb(Constant.DEFAULT_ERROR)
          })
      }
    ]
  }
  // 执行公共方法中的autoFn方法，返回数据
  Common.autoFn(tasks, res, resObj)
}
