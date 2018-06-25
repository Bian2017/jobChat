import React from 'react'
import Logo from '../../component/logo/logo'
import { List, InputItem, Radio, WingBlank, WhiteSpace, Button, Toast } from 'antd-mobile'
import { connect } from 'react-redux'
import { register } from '../../redux/user.redux'
import { Redirect } from 'react-router-dom'

@connect(
  state => state.user,
  { register }
)
class Register extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: '',
      pwd: '',
      repeatPwd: '',
      type: 'jobSeekers'      //或者boss
    }

    this.handleRegister = this.handleRegister.bind(this)
  }

  handleChange(key, val) {
    this.setState({
      [key]: val
    })
  }

  handleRegister() {
    this.props.register(this.state)
    console.log('state', this.state)
  }

  render() {
    const RadioItem = Radio.RadioItem

    return (
      <div>
        {this.props.redirectTo ? <Redirect to={this.props.redirectTo} /> : null}
        <Logo />
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
          <InputItem
            type='password'
            onChange={v => this.handleChange('repeatPwd', v)}
          >
            确认密码
          </InputItem>
          <RadioItem
            checked={this.state.type === 'jobSeekers'}
            onChange={() => this.handleChange('type', 'jobSeekers')}
          >
            求职者
          </RadioItem>
          <RadioItem
            checked={this.state.type === 'boss'}
            onChange={() => this.handleChange('type', 'boss')}
          >
            老板
          </RadioItem>
          <Button type="primary" onClick={this.handleRegister}>注册</Button>
        </List>
      </div>
    )
  }
}

export default Register 