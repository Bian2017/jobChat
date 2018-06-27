import React from 'react'
import { NavBar, List, InputItem, Icon, Grid } from 'antd-mobile'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { getMsgList, sendMsg, recvMsg, readMsg } from '../../redux/chat.redux'
import { getChatId } from '../../util/util'
import QueueAnim from 'rc-queue-anim'

@withRouter
@connect(
  state => state,
  { getMsgList, sendMsg, recvMsg, readMsg }
)
class Chat extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      text: '',
      msg: []
    }
  }

  componentDidMount() {
    if (!this.props.chat.chatmsg.length) {
      this.props.getMsgList()
      this.props.recvMsg()
    }
  }

  // 卸载组件时，给后端发送数据，把当时聊天的信息都置为已读。
  componentWillUnmount() {
    const to = this.props.match.params.user
    this.props.readMsg(to)
  }

  // 解决emoji的bug
  fixCarousel() {
    setTimeout(function () {
      window.dispatchEvent(new Event('resize'))
    }, 0)
  }

  handleSubmit() {
    const from = this.props.user._id
    const to = this.props.match.params.user
    const msg = this.state.text
    this.props.sendMsg({ from, to, msg })
    this.setState({
      text: '',
      showEmoji: false
    })
  }

  render() {
    const Item = List.Item
    const userid = this.props.match.params.user
    const users = this.props.chat.users
    const chatId = getChatId(userid, this.props.user._id)
    const chatMsg = this.props.chat.chatmsg.filter(v => v.chatid === chatId)
    const emoji = '😀 😃 😄 😁 😆 😅 😂 🤣 😊 😇 😉 😌 😍 😘 😋 😝 😜 🤪 🤨 🧐 🤓 😎 😏 😞 😔 😟 😕 😫 😢 😭 😤 😡 😱 😨 😰 😓 🤗 🤭 🙄 😯 😧 😲 😴 😪 😵 🤐 🤢 🤮 🤧 😷 🤒 👌 👈 👉 🤠 😈 👿 👹 👺 🤡 🖐 😫 😩 😢 😭 😤 😠 😡 💩 👻 💀 ☠️ 💍 💄 💋'
      .split(' ')
      .filter(v => v)    //防止多个空格出现
      .map(v => ({ text: v }))

    if (!users[userid]) {
      return null
    }

    const footerComp = (
      <div className="stick-footer">
          <InputItem
            placeholder="请输入内容"
            value={this.state.text}
            onChange={v => { this.setState({ text: v }) }}
            extra={<div>
              <span style={{ marginRight: 15 }}
                onClick={() => {
                  this.setState({ showEmoji: !this.state.showEmoji })
                  this.fixCarousel()
                }}
              >😀</span>
              <span onClick={() => this.handleSubmit()}>发送</span>
            </div>} >
            聊天
          </InputItem>
        {this.state.showEmoji ?
          <Grid data={emoji}
            columnNum={9}
            isCarousel={true}
            carouselMaxRow={4}
            onClick={el => {
              this.setState({
                text: this.state.text + el.text
              })
            }}
          /> : null}
      </div>)

    return (
      <div id="chat-page">
        <NavBar
          mode="dark"
          icon={<Icon type="left" />}
          onLeftClick={() => {
            this.props.history.goBack()
          }}
        >
          {users[userid].name}
        </NavBar>
        <List
          renderFooter={() => footerComp}
        >
          <QueueAnim type='left' delay={100}>
            {
              chatMsg.map(v => {
                const avatar = require(`../img/${users[v.from].avatar}.png`)
                return v.from === userid ? (
                  <Item key={v._id}
                    thumb={avatar}>{v.content}</Item>
                ) : (
                    <Item key={v._id}
                      className='chat-me'
                      extra={<img src={avatar} alt='头像' />}
                    >{v.content}</Item>
                  )
              })
            }
          </QueueAnim>
        </List>
      </div>
    )
  }
}

export default Chat