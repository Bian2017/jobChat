const mongoose = require('mongoose')

// 链接mongo并且使用chat集合
const DB_URL = 'mongodb://127.0.0.1:27017/chat'

mongoose.connect(DB_URL)
mongoose.connection.on('connected', () => {
  console.log('mongo connect success')
})