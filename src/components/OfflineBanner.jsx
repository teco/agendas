import { useOnlineStatus } from '../hooks/useOnlineStatus.js'

export default function OfflineBanner() {
  const isOnline = useOnlineStatus()
  if (isOnline) return null
  return (
    <div
      className="w-full text-xs text-center py-1.5 px-4"
      style={{
        background: '#FFFBEB',
        borderBottom: '1px solid #FDE68A',
        color: '#92400E',
      }}
    >
      You are offline — schedule is available, some features are disabled
    </div>
  )
}
