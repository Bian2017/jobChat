import React from 'react'
import { connect } from 'react-redux'
import { Result, List, WhiteSpace, Button, Modal, WingBlank } from 'antd-mobile'
import browserCookies from 'browser-cookies'
import { logoutSubmit } from '../../redux/user.redux'
import { Redirect } from 'react-router-dom'

@connect(
  state => state.user,
  { logoutSubmit }
)
class User extends React.Component {
  constructor(props) {
    super(props)
    this.logout = this.logout.bind(this)
  }

  logout() {
    const alert = Modal.alert

    alert('注销', '确认退出登录吗?', [
      { text: '取消' },
      {
        text: '确认', onPress: () => {
          browserCookies.erase('userid')
          this.props.logoutSubmit()
        }
      }
    ])
  }

  render() {
    const props = this.props
    const Item = List.Item
    const Brief = Item.Brief

    return props.user ? (
      <WingBlank>
        <Result
          img={<img src={require(`../img/${this.props.avatar}.png`)} style={{ width: 50 }} alt="" />}
          title={props.user}
          message={props.type === "boss" ? props.company : null}
        />
        <List renderHeader={() => '简介'}>
          <Item multipleLine>{props.title}</Item>
          {
            props.desc.split('\n').filter(v => v).map(v =>
              <Item key={v}><Brief>{v}</Brief></Item>)
          }
          {props.money ? <Item><Brief>薪资:{props.money}</Brief></Item>: null}
        </List>
        <WhiteSpace></WhiteSpace>
        <Button
          type="primary"
          onClick={this.logout}
        >
          注销
        </Button>
      </WingBlank>
    ) : (props.redirectTo ? <Redirect to={props.redirectTo} /> : null)
  }
}

export default User