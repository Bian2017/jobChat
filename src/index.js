import React from 'react'
import ReactDom from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import App from './App'
import { counter, addNumber, addNumberAsync, reduceNumber } from './reduxStore'

const store = createStore(counter, applyMiddleware(thunk))

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