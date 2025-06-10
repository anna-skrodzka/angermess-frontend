import MessageList from './MessageList'
import MessageInput from './MessageInput'

function Chat({ messages, input, setInput, sendMessage, isConnected }) {
  return (
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
  )
}

export default Chat