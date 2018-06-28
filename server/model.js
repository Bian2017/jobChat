const mongoose = require('mongoose')

// 链接mongo并且使用jobChat集合
//const DB_URL = 'mongodb://127.0.0.1:27017/jobChat'
const DB_URL = 'mongodb://127.0.0.1:18888/jobChat'
mongoose.connect(DB_URL)

const models = {
  user: {
    'user': { 'type': String, 'require': true },
    'pwd': { 'type': String, 'require': true },
    'type': { 'type': String, 'require': true },
    'avatar': { 'type': String },
    'desc': { 'type': String },         // 个人简介
    'title': { 'type': String },        // 职位名
    'company': { 'type': String },
    'money': { 'type': String }
  },
  chat: {
    'chatid': { 'type': String, 'require': true },
    'from': { 'type': String, 'require': true },
    'to': { 'type': String, 'require': true },
    'read': { 'type': Boolean, 'default': false },
    'content': { 'type': String, 'require': true, 'default': '' },
    'create_time': { 'type': Number, default: new Date().getTime() }
  }
}

for (let i in models) {
  mongoose.model(i, new mongoose.Schema(models[i]))
}

module.exports = {
  getModel: function (name) {
    return mongoose.model(name)
  }
}
