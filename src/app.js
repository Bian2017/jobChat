import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Login from './container/login/login'
import Register from './container/register/register'
import BossInfo from './container/bossinfo/bossinfo'
import JobSeekersInfo from './container/jobseekersinfo/jobSeekersInfo'
import Dashboard from './component/dashboard/dashboard'
import AuthRoute from './component/authRoute/authRoute'
import Chat from './component/chat/chat'

class App extends React.Component {
  render() {
   return ( <div>
      <AuthRoute></AuthRoute>
      <Switch>
        <Route path='/bossinfo' component={BossInfo}></Route>
        <Route path='/jobseekersinfo' component={JobSeekersInfo}></Route>
        <Route path='/login' component={Login}></Route>
        <Route path='/register' component={Register}></Route>
        <Route path='/chat/:user' component={Chat}></Route>
        <Route component={Dashboard}></Route>
      </Switch>
    </div>)
  }
}

export default App