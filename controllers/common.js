/*
 * @Author       : xujian
 * @LastEditors  : xujian
 * @Date         : 2021-07-22 22:23:25
 * @LastEditTime : 2021-07-24 10:28:58
 * @Description  : 公共方法
 * @FilePath     : \blog-admin-api\controllers\common.js
 */
const async = require('async')

const Constant = require('../constant/constant')
const exportObj = {
  clone,
  checkParams,
  autoFn
}
module.exports = exportObj
/**
 * @Author: xujian
 * @description: 克隆方法，克隆一个对象
 * @param {*} obj
 * @return {any}
 */
function clone(obj) {
  return JSON.parse(JSON.stringify(obj))
}

/**
 * @Author: xujian
 * @description: 校验参数全局方法
 * @param {Object} params 请求的参数集
 * @param {Array} checkArr 需要验证的参数
 * @param {Function} cb 回调
 * @return {*}
 */
function checkParams(params, checkArr, cb) {
  let flag = true
  checkArr.forEach(v => {
    if (!params[v]) {
      flag = false
    }
  })
  if (flag) {
    // 验证通过
    cb(null)
  } else {
    // 验证不通过
    cb(Constant.LACK)
  }
}
/**
 * @Author: xujian
 * @description:返回统一方法:返回JSON格式数据
 * @param {*} tasks 当前controller执行tasks
 * @param {*} res 当前controller response
 * @param {*} resObj 当前controller返回json对象
 * @return {*}
 */
function autoFn(tasks, res, resObj) {
  async.auto(tasks, function (err) {
    if (err) {
      console.log(JSON.stringify(err))
      res.json({
        code: err.code || Constant.DEFAULT_ERROR.code,
        msg: err.msg || JSON.stringify(err)
      })
    } else {
      res.json(resObj)
    }
  })
}
