import { categoryColors, labelText, categoryLabels } from '../config.js'

export default function EventDetail({ event, isFavorited, onToggleFavorite, onClose }) {
  const { accent, tint } = categoryColors[event.eventCategory] || { accent: null, tint: '#ffffff' }
  const label = categoryLabels[event.eventCategory] || 'Session'

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-end justify-center"
      style={{ background: 'rgba(0, 0, 0, 0.4)' }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white w-full rounded-t-2xl overflow-y-auto"
        style={{ maxHeight: '90vh' }}
      >
        <div className="relative p-5">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute top-2 right-2 flex items-center justify-center"
            style={{
              width: 44,
              height: 44,
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              fontSize: 28,
              lineHeight: 1,
              color: '#6B7280',
            }}
          >
            ×
          </button>

          {/* Title + star */}
          <div className="flex items-start justify-between pr-10 gap-3">
            <h2 className="flex-1 text-xl font-bold m-0" style={{ color: '#032D60' }}>
              {event.title}
            </h2>
            <button
              type="button"
              onClick={() => onToggleFavorite(event.id)}
              aria-label={isFavorited ? 'Remove from Interested' : 'Add to Interested'}
              className="flex items-center justify-center shrink-0"
              style={{
                width: 44,
                height: 44,
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                fontSize: 26,
                lineHeight: 1,
                color: isFavorited ? '#0176D3' : '#9CA3AF',
              }}
            >
              {isFavorited ? '★' : '☆'}
            </button>
          </div>

          {/* Category badge */}
          <div className="mt-2">
            <span
              className="text-xs px-2 py-0.5 rounded-full"
              style={{
                color: labelText,
                background: tint,
                border: accent ? `1px solid ${accent}` : '1px solid #D1D5DB',
              }}
            >
              {label}
            </span>
          </div>

          {/* Venue string — replaces date/time/location row */}
          <div className="mt-3 text-sm" style={{ color: '#6B7280' }}>
            Dreamforce 2026 · Sep 15–17 · San Francisco
          </div>

          {/* Optional metadata */}
          <div className="mt-4 text-sm" style={{ color: '#374151' }}>
            {event.type && (
              <div className="mb-2">
                <span className="font-semibold">Track: </span>
                <span>{event.type}</span>
              </div>
            )}
            {event.topic && (
              <div className="mb-2">
                <span className="font-semibold">Topic: </span>
                <span>{event.topic}</span>
              </div>
            )}
          </div>

          {/* Summary */}
          {event.summary && (
            <div
              className="mt-3 text-sm leading-relaxed"
              style={{ color: '#374151' }}
              dangerouslySetInnerHTML={{ __html: event.summary }}
            />
          )}
        </div>
      </div>
    </div>
  )
}
