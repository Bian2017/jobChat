
# Chat



## 一、环境配置

### 1. 新建工程

```bash
npm install -g create-react-app

create-react-app chat

npm start
```

**自定义配置webpack**

    npm run eject

注意：此过程是单向的，不可逆的。

### 2. antd-moblie配置

    npm install antd-mobile --save


**配置按需加载**

+ 使用babel-plugin-import；

    npm install babel-plugin-import --save

+ 配置package.json；

```json
 "babel": {
    "presets": [
      "react-app"
    ],
    "plugins": [
      [
        "import",
        {
          "libraryName": "antd-mobile",
          "style": "css"
        }
      ]
    ]
  },
```

### 3. 后端配置

+ 安装nodemon
由于每次修改后端代码，都需重启node。安装nodemon，则无需重启Node服务。

```bash
npm install -g nodemon

nodemon server/server.js
```

+ 安装mongodb

```bash

brew install mongodb

//后台启动
mongod --config /usr/local/etc/mongod.conf

//启动MongoDB
mongo
```

+ 安装mongoose依赖

```bash
npm install mongoose --save
```

## 二、Redux配置

### 1. React-thunk中间件

Redux默认只处理同步，异步任务需要react-thunk中间件。使用这个插件，Action不仅可以返回对象，还可以返回函数。

    npm install redux-thunk --save

然后使用applyMiddleware开启thunk中间件。

    const store = createStore(counter, applyMiddleware(thunk))

### 2. Redux DevTools调试工具配置

+ 先安装Chrome插件Redux DevTools。
+ 新建store的时候判断window.devToolsExtension。

```js
// 不存在则执行空函数
const reduxDevtools = window.devToolsExtension ? window.devToolsExtension() : () => { }
```
+ 使用compose结合thunk和window.devToolsExtension

```js
const store = createStore(counter, compose(
  applyMiddleware(thunk),
  reduxDevtools
))
```

打开调试窗的redux选项卡，此时则可以实时看到state。

### 3. React-Redux配置

+ 安装react-redux

    npm install react-redux --save

+ 使用react-redux

此时就不再需要subscribe，只需记住reducer、action、dispatch即可。React-redux提供Provider和connect两个接口来链接。

    1. Provider组件在应用最外层，传入store即可，只用一次；
    2. Connect负责从外部获取组件需要的参数，Connect可以用装饰器的方式来写；

+ 使用装饰器优化connect代码

先安装支持装饰器的插件

    npm install babel-plugin-transform-decorators-legacy --save-dev

然后配置package.json。
```json
"babel": {
  "presets": [
    "react-app"
  ],
  "plugins": [
    "transform-decorators-legacy",      //添加此句
    [
      "import",
      {
        "libraryName": "antd-mobile",
        "style": "css"
      }
    ]
  ]
}
```

+ 复杂redux应用，多个reducer，用combineReducers合并

### 4. React-router4

React-router4是全新版本，和之前的版本不兼容，浏览器和RN均兼容。忘了Router2的内容，拥抱最新的Router4吧。

+ 安装React-router4

    npm install react-router-dom --save

注意： 如果有路由嵌套的话，要加上exact参数，表示完全匹配。


```JS
<Route path='/' exact component={App}></Route>
<Route path='/two' component={Two}></Route>
<Route path='/three' component={Three}></Route>
```

+ 其他组件

  + url参数，Route组件参数可用冒号标识参数
  + Redirect组件，跳转
  + Switch只渲染第一个命中的Route组件

```JS
<Switch>
  <Route path='/' exact component={App}></Route>
  <Route path='/two' component={Two}></Route>
  <Route path='/three' component={Three}></Route>
  <Route path='/:location' component={Test}></Route>
</Switch>
```

如上代码，访问路径/two，会命中两个Route组件，分别是Two组件和Test组件。此时通过Switch，就只会渲染Two组件。


### 5. axios

+ 安装axios

    npm install axios --save

解决本地跨域问题：配置package.json，将所有请求发到本地的8080端口。

```JSON
 "proxy": "http://localhost:8080"
```

+ 设置拦截器

所谓的拦截器，就是所有的请求发送之前都要做的事情，或者所有请求返回之后要做的事情。通过axios.interceptors设置拦截器，比如全局的loading。

```JS
// 拦截请求---在发送请求的时候都要加上loading
axios.interceptors.request.use(function(config) {
  Toast.loading('加载中', 0)
  return config
})
```




#### TIPS

1. 为什么点击事件通过箭头函数方式调用?

```JS
<button onClick={()=>this.handleClick()}>
```

答：通过箭头函数绑定this，避免直接对函数使用bind(this)操作。

