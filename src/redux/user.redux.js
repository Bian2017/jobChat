import axios from 'axios'

const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
const ERROR_MSG = 'ERROR_MSG'

const initState = {
  isAuth: '',
  msg: '',
  user: '',
  pwd: '',
  type: ''
}

// reducer
export function user(state = initState, action) {
  switch (action.type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        msg: '',
        isAuth: true,
        ...action.payload
      }
    case ERROR_MSG:
      return {
        ...state,
        isAuth: false,
        msg: action.msg
      }
    default:
      return state
  }
}

function registerSuccess(data) {
  return { type: REGISTER_SUCCESS, payload: data }
}

function errorMsg(msg) {
  return { msg, type: 'ERROR_MSG' }
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
          dispatch(registerSuccess({ user, pwd, type }))
        } else {
          dispatch(errorMsg(res.data.msg))
        }
      })
  }
}