/*
 * @Author       : xujian
 * @LastEditors  : xujian
 * @Date         : 2021-07-22 22:23:25
 * @LastEditTime : 2021-07-22 22:34:48
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
 return  JSON.parse(JSON.stringify(obj))
}

/**
 * @Author: xujian
 * @description: 校验参数全局方法
 * @param {*} params 请求的参数集
 * @param {*} checkArr 需要验证的参数
 * @param {*} cb 回调
 * @return {*}
 */
function checkParams(params,checkArr,cb) {
    
}