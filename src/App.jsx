import { useState, useCallback } from 'react'
import Header from './components/Header'
import MessageList from './components/MessageList'
import MessageInput from './components/MessageInput'
import Sidebar from './components/Sidebar'
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

        <section className="chat">
          <div className="chat-header">
            common room
            <span className={isConnected ? 'online' : 'offline'}>
              {isConnected ? ' online' : ' offline'}
            </span>
          </div>

          <MessageList messages={messages} />
          <MessageInput input={input} setInput={setInput} onSend={sendMessage} />
        </section>
      </main>
    </div>
  )
}

export default App