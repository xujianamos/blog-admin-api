/*
 * @Author       : xujian
 * @LastEditors  : xujian
 * @Date         : 2021-07-24 15:32:38
 * @LastEditTime : 2021-07-24 15:37:52
 * @Description  : token验证中间件
 * @FilePath     : \blog-admin-api\routes\middleware\verify.js
 */
// 引入token处理的controller
const Token = require('../../controllers/token')
// 引入常量
const Constant = require('../../constant/constant')

const exportObj = {
  verifyToken
}
module.exports = exportObj
/**
 * @Author: xujian
 * @description:验证token中间件
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @return {*}
 */
function verifyToken(req, res, next) {
  // 如果请求路径是/login，即登录页，则跳过，继续下一步
  if (req.path === '/login') return next()
  //  从请求头中获取token
  let token = req.headers.token
  //  将token进行解密
  let tokenVerifyObj = Token.decrypt(token)
  if (tokenVerifyObj.token) {
    //  如果token验证通过，则继续下一步
    next()
  } else {
    //  token验证失败，则返回错误
    res.json(Constant.TOKEN_ERROR)
  }
}
