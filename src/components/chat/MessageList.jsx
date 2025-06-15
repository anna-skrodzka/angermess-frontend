import { useRef, useEffect } from 'react'

export default function MessageList({ messages }) {
  const messagesRef = useRef(null)
  const myId = localStorage.getItem("userId")

  useEffect(() => {
    messagesRef.current?.scrollTo({
      top: messagesRef.current.scrollHeight,
      behavior: 'smooth'
    })
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

        const isMyMessage = parsed.author?.id === myId
        const messageClass = isMyMessage ? 'msg my' : 'msg'
        const authorName = parsed.author?.nickname || 'Unknown'

        return (
          <div key={idx} className={messageClass}>
            {!isMyMessage && (
              <div className="msg-author other">
                {authorName}
              </div>
            )}

            <div className="msg-text">
              {parsed.text}
            </div>

            {parsed.timestamp && (
              <div className="msg-time">
                {new Date(parsed.timestamp).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: false,
                })}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}