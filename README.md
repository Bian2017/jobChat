
# Chat


## 环境配置

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

// 后台启动
mongod --config /usr/local/etc/mongod.conf

// 启动MongoDB

mongo
```

+ 安装mongoose依赖

```bash
npm install mongoose --save
```

#### TIPS

1. 为什么点击事件通过箭头函数方式调用?

```JS
<button onClick={()=>this.handleClick()}>
```

答：通过箭头函数绑定this，避免直接对函数使用bind(this)操作。

