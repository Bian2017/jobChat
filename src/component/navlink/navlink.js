import React from 'react'
import { TabBar } from 'antd-mobile'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

@withRouter
@connect(
  state => state.chat
)
class NavLinkBar extends React.Component {
  static propTypes = {
    data: PropTypes.array.isRequired
  }

  render() {
    const { pathname } = this.props.location
    const navList = this.props.data.filter(v => !v.hide)
    const newArr = navList.find(v => v.path === pathname)
    const Subcomponent = newArr && newArr.component

    return (
      <TabBar>
        {navList.map(v =>
          <TabBar.Item
            badge={v.path === '/msg' ? this.props.unread : 0}
            key={v.path}
            title={v.text}
            icon={{ uri: require(`./img/${v.icon}.png`) }}
            selectedIcon={{ uri: require(`./img/${v.icon}-active.png`) }}
            selected={pathname === v.path}
            onPress={() => {
              this.props.history.push(v.path)
            }}
          >
            <Subcomponent></Subcomponent>
          </TabBar.Item>
        )}
      </TabBar>
    )
  }
}

export default NavLinkBar