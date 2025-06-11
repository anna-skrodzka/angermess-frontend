export default function LoginForm({ onSwitch, onLogin }) {
  return (
    <>
      <h2 className="auth-title">Identify Yourself</h2>
      <input type="text" placeholder="nickname" className="auth-input" />
      <input type="password" placeholder="passphrase" className="auth-input" />
      <button className="auth-button" onClick={onLogin}>🔥 Break In 🔥</button>
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