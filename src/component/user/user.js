import React from 'react'
import { connect } from 'react-redux'
import { Result, List, WhiteSpace, Button, Modal } from 'antd-mobile'
import browserCookies from 'browser-cookies'

@connect(
  state => state.user
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
          window.location.href = window.location.href
        }
      }
    ])
  }

  render() {
    const props = this.props
    const Item = List.Item
    const Brief = Item.Brief

    return props.user ? (
      <div>
        <Result
          img={<img src={require(`../img/${this.props.avatar}.png`)} style={{ width: 50 }} alt="" />}
          title={props.user}
          message={props.type === "boss" ? props.company : null}
        />
        <List renderHeader={() => '简介'}>
          <Item multipleLine>{props.title}</Item>
          {
            props.desc.split('\n').map(v =>
              <Brief key={v}>{v}</Brief>)
          }
          {props.money ? <Brief>薪资:{props.money}</Brief> : null}
        </List>
        <WhiteSpace></WhiteSpace>
        <List>
          <Button onClick={this.logout}>注销</Button>
        </List>
      </div>) : null
  }
}

export default User