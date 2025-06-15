import { useState } from 'react'

export default function LoginForm({ onSwitch, onLogin }) {
  const [nickname, setNickname] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

  const handleChange = (setter) => (e) => {
    setter(e.target.value)
    if (error) setError(null)
  }

  const handleLogin = async () => {
    if (!nickname.trim()) {
      setError("No name, no entry")
      return
    }
    if (!password.trim()) {
      setError("No passphrase. No access.")
      return
    }

    try {
      const res = await fetch('/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nickname, password })
      })

      if (!res.ok) {
        const { error } = await res.json()
        setError(error || 'Login failed')
        return
      }

      const { token, userId } = await res.json()
      localStorage.setItem('token', token)
      localStorage.setItem('userId', userId)
      onLogin(token)
    } catch (e) {
      setError('Server unavailable')
    }
  }

  return (
    <>
      <h2 className="auth-title">Identify Yourself</h2>
      <input
        type="text"
        placeholder="nickname"
        className="auth-input"
        value={nickname}
        onChange={handleChange(setNickname)}
      />
      <input
        type="password"
        placeholder="passphrase"
        className="auth-input"
        value={password}
        onChange={handleChange(setPassword)}
      />
      {error && <div className="auth-error">{error}</div>}
      <button className="auth-button" onClick={handleLogin}>
        🔥 Break In 🔥
      </button>
      <div className="auth-footer">
        <span className="auth-hint">
          Don’t have a code name yet?
          <button className="auth-link" onClick={() => onSwitch('register')}>
            Summon one
          </button>
        </span>
      </div>
    </>
  )
}