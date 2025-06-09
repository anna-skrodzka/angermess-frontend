export default function Header() {
  return (
    <header>
      <div className="brand">
        <span className="brand-name">angermess</span>
        <img src="logo.png" alt="angermess logo" className="logo" />
      </div>
      <div className="user-block">
        <span className="welcome">[anonymous]</span>
      </div>
    </header>
  )
}