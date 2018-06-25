import React from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import { loadData } from '../../redux/user.redux'
import { connect } from 'react-redux';

// AuthRoute 并不是一个路由组件，只是一个普通组件。
// 此时可以通过withRouter进行包裹下，就可以获取Router组件的特性。
@withRouter
@connect(         // 注意Connect要写在@withRouter后面
  null,
  { loadData }
)
class AuthRoute extends React.Component {
  componentDidMount() {
    const publicList = ['/login', '/register']
    const pathname = this.props.location.pathname

    // 已经在登录/注册页，则无需获取用户信息
    if (publicList.indexOf(pathname) > -1) {
      return null
    }

    // 获取用户信息
    axios.get('/user/info')
      .then(res => {
        if (res.status === 200) {
          if (res.data.code === 0) {
            this.props.loadData(res.data.data)
          } else {
            this.props.history.push('./login')
          }
        }
      })


  }

  render() {
    return null
  }
}

export default AuthRoute