import React from 'react'
import ReactDom from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import App from './App'
import { counter, addNumber, addNumberAsync, reduceNumber } from './reduxStore'

// 不存在则执行空函数
const reduxDevtools = window.devToolsExtension ? window.devToolsExtension() : () => { }

const store = createStore(counter, compose(
  applyMiddleware(thunk),
  reduxDevtools
))

function render() {
  ReactDom.render(
    <App store={store}
      addNumber={addNumber}
      reduceNumber={reduceNumber}
      addNumberAsync={addNumberAsync}
    />,
    document.getElementById('root')
  )
}

render()

// 当store发生变化时，调用render
store.subscribe(render)