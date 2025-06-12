import MessageList from './MessageList'
import MessageInput from './MessageInput'
import { useWebSocket } from '../../hooks/useWebSocket'

function Chat({ messages, input, setInput, currentRoom, appendMessage }) {
  const { socketRef, isConnected } = useWebSocket(currentRoom, appendMessage)

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
    <section className="chat">
      <div className="chat-header">
        {currentRoom}
        <span className={isConnected ? 'online' : 'offline'}>
          {isConnected ? ' online' : ' offline'}
        </span>
      </div>

      <MessageList messages={messages} />
      <MessageInput input={input} setInput={setInput} onSend={sendMessage} />
    </section>
  )
}

export default Chat