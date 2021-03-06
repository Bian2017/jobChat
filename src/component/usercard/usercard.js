import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { Card, WhiteSpace, WingBlank } from 'antd-mobile'

@withRouter
class UserCard extends React.Component {
  static propTypes = {
    userList: PropTypes.array.isRequired
  }

  handleClick(v) {
    this.props.history.push(`/chat/${v._id}`)
  }

  render() {
    const Header = Card.Header
    const Body = Card.Body

    return (
      <WingBlank>
        {this.props.userList.map(v => (
          v.avatar ?
            <div key={v._id}>
              <Card onClick={() => this.handleClick(v)}>
                <Header
                  title={v.user}
                  thumb={require(`../img/${v.avatar}.png`)}
                  extra={<span>{v.title}</span>}>
                </Header>
                <Body>
                  {v.type === 'boss' ? <div>公司: {v.company}</div> : null}
                  {v.desc.split('\n').map(val => {
                    return val ? <div key={val}>{val}</div> : null
                  })}
                  {v.type === 'boss' ? <div>薪资：{v.money}</div> : null}
                </Body>
              </Card>
              <WhiteSpace />
            </div> : null
        ))}
      </WingBlank>
    )
  }
}

export default UserCard