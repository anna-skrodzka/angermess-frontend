import { useEffect, useState } from 'react'

function SidebarRoomList({ onSelectRoom }) {
  const [rooms, setRooms] = useState([])

  useEffect(() => {
    fetch('http://localhost:8080/rooms')
      .then(res => res.json())
      .then(data => setRooms(data))
      .catch(err => console.error('Failed to fetch rooms', err))
  }, [])

  function truncate(text, maxLength = 40) {
    return text.length > maxLength ? text.slice(0, maxLength) + '…' : text
  }

  return (
    <>
      {rooms.map((room, idx) => (
        <div
          key={idx}
          className="chat-item"
          onClick={() => onSelectRoom(room.name)}
          style={{ cursor: 'pointer' }}
        >
          <div className="room-name">{room.name}</div>
          <div className="last-msg">
            {room.author && room.author !== 'system' && (
              <span className="author">{room.author}: </span>
            )}
            <span className="text">{truncate(room.last)}</span>
          </div>
        </div>
      ))}
    </>
  )
}

export default SidebarRoomList