const express = require('express')
const mongoose = require('mongoose')

// 链接mongo并且使用chat集合
const DB_URL = 'mongodb://127.0.0.1:27017/chat'

mongoose.connect(DB_URL)
mongoose.connection.on('connected', () => {
  console.log('mongo connect success')
})

// 定义文档模型
const User = mongoose.model('user', new mongoose.Schema({
  user: {
    type: String,
    require: true
  },
  age: {
    type: Number,
    require: true
  }
}))

// 新增数据
// User.create({
//   user: 'ligang',
//   age: 32
// }, (err, doc) => {
//   if (!err) {
//     console.log(doc)
//   } else {
//     console.log(err)
//   }
// })

// 删除数据
// User.remove({ age: 30 }, (err, doc) => console.log(doc))

// 更新数据
User.update({ 'user': 'ligang' }, { '$set': { age: 36 } }, (err, doc) => console.log(doc))

const app = express()

app.get('/', (req, res) => {
  res.send('<h1>hello world</h1>')
})

app.get('/data', (req, res) => {
  User.findOne({age: 36}, (err, doc) => {
    return res.json(doc)
  })
})


app.listen(8010, () => {
  console.log('Listen on 8010')
})
