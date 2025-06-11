import { useEffect, useState } from 'react'

function SidebarRoomList({ onSelectRoom }) {
  const [rooms, setRooms] = useState([])

  useEffect(() => {
    fetch('http://localhost:8080/rooms')
      .then(res => res.json())
      .then(data => setRooms(data))
      .catch(err => console.error('Failed to fetch rooms', err))
  }, [])

  return (
    <>
      {rooms.map((room, idx) => (
        <div
          key={idx}
          className="chat-item"
          onClick={() => onSelectRoom(room.name)}
          style={{ cursor: 'pointer' }}
        >
          {room.name}<br />
          <span className="last-msg">{room.last}</span>
        </div>
      ))}
    </>
  )
}

export default SidebarRoomList