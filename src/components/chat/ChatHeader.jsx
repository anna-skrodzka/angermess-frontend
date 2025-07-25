import { useState, useRef, useEffect } from 'react'

function ChatHeader({ roomName, isConnected, onDeleteRoom }) {
  const [showConfirm, setShowConfirm] = useState(false)
  const [showMenu, setShowMenu] = useState(false)
  const menuRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="chat-header">
      <div className="chat-header-left">
        <span className="room-name">{roomName}</span>
        <span className={isConnected ? 'online' : 'offline'}>
          {isConnected ? ' online' : ' offline'}
        </span>
      </div>

      <div className="settings-wrapper" ref={menuRef}>
        <button
          className="settings-button"
          onClick={() => setShowMenu(!showMenu)}
          title="Room settings"
        >
          <img src="/settings.png" alt="settings" className="settings-icon" />
        </button>

        {showMenu && (
          <div className="settings-menu">
            {!showConfirm ? (
              <button onClick={() => setShowConfirm(true)}>
                <img src="/trash.png" className="trash-icon" /> Delete room
              </button>
            ) : (
              <div className="confirm-box">
                <div className="confirm-text">Are you absolutely sure?</div>
                <div className="confirm-actions">
                  <button className="confirm-yes" onClick={onDeleteRoom}>Yes</button>
                  <button className="confirm-no" onClick={() => setShowConfirm(false)}>No</button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default ChatHeader