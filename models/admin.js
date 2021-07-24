/*
 * @Author       : xujian
 * @LastEditors  : xujian
 * @Date         : 2021-07-22 22:25:49
 * @LastEditTime : 2021-07-24 17:18:08
 * @Description  : 用来存放 MYSQL 数据表 admin 的映射 model
 * @FilePath     : \blog-admin-api\models\admin.js
 */
const Sequelize = require('sequelize')
const db = require('../db')
const Admin = db.define(
  'Admin',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    username: {
      type: Sequelize.STRING(20),
      allowNull: false
    },
    password: {
      type: Sequelize.STRING(36),
      allowNull: false
    },
    name: {
      type: Sequelize.STRING(20),
      allowNull: false
    },
    role: {
      type: Sequelize.INTEGER,
      allowNull: false
    }
  },
  {
    underscored: true,
    tableName: 'admin'
  }
)
module.exports = Admin
