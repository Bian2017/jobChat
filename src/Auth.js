import React from 'react'
import { connect } from 'react-redux'
import { login } from './Auth.redux'
import { Redirect } from 'react-router-dom'
import axios  from 'axios'

@connect(
  state => state.auth,
  { login }
)

class Auth extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: {}
    }
  }
  
  componentDidMount() {
    axios.get('/data')
      .then(res => {
        if(res.status == 200) {
          this.setState({data: res.data})
        }
      })
  }

  render() {
    return (
      <div>
        <h2>我的名字是{this.state.data.user}</h2>
        {this.props.isAuth ? <Redirect to='/dashboard' /> : null}
        <h2>请先登录</h2>
        <button onClick={this.props.login}>登录</button>
      </div>
    )
  }
}

export default Auth