import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import path from 'path'
import model from './model'
import userRouter from './user'
import html from './ssr'

const app = express()

app.use(cookieParser())
app.use(bodyParser.json())                //解析POST传递过来的JOSN数据

// 获取静态文件时，访问build目录
app.use('/', express.static(path.resolve('build')))
app.use('/user', userRouter)

// 其它路由，则发送渲染后的HTML。
app.use(function (req, res, next) {
  if (req.url.startsWith('/user/') || req.url.startsWith('/static/')) {
    return next()
  }
  res.send(html.pageHtml)
})

const Chat = model.getModel('chat')

// 将IO与Express关联。
const server = require('http').Server(app)
const io = require('socket.io')(server)

server.listen(8080, () => {
  console.log('Listen on 8080')
})

io.on('connection', function (socket) {
  socket.on('sendmsg', function (data) {
    const { from, to, msg } = data
    const chatid = [from, to].sort().join('_')
    Chat.create({ chatid, from, to, content: msg }, function (err, doc) {
      //广播这一消息
      io.emit('recvmsg', Object.assign({}, doc._doc))
    })
  })
})