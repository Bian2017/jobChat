import React from 'react'
import { Route, Switch } from 'react-router-dom'
import asyncComponent from './component/AsyncComponent'
import Dashboard from './component/dashboard/dashboard'
import AuthRoute from './component/authRoute/authRoute'
import Chat from './component/chat/chat'

const AsyncLogin = asyncComponent(() => import('./container/login/login'))
const AsyncRegister = asyncComponent(()=>import('./container/register/register'))
const AsyncBossInfo = asyncComponent(()=>import('./container/bossinfo/bossinfo'))
const AsyncJobSeekersInfo = asyncComponent(()=>import('./container/jobseekersinfo/jobSeekersInfo'))

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isError: false
    }
  }

  componentDidCatch(err, info) {
    console.log(err, info)
    this.setState({
      isError: true
    })
  }

  render() {
    return this.state.isError ? <img src={require('./404.jpg')} alt="error" /> : (<div>
      <AuthRoute></AuthRoute>
      <Switch>
        <Route path='/bossinfo' component={AsyncBossInfo}></Route>
        <Route path='/jobseekersinfo' component={AsyncJobSeekersInfo}></Route>
        <Route path='/login' component={AsyncLogin}></Route>
        <Route path='/register' component={AsyncRegister}></Route>
        <Route path='/chat/:user' component={Chat}></Route>
        <Route component={Dashboard}></Route>
      </Switch>
    </div>)
  }
}

export default App