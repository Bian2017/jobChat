import React from 'react'
import { connect } from 'react-redux'
import { NavBar } from 'antd-mobile'
import NavLinkBar from '../../component/navlink/navlink'
import Boss from '../../component/boss/boss'
import User from '../../component/user/user'
import Msg from '../../component/msg/msg'
import JobSeekers from '../../component/jobseekers/jobseekers'
import { getMsgList, recvMsg } from '../../redux/chat.redux'

@connect(
  state => state,
  { getMsgList, recvMsg }
)
class Dashboard extends React.Component {
  componentDidMount() {
    if(!this.props.chat.chatmsg.length) {
      this.props.getMsgList()
      this.props.recvMsg()
    }
  }

  render() {
    const user = this.props.user
    const { pathname } = this.props.location

    const navList = [{
      path: '/boss',
      text: '求职者',
      icon: 'boss',
      title: '求职者列表',
      component: Boss,
      hide: user.type === 'jobSeekers'
    }, {
      path: '/jobSeekers',
      text: '老板',
      icon: 'job',
      title: 'BOSS列表',
      component: JobSeekers,
      hide: user.type === 'boss'
    }, {
      path: '/msg',
      text: '消息',
      icon: 'msg',
      title: '消息列表',
      component: Msg,
    }, {
      path: '/me',
      text: '我',
      icon: 'user',
      title: '个人中心',
      component: User
    }]

    return (
      <div>
        <NavBar className='fixed-header' mode="dard">
          {navList.find(v => v.path == pathname).title}
        </NavBar>
        <NavLinkBar data={navList} />
      </div>
    )
  }
}

export default Dashboard