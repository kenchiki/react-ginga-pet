import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { TootInfo } from '../lib/Letter'
import useFetchLetters, { FetchTypes } from './useFetchLetters'
import { AccountInfo } from '../lib/Account'

const ReceivedLetters: React.FC = () => {
  const accountSelector: any = useSelector((state: any) => state.account)
  const isLogin: boolean = accountSelector.isLogin
  const letters: Array<TootInfo> = useFetchLetters(FetchTypes.Received)

  const pickMessage = function (message: TootInfo): string {
    let content: string = message.last_status.content
    content = content.replace(/<span class="h-card">.+<\/span>/, '')
    content = content.replace(/<\/p><p>/, '\n\n')
    content = content.replace(/(<br>|<br \/>)/g, '\n')
    content = content.replace(/<.+?>/g, '')
    content = content.replace(/\n/g, '<br>')

    return content
  }

  const pickFromName = function (message: TootInfo): string {
    const account: AccountInfo = message.last_status.account
    return account.display_name !== '' ? account.display_name : account.username
  }

  const pickCreatedAt = function (message: TootInfo): string {
    // eslint-disable-next-line camelcase
    const lastStatus: { created_at: string; } = message.last_status
    const d = new Date(lastStatus.created_at!)
    return `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()} ${d.getHours()}:${d.getMinutes()}`
  }

  return (
    <div className="messages">
      {
        (() => {
          if (isLogin) {
            return (
              <div className="modal">
                <div className="modal__header">みんなからのお手紙
                  <Link to="/">×</Link>
                </div>
                <div className="modal__in">
                  <div className="letters">
                    <ul className="letters__items">
                      {letters.map(letter => (
                        <li key={letter.id} className="letters__item">
                          <div className="letters__letter">
                            <p className="letters__message">{ pickMessage(letter) }</p>
                            <p className="letters__friend">{ pickFromName(letter) } さんより</p>
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

export default ReceivedLetters
