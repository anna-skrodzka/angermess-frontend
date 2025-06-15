import { useEffect, useRef, useState } from 'react'

export function useWebSocket(room, onMessage) {
  const socketRef = useRef(null)
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token')
    const socket = new WebSocket(`ws://localhost:8080/ws-chat?room=${room}`)
    socketRef.current = socket

    socket.onopen = () => {
      setIsConnected(true)
      socket.send(JSON.stringify({ token }))
    }

    socket.onclose = () => setIsConnected(false)

    socket.onmessage = (event) => {
      try {
        onMessage(event.data)
      } catch (e) {
        console.error('Error in onMessage handler', e)
      }
    }

    return () => {
      socket.close()
    }
  }, [room])

  return { socketRef, isConnected }
}