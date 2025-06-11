import { useEffect, useState } from 'react'
import SidebarRoomList from './SidebarRoomList'

function Sidebar({ onSelectRoom }) {
  return (
    <aside className="sidebar">
      <SidebarRoomList onSelectRoom={onSelectRoom} />
    </aside>
  )
}

export default Sidebar