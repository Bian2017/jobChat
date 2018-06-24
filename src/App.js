import React from 'react'

class App extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const store = this.props.store
    const num = store.getState()
    const addNumber = this.props.addNumber
    const reduceNumber = this.props.reduceNumber
    const addNumberAsync = this.props.addNumberAsync

    return <div>
      <h2>欢迎来到新世界， 当前自加 {num}次</h2>
      <button onClick={() => { store.dispatch(addNumber()) }}>自加</button>
      <button onClick={() => { store.dispatch(reduceNumber()) }}>自减</button>
      <button onClick={() => { store.dispatch(addNumberAsync()) }}>异步自加</button>
    </div>
  }
}

export default App