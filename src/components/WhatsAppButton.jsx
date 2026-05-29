import { whatsappNumber } from '../config.js'
import { useOnlineStatus } from '../hooks/useOnlineStatus.js'

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 32 32" width="28" height="28" fill="white" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 3C9.373 3 4 8.373 4 15c0 2.385.668 4.61 1.832 6.504L4 29l7.701-1.82A11.944 11.944 0 0 0 16 27c6.627 0 12-5.373 12-12S22.627 3 16 3zm0 2c5.523 0 10 4.477 10 10s-4.477 10-10 10a9.944 9.944 0 0 1-5.174-1.445l-.37-.23-4.572 1.08 1.1-4.46-.245-.383A9.944 9.944 0 0 1 6 15c0-5.523 4.477-10 10-10zm-3.27 5.02c-.22-.005-.45.003-.67.084-.23.083-.64.322-.97.643-.33.32-.84.95-.84 2.32 0 1.38.86 2.71.98 2.9.12.18 1.68 2.71 4.12 3.69.58.23 1.02.365 1.37.467.58.175 1.1.15 1.52.09.46-.067 1.42-.58 1.62-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28-.24-.12-1.42-.7-1.64-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06-.24-.12-1-.37-1.91-1.18-.7-.63-1.18-1.4-1.32-1.64-.14-.24-.02-.37.1-.49.12-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.19-.46-.39-.39-.54-.4z"/>
    </svg>
  )
}

const msg = "Oi Terence!"
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
        <WhatsAppIcon />
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
      <WhatsAppIcon />
    </button>
  )
}
