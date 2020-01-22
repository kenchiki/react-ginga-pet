import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Account from '../lib/Account'
import Letter from '../lib/Letter'
import { AccountInfo, TootInfo } from '../interface'

const account = new Account()
const letter = new Letter(account)

const SentLetters: React.FC = () => {
  const [state, setState] = useState({ letters: [] } as { letters: Array<TootInfo> })
  const accountSelector: any = useSelector((state: any) => state.account)
  const isLogin: boolean = accountSelector.isLogin

  useEffect(() => {
    (async () => {
      await letter.fetchLetters()
      setState({ letters: letter.sentLetters() })
    })()
  }, [])

  const pickMessage = function (message: TootInfo): string {
    let content: string = message.last_status.content
    content = content.replace(/<span class="h-card">.+<\/span>/, '')
    content = content.replace(/<\/p><p>/, '\n\n')
    content = content.replace(/(<br>|<br \/>)/g, '\n')
    content = content.replace(/<.+?>/g, '')
    content = content.replace(/\n/g, '<br>')

    return content
  }

  const pickToNames = function (message: TootInfo): string {
    return message.accounts.reduce((saveVal: string, account: AccountInfo) => {
      const name = Account.pickName(account)
      return `${name}さんへ ${saveVal}`
    }, '')
  }

  const pickCreatedAt = function (message: TootInfo): string {
    const d = new Date(message.last_status.created_at)
    return `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()} ${d.getHours()}:${d.getMinutes()}`
  }

  return (
    <div className="messages">
      {
        (() => {
          if (isLogin) {
            return (
              <div className="modal">
                <div className="modal__header">
                  送ったお手紙
                  <Link to="/">×</Link>
                </div>
                <div className="modal__in">
                  <div className="letters">
                    <ul className="letters__items">
                      {state.letters.map(letter => (
                        <li key={letter.id} className="letters__item">
                          <div className="letters__letter">
                            <p className="letters__message">{ pickToNames(letter) }</p>
                            <p className="letters__message">{ pickMessage(letter) }</p>
                            <p className="letters__friend">{ pickCreatedAt(letter) }</p>
                          </div>
                        </li>
                      ))}

                    </ul>
                  </div>
                </div>
              </div>
            )
          }
        })()
      }
    </div>
  )
}

export default SentLetters
