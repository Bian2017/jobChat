const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const userRouter = require('./user')

const app = express()

app.use(cookieParser())
app.use(bodyParser.json())      //解析Post传递过来的JOSN数据

app.use('/user', userRouter)
app.listen(8080, () => {
  console.log('Listen on 8080')
})
