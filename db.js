/*
 * @Author       : xujian
 * @LastEditors  : xujian
 * @Date         : 2021-07-22 22:26:19
 * @LastEditTime : 2021-07-24 15:53:46
 * @Description  : 数据库配置文件
 * @FilePath     : \blog-admin-api\db.js
 */
// 导入sequelize模块
const Sequelize = require('sequelize')
// 导入数据库连接配置
const CONFIG = require('./config')
// 实列化数据库对象
const sequelize = new Sequelize(CONFIG.MYSQL.database, CONFIG.MYSQL.username, CONFIG.MYSQL.password, {
  host: CONFIG.MYSQL.host,
  dialect: 'mysql', // 数据库类型
  logging: CONFIG.DEBUG ? console.log : false, // 是否打印日志
  // 数据库连接池配置
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
  timezone: '+08:00' // 时区配置
})
module.exports = sequelize
