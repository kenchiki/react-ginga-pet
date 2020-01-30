import { createStore, combineReducers } from 'redux'
import account from './account'
import singleton from './singleton'
import message from './message'
import Account from '../lib/Account'
import Pet from '../lib/Pet'

export interface RootState {
  account: {
    isLogin: boolean
  },
  message: {
    message: string
  },
  singleton: {
    account: Account,
    pet: Pet
  }
}

const rootReducer = combineReducers({ account, message, singleton })
export default createStore(rootReducer)
