import React from 'react'
import axios from 'axios'
import { Card, WhiteSpace, WingBlank } from 'antd-mobile'
import { getUserList } from '../../redux/chatuser.redux'
import { connect } from 'react-redux';

@connect(
  state => state.chatUser,
  { getUserList }
)
class Boss extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: []
    }
  }

  componentDidMount() {
    this.props.getUserList('jobSeekers')
  }

  render() {
    const Header = Card.Header
    const Body = Card.Body
    // console.log('data', this.state.data)
    return <WingBlank>
      {this.props.userList.map(v => (
        v.avatar ?
          <Card key={v._id}>
            <Header
              title={v.user}
              thumb={require(`../img/${v.avatar}.png`)}
              extra={<span>{v.title}</span>}>
            </Header>
            <Body>
              {v.desc.split('\n').map(v => (<div key={v}>{v}</div>))}
            </Body>
          </Card> : null
      ))}
    </WingBlank>
  }
}

export default Boss