var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
// 引入token验证中间件
const verifyMiddleware = require('./routes/middleware/verify')
// 导入路由配置
const indexRouter = require('./routes/index')
const cateRouter = require('./routes/cate')
const articleRouter = require('./routes/article')
const infoRouter = require('./routes/info')
const adminRouter = require('./routes/admin')

var app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
// 注册路由,并添加token验证中间件
app.use('/', verifyMiddleware.verifyToken, indexRouter)
app.use('/cate', verifyMiddleware.verifyToken, cateRouter)
app.use('/article', verifyMiddleware.verifyToken, articleRouter)
app.use('/info', verifyMiddleware.verifyToken, infoRouter)
app.use('/admin', verifyMiddleware.verifyToken, adminRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
