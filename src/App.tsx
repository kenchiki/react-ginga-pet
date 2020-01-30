import React, { useEffect } from 'react'
import 'bootstrap'
import './assets/stylesheets/application.scss'

import House from './component/House'
import About from './component/About'
import Nav from './component/Nav'
import Login from './component/Login'
import Logout from './component/Logout'
import OauthCallback from './component/OauthCallback'
import ReceivedLetters from './component/ReceivedLetters'
import SentLetters from './component/SentLetters'
import WriteLetter from './component/WriteLetter'

import { useDispatch, useSelector } from 'react-redux'
import { login } from './redux/actions'

import Account from './lib/Account'

import {
  Switch,
  Route,
  BrowserRouter as Router
} from 'react-router-dom'

import { RootState } from './redux'

const App: React.FC = () => {
  const accountSelector: any = useSelector((state: RootState) => state.account)
  const isLogin: boolean = accountSelector.isLogin

  const singletonSelector: any = useSelector((state: RootState) => state.singleton)
  const account: Account = singletonSelector.account
  const dispatch: any = useDispatch()

  const messageSelector: any = useSelector((state: RootState) => state.message)
  const message: string = messageSelector.message

  useEffect(() => {
    // accountがログイン済みならisLoginをtrueにする
    if (account.isLogin()) dispatch(login())
    console.log('login check by account')
  }, [account, dispatch])

  return (
    <div id="app">
      <Router>
        <div id="wrapper">
          <div id="container-row">
            <h1 id="header-logo">銀河ペット</h1>
            <div id="container-col">
              <header id="header">
                <Nav />
              </header>
              <div id="content">
                {
                  (() => {
                    if (isLogin) {
                      return (
                        <House />
                      )
                    }
                  })()
                }
              </div>
            </div>
            <p id="footer-status">{message}</p>
          </div>
          <Switch>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/logout">
              <Logout />
            </Route>
            <Route path="/write_letter">
              <WriteLetter />
            </Route>
            <Route path="/oauth_callback">
              <OauthCallback />
            </Route>
            <Route path="/received_letters">
              <ReceivedLetters />
            </Route>
            <Route path="/sent_letters">
              <SentLetters />
            </Route>
            <Route path="/">
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  )
}

export default App
