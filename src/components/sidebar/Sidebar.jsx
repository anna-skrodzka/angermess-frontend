import { useEffect, useState } from 'react'
import SidebarRoomList from './SidebarRoomList'

function Sidebar() {
  const [rooms, setRooms] = useState([])

  useEffect(() => {
    fetch('http://localhost:8080/rooms')
      .then(res => res.json())
      .then(data => setRooms(data))
      .catch(err => {
        console.error('Failed to fetch rooms', err)
      })
  }, [])

  return (
    <aside className="sidebar">
      <SidebarRoomList rooms={rooms} />
    </aside>
  )
}

export default Sidebar