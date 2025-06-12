import { useState } from 'react'

export default function RegisterForm({ onSwitch, onRegister }) {
  const [nickname, setNickname] = useState('')
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')
  const [error, setError] = useState(null)

  const handleRegister = async () => {
    if (!nickname.trim()) {
      setError("We need a name to label you")
      return
    }
    if (!password.trim()) {
      setError("Lockdown: missing passphrase")
      return
    }
    if (password.length < 2) {
      setError("Passphrase must be at least 3 characters long")
      return
    }
    if (password !== repeatPassword) {
      setError("Identity split: passphrases mismatch")
      return
    }

    try {
      const res = await fetch('/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nickname, password })
      })

      if (!res.ok) {
        const { error } = await res.json()
        setError(error || 'Registration failed')
        return
      }

      const { token } = await res.json()
      localStorage.setItem('token', token)
      onRegister(token)
    } catch (e) {
      setError('Server unavailable')
    }
  }

  return (
    <>
      <h2 className="auth-title">Create Your Identity</h2>

      <input
        type="text"
        placeholder="choose nickname"
        className="auth-input"
        value={nickname}
        onChange={(e) => {
          setNickname(e.target.value)
          setError(null)
        }}
      />
      <input
        type="password"
        placeholder="set passphrase"
        className="auth-input"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value)
          setError(null)
        }}
      />
      <input
        type="password"
        placeholder="repeat passphrase"
        className="auth-input"
        value={repeatPassword}
        onChange={(e) => {
          setRepeatPassword(e.target.value)
          setError(null)
        }}
      />

      {error && <div className="auth-error">{error}</div>}

      <button className="auth-button" onClick={handleRegister}>
        ⚡️ Activate Identity ⚡️
      </button>

      <div className="auth-footer">
        <span className="auth-hint">
          Already exist in the chaos?
          <button className="auth-link" onClick={() => onSwitch('login')}>
            Break in
          </button>
        </span>
      </div>
    </>
  )
}