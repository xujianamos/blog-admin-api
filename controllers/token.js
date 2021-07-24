/*
 * @Author       : xujian
 * @LastEditors  : xujian
 * @Date         : 2021-07-22 22:24:42
 * @LastEditTime : 2021-07-24 10:38:27
 * @Description  : token处理方法
 * @FilePath     : \blog-admin-api\controllers\token.js
 */
// 引入webtokenjson包
const jwt = require('jsonwebtoken')
// 设定一个密钥，用来加密和解密Token
const tokenKey = 'UT9zo#W7!@50ETnk'
const Token = {
  encrypt,
  decrypt
}
module.exports = Token
/**
 * @Author: xujian
 * @description:Token加密方法
 * @param {*} data 需要加密在token中的数据
 * @param {*} time token的过期时间，单位：s
 * @return {*} 返回一个token
 */
function encrypt(data, time) {
  return jwt.sign(data, tokenKey, { expiresIn: time })
}
/**
 * @Author: xujian
 * @description:token解密方法
 * @param {*} token 加密之后的token
 * @return {*} 返回对象
 * {{token：Boolean(true表示合法，false表示不合法)，
 * data:解密出来的数据或错误信息}}
 */
function decrypt(token) {
  try {
    let data = jwt.verify(token, tokenKey)
    return {
      token: true,
      data: data
    }
  } catch (e) {
    return {
      token: false,
      data: e
    }
  }
}
