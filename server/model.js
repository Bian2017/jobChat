const mongoose = require('mongoose')

// 链接mongo并且使用jobChat集合
const DB_URL = 'mongodb://127.0.0.1:27017/jobChat'
mongoose.connect(DB_URL)

const models = {
  user: {
    'user': { type: String, require: true },
    'pwd': { type: String, require: true },
    'type': { type: String, require: true },
    'avatar': { type: String },
    'desc': { type: String },         // 个人简介
    'title': { type: String },        // 职位名
    'company': { type: String },
    'money': { type: String }
  },
  chat: {

  }
}

for (let i in models) {
  mongoose.model(i, new mongoose.Schema(models[i]))
}

module.exports = {
  getModel: function(name) {
    return mongoose.model(name)
  }
}