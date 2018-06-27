import React from 'react'
import Logo from '../../component/logo/logo'
import { List, InputItem, Radio, Button, Toast, WingBlank, WhiteSpace } from 'antd-mobile'
import { connect } from 'react-redux'
import { register } from '../../redux/user.redux'
import { Redirect } from 'react-router-dom'
import formHoc from '../../component/formHoc/formHoc'

@connect(
  state => state.user,
  { register }
)
@formHoc
class Register extends React.Component {
  constructor(props) {
    super(props)
    this.handleRegister = this.handleRegister.bind(this)
  }

  componentDidMount() {
    this.props.handleChange('type', 'jobSeekers')
  }

  handleRegister() {
    this.props.register(this.props.state)
  }

  render() {
    const RadioItem = Radio.RadioItem

    return (
      <div>
        {this.props.redirectTo && this.props.redirectTo !== '/register' ? <Redirect to={this.props.redirectTo} /> : null}
        <WingBlank>
          <WhiteSpace />
          <Logo />
          <WhiteSpace />
          <List>
            {this.props.msg ? Toast.info(this.props.msg) : null}
            <InputItem
              onChange={v => this.props.handleChange('user', v)}
            >
              用户
          </InputItem>
            <InputItem
              type='password'
              onChange={v => this.props.handleChange('pwd', v)}
            >
              密码
          </InputItem>
            <InputItem
              type='password'
              onChange={v => this.props.handleChange('repeatPwd', v)}
            >
              确认密码
          </InputItem>
            <RadioItem
              checked={this.props.state.type === 'jobSeekers'}
              onChange={() => this.props.handleChange('type', 'jobSeekers')}
            >
              求职者
          </RadioItem>
            <RadioItem
              checked={this.props.state.type === 'boss'}
              onChange={() => this.props.handleChange('type', 'boss')}
            >
              老板
          </RadioItem>
          </List>
          <WhiteSpace />
          <Button type="primary" onClick={this.handleRegister}>注册</Button>
        </WingBlank>
      </div>
    )
  }
}

export default Register 