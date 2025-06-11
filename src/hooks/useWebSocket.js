import { useEffect, useRef, useState } from 'react'

export function useWebSocket(room, onMessage) {
  const socketRef = useRef(null)
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    const socket = new WebSocket(`ws://localhost:8080/ws-chat?room=${room}`)
    socketRef.current = socket

    socket.onopen = () => setIsConnected(true)
    socket.onclose = () => setIsConnected(false)
    socket.onmessage = (event) => onMessage(event.data)

    return () => socket.close()
  }, [room, onMessage])

  return { socketRef, isConnected }
}