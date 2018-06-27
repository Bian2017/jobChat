/* Sever SSR */
import React from 'react'
import { renderToString, renderToStaticMarkup } from 'react-dom/server'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { StaticRouter } from 'react-router-dom'           // BrowserRouter改成StaticRouter
import csshook from 'css-modules-require-hook/preset'     // 要置于APP之前，否则APP的HOOK还没生效
import assethook from 'asset-require-hook'
import reducers from '../src/reducer'                     // 要修改文件路径
import App from '../src/app'                              // 要修改文件路径
import staticPath from '../build/asset-manifest.json'

assethook({
  extensions: ['png', 'jpg']
})

const store = createStore(reducers, compose(
  applyMiddleware(thunk),
))

const context = {}
const makeUp = renderToString(
  <Provider store={store}>
    <StaticRouter
      // location={req.url}    //额外参数
      context={context}     //如果路由有跳转，context可以告诉我们路由跳转
    >
      <App></App>
    </StaticRouter>
  </Provider >
)

const pageHtml = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="theme-color" content="#000000">
    <title>React App</title>
    <link rel="stylesheet" href="/${staticPath['main.css']}">
  </head>
  <body>
    <noscript>
      You need to enable JavaScript to run this app.
    </noscript>
    <div id="root">${makeUp}</div>
    <script src="/${staticPath['main.js']}"></script>
  </body>
</html>
`

module.exports = {
  pageHtml
}