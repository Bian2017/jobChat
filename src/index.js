import React from 'react'
import ReactDom from 'react-dom'
import { createStore } from 'redux'
import App from './App'
import { counter, addNumber, reduceNumber } from './reduxStore';

const store = createStore(counter)

function render() {
  ReactDom.render(
    <App store={store} addNumber={addNumber} reduceNumber={reduceNumber} />,
    document.getElementById('root')
  )
}

render()

// 当store发生变化时，调用render
store.subscribe(render)