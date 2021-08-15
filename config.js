/*
 * @Author       : xujian
 * @LastEditors  : xujian
 * @Date         : 2021-07-22 22:26:27
 * @LastEditTime : 2021-08-15 16:42:47
 * @Description  : 数据库的连接信息
 * @FilePath     : \blog-admin-api\config.js
 */
// 默认dev配置
const config = {
    //  是否开启调式模式
    DEBUG: true,
    //  mysql数据库连接配置
    MYSQL: {
      host: 'localhost',
      database: 'blog',
      username: 'test',
      password: '123456'
    }
  }
  
  if (process.env.NODE_ENV === 'production') {
    //  生成环境的mysql数据库配置
    config.MYSQL = {
      host: 'localhost',
      database: 'blog',
      username: 'test',
      password: '123456'
    }
  }
  module.exports = config
  