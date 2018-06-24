const express = require('express')
const userRouter = require('./user')

const app = express()

app.use('/user', userRouter)
app.listen(8080, () => {
  console.log('Listen on 8080')
})
