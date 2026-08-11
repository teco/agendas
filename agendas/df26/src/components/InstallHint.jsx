import { useState } from 'react'

const STORAGE_KEY = 'df26-install-hint-dismissed'

function isStandalone() {
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    navigator.standalone === true
  )
}

export default function InstallHint() {
  const [dismissed, setDismissed] = useState(() => {
    if (isStandalone()) return true
    try { return localStorage.getItem(STORAGE_KEY) === '1' } catch { return false }
  })

  if (dismissed) return null

  function dismiss() {
    try { localStorage.setItem(STORAGE_KEY, '1') } catch { /* ignore */ }
    setDismissed(true)
  }

  return (
    <div
      className="w-full flex items-start justify-between gap-2 px-4 py-2 text-xs"
      style={{
        background: '#EFF6FF',
        borderBottom: '1px solid #BFDBFE',
        color: '#032D60',
      }}
    >
      <span>
        Add to your home screen for quick access offline. Tap Share (iPhone) or ⋮ (Android) and then "Add to Home Screen".
      </span>
      <button
        type="button"
        onClick={dismiss}
        aria-label="Close"
        style={{
          flexShrink: 0,
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          fontSize: 18,
          lineHeight: 1,
          color: '#032D60',
          padding: '0 2px',
        }}
      >
        ×
      </button>
    </div>
  )
}
