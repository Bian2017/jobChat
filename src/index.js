import React from 'react'
import ReactDom from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import App from './app'
import reducers from './reducer'
import './config'
import './index.css'

// 不存在则执行空函数
const reduxDevtools = window.devToolsExtension ? window.devToolsExtension() : () => { }


// Only chrome can handle the redux dev tool
// redux compose cannot handle a null or undefined middleware
if (window.navigator.userAgent.includes('Chrome')) {
  var store = createStore(
    reducers,
    compose(
      applyMiddleware(thunk),
      reduxDevtools
    )
  )
} else {
  var store = createStore(
    reducers,
    compose(
      applyMiddleware(thunk)
    )
  )
}


// const store = createStore(reducers, compose(
//   applyMiddleware(thunk),
//   reduxDevtools
// ))

ReactDom.render(
  (<Provider store={store}>
    <BrowserRouter>
      <App></App>
    </BrowserRouter>
  </Provider >),
  document.getElementById('root')
)