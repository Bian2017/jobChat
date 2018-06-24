import axios from 'axios'
import { Toast } from 'antd-mobile'

// 拦截请求---在发送请求的时候都要加上loading
axios.interceptors.request.use(function(config) {
  Toast.loading('加载中', 0)
  return config
})

// 拦截响应
axios.interceptors.request.use(function(config) {
  setTimeout(() => {
    Toast.hide()
  }, 500);
  
  return config
})