import React from 'react'
import { addNumber } from './reduxStore'

class App extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const store = this.props.store
    const num = store.getState()

    return <div>
      <h2>欢迎来到新世界， 当前Click {num}次</h2>
      <button onClick={() => { store.dispatch(addNumber()) }}>Click</button>
    </div>
  }
}

export default App