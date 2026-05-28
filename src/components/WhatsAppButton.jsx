import { whatsappNumber } from '../config.js'
import { useOnlineStatus } from '../hooks/useOnlineStatus.js'

const msg = "Hi, I'm at Salesforce Connections and would like to connect."
const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`

const btnStyle = {
  width: 56,
  height: 56,
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: '0 4px 12px rgba(0,0,0,0.25)',
  fontSize: 13,
  fontWeight: 700,
  color: '#fff',
  border: 'none',
  cursor: 'pointer',
  background: '#22C55E',
}

export default function WhatsAppButton({ onOfflineTap }) {
  const isOnline = useOnlineStatus()

  if (isOnline) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-4 right-4 z-40 hover:opacity-90"
        style={{ ...btnStyle, display: 'flex', textDecoration: 'none' }}
        aria-label="WhatsApp team inbox"
      >
        WA
      </a>
    )
  }

  return (
    <button
      type="button"
      onClick={onOfflineTap}
      aria-label="WhatsApp — requires internet connection"
      className="fixed bottom-4 right-4 z-40"
      style={{ ...btnStyle, opacity: 0.5, cursor: 'not-allowed' }}
    >
      WA
    </button>
  )
}
