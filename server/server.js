import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import path from 'path'
import model from './model'
import React from 'react'
import { renderToString, renderToStaticMarkup } from 'react-dom/server'

const app = express()
const Chat = model.getModel('chat')

function App() {
  return (
    <div>
        <p>Server render</p>
    </div>
  )
}

console.log(renderToString(<App></App>))

// 将IO与express关联。
const server = require('http').Server(app)
const io = require('socket.io')(server)

io.on('connection', function (socket) {
  socket.on('sendmsg', function (data) {
    //广播这一消息
    const { from, to, msg } = data
    const chatid = [from, to].sort().join('_')
    Chat.create({ chatid, from, to, content: msg }, function (err, doc) {
      io.emit('recvmsg', Object.assign({}, doc._doc))
    })

    console.log('接受数据', data)

  })
})

const userRouter = require('./user')

app.use(cookieParser())
app.use(bodyParser.json())      //解析Post传递过来的JOSN数据

app.use('/user', userRouter)

//设置白名单
app.use(function (req, res, next) {
  if (req.url.startsWith('/user/') || req.url.startsWith('/static/')) {
    return next()
  }
  const htmlRes = renderToString(<App></App>)
  res.send(htmlRes)
  // return res.sendFile(path.resolve('build/index.html'))
})

app.use('/', express.static(path.resolve('build')))
server.listen(8080, () => {
  console.log('Listen on 8080')
})
