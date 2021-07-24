/*
 * @Author       : xujian
 * @LastEditors  : xujian
 * @Date         : 2021-07-22 22:26:07
 * @LastEditTime : 2021-07-24 17:18:13
 * @Description  : 用来存放 MYSQL 数据表 cate 的映射 model
 * @FilePath     : \blog-admin-api\models\cate.js
 */
// 引入sequelize模块
const Sequelize = require('sequelize')
// 引入数据库实例
const db = require('../db')
// 定义model
const Cate = db.define(
  'Cate',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    name: {
      type: Sequelize.STRING(20),
      allowNull: false
    }
  },
  {
    underscored: true,
    tableName: 'cate'
  }
)
module.exports = Cate
