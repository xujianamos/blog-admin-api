/*
 * @Author       : xujian
 * @LastEditors  : xujian
 * @Date         : 2021-07-22 22:26:01
 * @LastEditTime : 2021-07-24 17:18:10
 * @Description  : 用来存放 MYSQL 数据表 article 的映射 model
 * @FilePath     : \blog-admin-api\models\article.js
 */
// 引入sequelize模块
const Sequelize = require('sequelize')
// 引入cate表的model
const CateModel = require('./cate')
// 引入数据库实例
const db = require('../db')
const Article = db.define(
  'Article',
  {
    // 文章id
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    //  文章标题
    title: {
      type: Sequelize.STRING(30),
      allowNull: false
    },
    //  文章摘要
    desc: {
      type: Sequelize.STRING,
      allowNull: false
    },
    //  文章内容
    content: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    //  所属分类
    cate: {
      type: Sequelize.INTEGER,
      allowNull: false
    }
  },
  {
    underscored: true,
    tableName: 'article'
  }
)
module.exports = Article
// 文章所属分类，一个分类包含多篇文章，将文章表和分类表进行关联
Article.belongsTo(CateModel, { foreignKey: 'cate', constraints: false })
