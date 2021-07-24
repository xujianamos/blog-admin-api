/*
 * @Author       : xujian
 * @LastEditors  : xujian
 * @Date         : 2021-07-22 22:25:54
 * @LastEditTime : 2021-07-24 17:18:15
 * @Description  : 用来存放 MYSQL 数据表 info 的映射 model
 * @FilePath     : \blog-admin-api\models\info.js
 */
const Sequelize = require('sequelize')
const db = require('../db')
const Info = db.define(
  'Info',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: false
    },
    title: {
      type: Sequelize.STRING(20),
      allowNull: false
    },
    subtitle: {
      type: Sequelize.STRING(30),
      allowNull: false
    },
    about: {
      type: Sequelize.TEXT,
      allowNull: false
    }
  },
  {
    underscored: true,
    tableName: 'info'
  }
)
module.exports = Info
