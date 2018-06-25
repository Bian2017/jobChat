import React from 'react'
import { connect } from 'react-redux'
import { Result, List, WhiteSpace, Button } from 'antd-mobile'

@connect(
  state => state.user
)
class User extends React.Component {

  render() {
    const props = this.props
    const Item = List.Item
    const Brief = Item.Brief

    console.log(this.props)
    return props.user ? (
      <div>
        <Result
          img={<img src={require(`../img/${this.props.avatar}.png`)}
            style={{ width: 50 }}
            alt="" />}
          title={props.user}
          message={props.type == "boss" ? props.company : null}
        />
        <List renderHeader={() => '简介'}>
          <Item multipleLine>{props.title}</Item>
          {props.desc.split('\n').map(v =>
            <Brief key={v}>{v}</Brief>
          )}
          {props.money ? <Brief>薪资:{props.money}</Brief> : null}
        </List>
        <WhiteSpace></WhiteSpace>
        <List>
          <Item>注销</Item>
        </List>
      </div>) : null
  }
}

export default User