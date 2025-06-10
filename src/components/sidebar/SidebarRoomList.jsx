function SidebarRoomList({ rooms }) {
  return (
    <>
      {rooms.map((room, idx) => (
        <div key={idx} className="chat-item">
          {room.name}<br />
          <span className="last-msg">{room.last}</span>
        </div>
      ))}
    </>
  )
}

export default SidebarRoomList