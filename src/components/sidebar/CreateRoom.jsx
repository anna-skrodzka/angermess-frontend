import { useState, useRef, useEffect } from 'react'

function CreateRoom({ onCreate }) {
  const [creating, setCreating] = useState(false)
  const [roomName, setRoomName] = useState('')
  const inputRef = useRef(null)
  const wrapperRef = useRef(null)

  const handleSubmit = () => {
    const trimmed = roomName.trim()
    if (trimmed.length > 0) {
      onCreate(trimmed)
    }
    setRoomName('')
    setCreating(false)
  }

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target)
      ) {
        setCreating(false)
        setRoomName('')
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="create-room chat-item" ref={wrapperRef}>
      {creating ? (
        <input
          ref={inputRef}
          type="text"
          className="create-room-input"
          placeholder="Enter room name"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSubmit()
            if (e.key === 'Escape') {
              setCreating(false)
              setRoomName('')
            }
          }}
          autoFocus
        />
      ) : (
        <div onClick={() => setCreating(true)} className="create-room-placeholder">
          + New Room
        </div>
      )}
    </div>
  )
}

export default CreateRoom