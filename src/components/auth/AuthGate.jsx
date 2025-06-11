import { useState } from 'react'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'

export default function AuthGate({ onAuthSuccess }) {
  const [mode, setMode] = useState('login')

  return (
    <div className="auth-container">
      <div className="auth-box">
        {mode === 'login' ? (
          <LoginForm
            onSwitch={setMode}
            onLogin={onAuthSuccess}
          />
        ) : (
          <RegisterForm
            onSwitch={setMode}
            onRegister={onAuthSuccess}
          />
        )}
      </div>
    </div>
  )
}