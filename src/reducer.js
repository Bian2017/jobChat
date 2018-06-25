/* 
  每个reducers都有一个state。此时需要合并reducers
*/
import { combineReducers } from 'redux'       // 合并所有reducer 并且返回
import { user } from './redux/user.redux'
import { chatUser } from './redux/chatuser.redux'

export default combineReducers({ user, chatUser })