import { useState, useCallback, useEffect } from 'react'
import Header from './components/header/Header'
import Chat from './components/chat/Chat'
import AuthGate from './components/auth/AuthGate'

function App() {
  const [authenticated, setAuthenticated] = useState(false)
  const [nickname, setNickname] = useState('')

  const fetchMe = (token) => {
    return fetch('/auth/me', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        if (!res.ok) throw new Error('unauthorized')
        return res.json()
      })
      .then(data => {
        setAuthenticated(true)
        setNickname(data.nickname)
      })
      .catch(() => {
        localStorage.removeItem('token')
      })
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      fetchMe(token)
    }
  }, [])

  return (
    <div className="background">
      <Header
        authenticated={authenticated}
        nickname={nickname}
        onLogout={() => {
          localStorage.removeItem('token')
          setAuthenticated(false)
          setNickname('')
        }}
      />
      {authenticated ? (
        <Chat />
      ) : (
        <AuthGate onAuthSuccess={(token) => {
          localStorage.setItem('token', token)
          fetchMe(token)
        }} />
      )}
    </div>
  )
}

export default App