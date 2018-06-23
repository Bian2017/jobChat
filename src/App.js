import React from 'react'
import { Button } from 'antd-mobile'

class App extends React.Component {
  render() {
    const name = 'li'
    return <div>
      <h2>欢迎来到新世界, {name}</h2>
      <Button type='primary'>Click</Button>
      </div>
  }
}

export default App