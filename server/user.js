const express = require('express')
const utils = require('utility')
const Router = express.Router()
const model = require('./model')

const User = model.getModel('user')

Router.get('/list', function (req, res) {
  User.find({}, function (err, doc) {
    return res.json(doc)
  })
})

Router.post('/register', function (req, res) {
  const { user, pwd, type } = req.body

  User.findOne({ user: user }, function (err, doc) {
    if (doc) {
      return res.json({ code: 1, msg: '用户已存在' })
    }
    User.create({ user, type, pwd: md5Pwd(pwd) }, function (e, d) {
      if (e) {
        return res.json({ code: 1, msg: '后端出错了' })
      }
      return res.json({ code: 0 })
    })
  })
})

Router.get('/info', function (req, res) {
  return res.json({ code: 1 })
})

// 采用两层md5+盐的方式提高密码复杂度
function md5Pwd(pwd) {
  const salt = 'job_boss_chat@w123edc#'
  return utils.md5(utils.md5(pwd + salt))
}

module.exports = Router