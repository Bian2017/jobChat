import React from 'react'
import Logo from '../../component/logo/logo'
import { List, InputItem, Radio, WingBlank, WhiteSpace, Button } from 'antd-mobile'

const RadioItem = Radio.RadioItem

class Register extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      type: 'jobSeekers'      //或者boss
    }
  }

  render() {
    return (
      <div>
        <Logo />
        <List>
          <InputItem>用户</InputItem>
          <InputItem>密码</InputItem>
          <InputItem>确认密码</InputItem>
          <RadioItem checked={this.state.type == 'jobSeekers'}>
            求职者
          </RadioItem>
          <RadioItem checked={this.state.type == 'boss'}>
            老板
          </RadioItem>
          <Button type="primary">注册</Button>
        </List>
        <h2>注册页</h2>
      </div>
    )
  }
}

export default Register 