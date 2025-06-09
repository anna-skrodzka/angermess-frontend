import { useRef, useEffect } from 'react'

export default function MessageList({ messages }) {
  const messagesRef = useRef(null)

  useEffect(() => {
    messagesRef.current?.scrollTo({ top: messagesRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages])

  return (
    <div className="messages" ref={messagesRef}>
      {messages.map((msg, idx) => {
        let parsed
        try {
          parsed = JSON.parse(msg)
        } catch {
          parsed = { text: msg }
        }

        return (
          <div key={idx} className="msg">
            {parsed.text}
            {parsed.timestamp && (
              <div style={{ fontSize: '10px', color: '#aaa' }}>
                {new Date(parsed.timestamp).toLocaleTimeString()}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}