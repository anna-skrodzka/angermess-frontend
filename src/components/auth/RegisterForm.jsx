export default function RegisterForm({ onSwitch, onRegister }) {
  return (
    <>
      <h2 className="auth-title">Create Your Identity</h2>
      <input type="text" placeholder="choose nickname" className="auth-input" />
      <input type="password" placeholder="set passphrase" className="auth-input" />
      <input type="password" placeholder="repeat passphrase" className="auth-input" />
      <button className="auth-button" onClick={onRegister}>⚡️ Activate Identity ⚡️</button>
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