import axios from 'axios'
import { getRedirectPath } from '../util/util'
import { userInfo } from 'os';

const AUTH_SUCCESS = 'AUTH_SUCCESS'
const LOGOUT = 'LOGOUT'
const ERROR_MSG = 'ERROR_MSG'
const LOAD_DATA = 'LOAD_DATA'


const initState = {
  msg: '',
  user: '',
  type: '',
  redirectTo: ''
}

// reducer
export function user(state = initState, action) {
  switch (action.type) {
    case AUTH_SUCCESS:
      return {
        ...state,
        msg: '',
        redirectTo: getRedirectPath(action.payload),
        ...action.payload
      }
    case LOAD_DATA:
      return {
        ...state,
        ...action.payload
      }
    case LOGOUT:
      return {
        ...initState,
        redirectTo: '/login'
      }
    case ERROR_MSG:
      return {
        ...state,
        msg: action.msg
      }
    default:
      return state
  }
}

function authSuccess(obj) {
  const { pwd, ...data } = obj                  //通过这种巧妙的方式可以将password过滤掉。
  return { type: AUTH_SUCCESS, payload: data }
}

function errorMsg(msg) {
  return { msg, type: 'ERROR_MSG' }
}

export function loadData(userInfo) {
  return { type: LOAD_DATA, payload: userInfo }
}

export function logoutSubmit() {
  return { type: LOGOUT }
}

export function update(data) {
  return dispatch => {
    axios.post('/user/update', data)
      .then(res => {
        if (res.status === 200 && res.data.code === 0) {
          dispatch(authSuccess(res.data.data))
        } else {
          dispatch(errorMsg(res.data.msg))
        }
      })
  }
}

export function register({ user, pwd, repeatPwd, type }) {
  if (!user || !pwd || !type) {
    return errorMsg('用户密码必须输入')
  }

  if (pwd !== repeatPwd) {
    return errorMsg('两次输入密码不一致')
  }

  //redux-thunk支持异步的写法，并可以返回一个函数。而Redux只支持同步写法，且返回的是对象。
  return dispatch => {
    axios.post('/user/register', { user, pwd, type })
      .then(res => {
        if (res.status === 200 && res.data.code === 0) {
          dispatch(authSuccess({ user, pwd, type }))
        } else {
          dispatch(errorMsg(res.data.msg))
        }
      })
  }
}

export function login({ user, pwd }) {
  if (!user || !pwd) {
    return errorMsg('必须填写用户名和密码')
  }

  return dispatch => {
    axios.post('/user/login', { user, pwd })
      .then(res => {
        if (res.status === 200 && res.data.code === 0) {
          dispatch(authSuccess(res.data.data))
        } else {
          dispatch(errorMsg(res.data.msg))
        }
      })
  }
}

