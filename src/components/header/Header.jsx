export default function Header({ authenticated, onLogout }) {
  return (
    <header>
      <div className="brand">
        <span className="brand-name">angermess</span>
        <img src="logo.png" alt="angermess logo" className="logo" />
      </div>

      {authenticated && (
        <div className="user-block">
          <span className="welcome">[anonymous]</span>
          <button className="logout" onClick={onLogout}>
            Log out
          </button>
        </div>
      )}
    </header>
  )
}