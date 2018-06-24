import React from 'react'
import { Link, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from './Auth.redux'
import App from './App'

function Two() {
  return <h2>hello, two </h2>
}

function Three() {
  return <h2>hello ,three </h2>
}

@connect(
  state => state.auth,
  { logout }
)

class Dashboard extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const redirectToLogin = <Redirect to='/login'></Redirect>

    const app = (
      <div>
        {this.props.isAuth ? <button onClick={() => this.props.logout()}>注销</button> : null}
        <ul>
          <li><Link to='/dashborad/'>第一页</Link></li>
          <li><Link to='/dashboard/two'>第二页</Link></li>
          <li><Link to='/dashboard/three'>第三页</Link></li>
        </ul>
        <Route path='/dashboard/' exact component={App}></Route>
        <Route path='/dashboard/two' component={Two}></Route>
        <Route path='/dashboard/three' component={Three}></Route>
      </div>)

    return this.props.isAuth ? app : redirectToLogin
  }
}

export default Dashboard