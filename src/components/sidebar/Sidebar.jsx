import SidebarRoomList from './SidebarRoomList'
import CreateRoom from './CreateRoom'

function Sidebar({ onSelectRoom }) {
  const handleCreateRoom = (roomName) => {
    fetch('/rooms/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: roomName,
        token: localStorage.getItem('token'),
      }),
    })
      .then((res) => {
        if (res.ok) {
          console.log('Room created')
//           refreshRoomList()
        } else {
          res.text().then(msg => alert('Create failed: ' + msg))
        }
      })
      .catch((err) => {
        console.error('Room creation error:', err)
        alert('Create error: ' + err.message)
      })
  }

  return (
    <aside className="sidebar">
      <div className="sidebar-room-list">
        <SidebarRoomList onSelectRoom={onSelectRoom} />
      </div>
      <div className="sidebar-footer">
        <CreateRoom onCreate={handleCreateRoom} />
      </div>
    </aside>
  )
}

export default Sidebar