import React from 'react'
import ReactDom from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Link, Redirect, Switch } from 'react-router-dom'
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

function Test(props) {
  console.log(props)

  // 可以通过history.push来实现路由的调整
  // props.history.push('/')   

  // 可以通过如下形式获取url里的参数
  return <h2>hello Test {props.match.params.location} </h2>
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
        {/*无论返回什么，都跳转到/two目录下*/}
        {/* <Redirect to="/two"></Redirect> */}

        {/*只渲染命中的第一个Route*/}
        <Switch>
          <Route path='/' exact component={App}></Route>
          <Route path='/two' component={Two}></Route>
          <Route path='/three' component={Three}></Route>
          <Route path='/:location' component={Test}></Route>
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>),
  document.getElementById('root')
)