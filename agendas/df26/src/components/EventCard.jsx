import { categoryColors, labelText, categoryLabels } from '../config.js'

export default function EventCard({ event, isFavorited, onToggleFavorite, onSelect }) {
  const { accent, tint } = categoryColors[event.eventCategory] || { accent: null, tint: '#ffffff' }
  const label = categoryLabels[event.eventCategory] || null

  function handleStarClick(e) {
    e.stopPropagation()
    onToggleFavorite(event.id)
  }

  return (
    <div
      onClick={() => onSelect(event)}
      className="relative rounded-lg shadow-sm mb-2 px-4 py-3 cursor-pointer"
      style={{
        background: tint,
        borderLeft: accent ? `4px solid ${accent}` : undefined,
      }}
      onMouseEnter={(e) => { e.currentTarget.style.filter = 'brightness(0.97)' }}
      onMouseLeave={(e) => { e.currentTarget.style.filter = '' }}
    >
      {/* Star — top-right */}
      <button
        type="button"
        onClick={handleStarClick}
        aria-label={isFavorited ? 'Remove from Interested' : 'Add to Interested'}
        className="absolute top-2 right-2 flex items-center justify-center"
        style={{
          width: 44,
          height: 44,
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          fontSize: 22,
          lineHeight: 1,
          color: isFavorited ? '#0176D3' : '#9CA3AF',
        }}
      >
        {isFavorited ? '★' : '☆'}
      </button>

      {/* Title */}
      <div className="pr-10 font-semibold" style={{ color: '#032D60' }}>
        {event.title}
      </div>

      {/* Category label */}
      {label && (
        <div className="text-xs mt-0.5" style={{ color: labelText, opacity: 0.75 }}>
          {label}
        </div>
      )}
    </div>
  )
}
