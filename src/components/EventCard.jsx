const CATEGORY_META = {
  suggested: { color: '#00A1E0', label: 'Session',      accent: null      },
  also:      { color: '#5B8FA8', label: 'Alt. Session', accent: '#5B8FA8' },
  oneOnOne:  { color: '#D97706', label: '1:1',          accent: '#D97706' },
  social:    { color: '#7C3AED', label: 'Social',       accent: '#7C3AED' },
}

export default function EventCard({ event, isFavorited, onToggleFavorite, onSelect }) {
  const meta = CATEGORY_META[event.eventCategory] || CATEGORY_META.suggested

  const locationParts = []
  if (event.room) locationParts.push(event.room)
  if (event.area) locationParts.push(event.area)
  const hasLocation = locationParts.length > 0
  const hasIndicators = event.registrationRequired || event.transitionWarning
  const showRow3 = hasLocation || hasIndicators

  function handleStarClick(e) {
    e.stopPropagation()
    onToggleFavorite(event.id)
  }

  return (
    <div
      onClick={() => onSelect(event)}
      className="relative bg-white rounded-lg shadow-sm mb-2 px-4 py-3 cursor-pointer hover:bg-slate-50"
      style={{
        borderLeft: meta.accent ? `4px solid ${meta.accent}` : undefined,
      }}
    >
      <button
        type="button"
        onClick={handleStarClick}
        aria-label={isFavorited ? 'Remove from My Schedule' : 'Add to My Schedule'}
        className="absolute top-2 right-2 flex items-center justify-center"
        style={{
          width: 44,
          height: 44,
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          fontSize: 22,
          lineHeight: 1,
          color: isFavorited ? '#00A1E0' : '#9CA3AF',
        }}
      >
        {isFavorited ? '★' : '☆'}
      </button>

      <div className="flex items-center justify-between pr-10">
        <span className="text-sm" style={{ color: '#6B7280' }}>
          {event.startTime}–{event.endTime}
        </span>
        <span
          className="text-xs px-2 py-0.5 rounded-full text-white"
          style={{ background: meta.color }}
        >
          {meta.label}
        </span>
      </div>

      <div className="mt-1 pr-10 font-semibold" style={{ color: '#032D60' }}>
        {event.title}
        {event.url && (
          <span style={{ color: '#9CA3AF', marginLeft: 4 }}>↗</span>
        )}
      </div>

      {showRow3 && (
        <div className="mt-1 flex items-center flex-wrap gap-2 text-sm" style={{ color: '#6B7280' }}>
          {hasLocation && <span>{locationParts.join(' · ')}</span>}
          {event.registrationRequired && (
            <span
              className="text-xs px-2 py-0.5 rounded text-white"
              style={{ background: '#D97706' }}
            >
              Reg. required
            </span>
          )}
          {event.transitionWarning && (
            <span style={{ color: '#D97706' }} aria-label="Transition warning">⚠</span>
          )}
        </div>
      )}
    </div>
  )
}
