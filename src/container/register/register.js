import React from 'react'
import Logo from '../../component/logo/logo'
import { List, InputItem, Radio, WingBlank, WhiteSpace, Button } from 'antd-mobile'

const RadioItem = Radio.RadioItem

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
    console.log('state', this.state)
  }

  render() {
    return (
      <div>
        <Logo />
        <List>
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