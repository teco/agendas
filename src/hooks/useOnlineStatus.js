import { useEffect, useState } from 'react'

export function useOnlineStatus() {
  // Default true — navigator.onLine is unreliable on localhost and behind VPNs.
  // We trust the online/offline events instead; assume online until told otherwise.
  const [isOnline, setIsOnline] = useState(true)

  useEffect(() => {
    const up   = () => setIsOnline(true)
    const down = () => setIsOnline(false)
    window.addEventListener('online',  up)
    window.addEventListener('offline', down)
    return () => {
      window.removeEventListener('online',  up)
      window.removeEventListener('offline', down)
    }
  }, [])

  return isOnline
}
