import { useEffect, useRef, useState } from 'react'

export function useWebSocket(onMessage) {
  const socketRef = useRef(null)
  const [isConnected, setIsConnected] = useState(false)
  const room = 'general'

  useEffect(() => {
    const socket = new WebSocket(`ws://localhost:8080/ws-chat?room=${room}`)
    socketRef.current = socket

    socket.onopen = () => setIsConnected(true)
    socket.onclose = () => setIsConnected(false)

    socket.onmessage = (event) => {
      onMessage(event.data)
    }

    return () => socket.close()
  }, [onMessage])

  return { socketRef, isConnected }
}