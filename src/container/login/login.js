import React from 'react'
import Logo from '../../component/logo/logo'
import { List, InputItem, WingBlank, WhiteSpace, Button, Toast } from 'antd-mobile'
import { connect } from 'react-redux'
import { login } from '../../redux/user.redux'
import { Redirect } from 'react-router-dom'


function WrapperHello(Comp) {
  class WrapComp extends React.Component {
    render() {

      return (<div>
        <p>这是高阶组件特有的元素</p>
        <Comp {...this.props}></Comp>
      </div>)
    }
  }
  return WrapComp
}

/* 方法一 */
class Hello extends React.Component {
  render() {
    return <h2>React&&Redux</h2>
  }
}

Hello = WrapperHello(Hello)

/* 方法二：使用装饰器 */
// @WrapperHello
// class Hello extends React.Component {
//   render() {
//     return <h2>React&&Redux</h2>
//   }
// }

@connect(
  state => state.user,
  { login }
)
class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: '',
      pwd: ''
    }

    //若使用箭头函数，每次都会传入新的一个对象。如下方式虽然会多写几行代码，但性能会有一点点好处，每次传入的都是之前定义好的对象。
    this.register = this.register.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
  }

  register() {
    this.props.history.push('/register')
  }

  handleChange(key, val) {
    this.setState({
      [key]: val
    })
  }

  handleLogin() {
    this.props.login(this.state)
  }

  render() {
    return (
      <div>
        <Hello />
        <Logo />
        <h2>登录页</h2>
        {this.props.redirectTo && this.props.redirectTo != '/login' ? <Redirect to={this.props.redirectTo} /> : null}
        <WingBlank>
          <List>
            {this.props.msg ? Toast.info(this.props.msg) : null}
            <InputItem
              onChange={v => this.handleChange('user', v)}
            >
              用户
            </InputItem>
            <InputItem
              type='password'
              onChange={v => this.handleChange('pwd', v)}
            >
              密码
            </InputItem>
          </List>
          <WhiteSpace />
          <Button type="primary" onClick={this.handleLogin}>登录</Button>
          <WhiteSpace />
          <Button onClick={this.register} type="primary">注册</Button>
        </WingBlank>
      </div>
    )
  }
}

export default Login