import { useState, useCallback } from 'react'
import Header from './components/header/Header'
import Sidebar from './components/sidebar/Sidebar'
import Chat from './components/chat/Chat'
import { useWebSocket } from './hooks/useWebSocket'

function App() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')

  const appendMessage = useCallback((msg) => {
    setMessages(prev => [...prev, msg])
  }, [])

  const { socketRef, isConnected } = useWebSocket(appendMessage)

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
    <div className="background">
      <Header />

      <main className="chat-window">
        <Sidebar />
        <Chat
          messages={messages}
          input={input}
          setInput={setInput}
          sendMessage={sendMessage}
          isConnected={isConnected}
        />
      </main>
    </div>
  )
}

export default App