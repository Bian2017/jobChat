import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import path from 'path'
import model from './model'
import csshook from 'css-modules-require-hook/preset'   // 要置前，放在最上面，否则HOOK还没生效
import assethook from 'asset-require-hook'

assethook({
  extensions: ['png']
})

const app = express()
const Chat = model.getModel('chat')

import React from 'react'
import { renderToString, renderToStaticMarkup } from 'react-dom/server'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { StaticRouter } from 'react-router-dom'     //BrowserRouter改成StaticRouter
import reducers from '../src/reducer'         //要修改文件路径
import App from '../src/app'                  //要修改文件路径
import staticPath from '../build/asset-manifest.json'

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

  const store = createStore(reducers, compose(
    applyMiddleware(thunk),
  ))

  let context={}
  const makeUp = renderToString(
    <Provider store={store}>
      <StaticRouter
        location={req.url}    //额外参数
        context={context}     //如果路由有跳转，context可以告诉我们路由跳转
      >
        <App></App>
      </StaticRouter>
    </Provider >
  )

  const pageHtml = `
    <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
      <meta name="theme-color" content="#000000">
      <title>React App</title>
      <link rel="stylesheet" href="/${staticPath['main.css']}">
    </head>
    <body>
      <noscript>
        You need to enable JavaScript to run this app.
      </noscript>
      <div id="root">${makeUp}</div>
      <script src="/${staticPath['main.js']}"></script>
    </body>
  </html>
  `

  res.send(pageHtml)
  // return res.sendFile(path.resolve('build/index.html'))
})

app.use('/', express.static(path.resolve('build')))
server.listen(8080, () => {
  console.log('Listen on 8080')
})
