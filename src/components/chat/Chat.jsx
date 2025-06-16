import { useState, useCallback } from 'react'
import Sidebar from '../sidebar/Sidebar'
import MessageList from './MessageList'
import MessageInput from './MessageInput'
import { useWebSocket } from '../../hooks/useWebSocket'
import ChatHeader from './ChatHeader'

function Chat() {
  const [currentRoom, setCurrentRoom] = useState('general')
  const [messages, setMessages] = useState([])
  const appendMessage = useCallback((msg) => {
    setMessages(prev => [...prev, msg])
  }, [])
  const { socketRef, isConnected } = useWebSocket(currentRoom, appendMessage)

  const handleRoomChange = (room) => {
    setCurrentRoom(room)
    setMessages([])
  }

  const sendMessage = (text) => {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      const message = JSON.stringify({
        text,
        timestamp: new Date().toISOString()
      })
      socketRef.current.send(message)
    }
  }

  return (
    <main className="chat-window">
      <Sidebar onSelectRoom={handleRoomChange} />
      <section className="chat">
        <ChatHeader roomName={currentRoom} isConnected={isConnected} />
        <MessageList messages={messages} />
        <MessageInput onSend={sendMessage} />
      </section>
    </ main>
  )
}

export default Chat