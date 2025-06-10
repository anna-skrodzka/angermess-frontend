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
            {parsed.timestamp && (
              <div
                style={{
                  fontSize: '9px',
                  color: 'rgba(170, 170, 170, 0.5)',
                  textAlign: 'right',
                  marginTop: '4px',
                }}
              >
                {new Date(parsed.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}
              </div>
            )}
            {parsed.text}
          </div>
        )
      })}
    </div>
  )
}