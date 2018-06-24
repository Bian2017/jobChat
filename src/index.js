import React from 'react'
import ReactDom from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Link } from 'react-router-dom'
import App from './App'
import { counter } from './reduxStore'

// 不存在则执行空函数
const reduxDevtools = window.devToolsExtension ? window.devToolsExtension() : () => { }

const store = createStore(counter, compose(
  applyMiddleware(thunk),
  reduxDevtools
))

function Two() {
  return <h2>hello, two </h2>
}

function Three() {
  return <h2>hello ,three </h2>
}

ReactDom.render(
  (<Provider store={store}>
    <BrowserRouter>
      <div>
        <ul>
          <li><Link to='/'>第一页</Link></li>
          <li><Link to='/two'>第二页</Link></li>
          <li><Link to='/three'>第三页</Link></li>
        </ul>
        <Route path='/' exact component={App}></Route>
        <Route path='/two' component={Two}></Route>
        <Route path='/three' component={Three}></Route>
      </div>
    </BrowserRouter>
  </Provider>),
  document.getElementById('root')
)