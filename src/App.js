import React from 'react'
import { connect } from 'react-redux'
import { addNumber, reduceNumber, addNumberAsync } from './reduxStore'

class App extends React.Component {
  render() {
    return <div>
      <h2>欢迎来到新世界， 当前自加 {this.props.num}次</h2>
      <button onClick={() =>  this.props.addNumber() }>自加</button>
      <button onClick={() =>  this.props.reduceNumber() }>自减</button>
      <button onClick={() =>  this.props.addNumberAsync() }>异步自加</button>
    </div>
  }
}

const mapStatetoProps = state => {
  return {
    num: state
  }
}

const actionCreators = { addNumber, reduceNumber, addNumberAsync }

// 第一个参数：把state给到props.num；第二个参数：把方法给到props。
App = connect(mapStatetoProps, actionCreators)(App)

export default App