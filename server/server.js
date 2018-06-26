const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const app = express()

// 将IO与express关联。
const server  = require('http').Server(app)
const io = require('socket.io')(server)

io.on('connection', function(socket){
  console.log('user login')
})

const userRouter = require('./user')

app.use(cookieParser())
app.use(bodyParser.json())      //解析Post传递过来的JOSN数据

app.use('/user', userRouter)
server.listen(8080, () => {
  console.log('Listen on 8080')
})
