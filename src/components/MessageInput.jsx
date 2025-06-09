export default function MessageInput({ input, setInput, onSend }) {
  const send = () => {
    const trimmed = input.trim()
    if (trimmed) onSend(trimmed)
    setInput('')
  }

  return (
    <div className="input-area">
      <input
        type="text"
        placeholder="message..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && send()}
      />
      <button onClick={send}>➤</button>
    </div>
  )
}