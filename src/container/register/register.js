import React from 'react'
import Logo from '../../component/logo/logo'
import { List, InputItem, Radio, WingBlank, WhiteSpace, Button, Toast } from 'antd-mobile'
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
        {this.props.redirectTo ? <Redirect to={this.props.redirectTo} /> : null}
        <Logo />
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
          <Button type="primary" onClick={this.handleRegister}>注册</Button>
        </List>
      </div>
    )
  }
}

export default Register 