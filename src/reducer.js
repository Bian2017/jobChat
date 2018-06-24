/* 
  两个reducers，每个reducers都有一个state。此时需要合并reducers
*/
import { combineReducers } from 'redux'       // 合并所有reducer 并且返回
import { counter } from './index.redux'
import { auth } from './Auth.redux'

export default combineReducers({ counter, auth })

