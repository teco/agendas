import { formatEventDate } from '../utils/date.js'
import { useOnlineStatus } from '../hooks/useOnlineStatus.js'

const CATEGORY_META = {
  suggested: { color: '#00A1E0', label: 'Session'      },
  also:      { color: '#5B8FA8', label: 'Alt. Session' },
  oneOnOne:  { color: '#D97706', label: '1:1'          },
  social:    { color: '#7C3AED', label: 'Social'       },
}

const stripHtml = (html) => (html ? html.replace(/<[^>]*>/g, '') : '')

const calBtnBase = {
  borderColor: '#D1D5DB',
  color: '#374151',
  background: '#fff',
}

export default function EventDetail({ event, isFavorited, onToggleFavorite, onClose }) {
  const isOnline = useOnlineStatus()
  const meta = CATEGORY_META[event.eventCategory] || CATEGORY_META.suggested

  const locationParts = [event.room, event.area].filter(Boolean)
  const hasLocation = locationParts.length > 0
  const location = locationParts.join(', ')

  const dateCompact  = event.date.replace(/-/g, '')
  const startCompact = event.startTime.replace(':', '')
  const endCompact   = event.endTime.replace(':', '')

  const gcalUrl =
    'https://calendar.google.com/calendar/render?action=TEMPLATE' +
    '&text='     + encodeURIComponent(event.title) +
    '&dates='    + dateCompact + 'T' + startCompact + '00/' +
                   dateCompact + 'T' + endCompact   + '00' +
    '&details='  + encodeURIComponent(stripHtml(event.summary)) +
    '&location=' + encodeURIComponent(location)

  const outlookUrl =
    'https://outlook.live.com/calendar/0/deeplink/compose' +
    '?subject='  + encodeURIComponent(event.title) +
    '&startdt='  + event.date + 'T' + event.startTime + ':00' +
    '&enddt='    + event.date + 'T' + event.endTime   + ':00' +
    '&body='     + encodeURIComponent(stripHtml(event.summary)) +
    '&location=' + encodeURIComponent(location)

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
            <div className="flex-1 text-xl font-bold" style={{ color: '#032D60' }}>
              {event.url ? (
                isOnline ? (
                  <a
                    href={event.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: '#032D60', textDecoration: 'none' }}
                  >
                    {event.title} <span style={{ color: '#9CA3AF' }}>↗</span>
                  </a>
                ) : (
                  <span
                    title="Requires internet connection"
                    style={{ opacity: 0.6, cursor: 'not-allowed' }}
                  >
                    {event.title} <span style={{ color: '#9CA3AF' }}>↗</span>
                  </span>
                )
              ) : (
                <h2 className="text-xl font-bold m-0" style={{ color: '#032D60' }}>
                  {event.title}
                </h2>
              )}
            </div>
            <button
              type="button"
              onClick={() => onToggleFavorite(event.id)}
              aria-label={isFavorited ? 'Remove from My Schedule' : 'Add to My Schedule'}
              className="flex items-center justify-center shrink-0"
              style={{
                width: 44,
                height: 44,
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                fontSize: 26,
                lineHeight: 1,
                color: isFavorited ? '#00A1E0' : '#9CA3AF',
              }}
            >
              {isFavorited ? '★' : '☆'}
            </button>
          </div>

          {/* Badge */}
          <div className="mt-2">
            <span
              className="text-xs px-2 py-0.5 rounded-full text-white"
              style={{ background: meta.color }}
            >
              {meta.label}
            </span>
          </div>

          {/* Date / time / location */}
          <div className="mt-3 text-sm" style={{ color: '#374151' }}>
            <div>{formatEventDate(event.date)}</div>
            <div>{event.startTime} – {event.endTime}</div>
            {hasLocation && <div className="mt-1">{locationParts.join(' · ')}</div>}
          </div>

          {/* Registration warning */}
          {event.registrationRequired && (
            <div
              className="mt-4 px-4 py-3 rounded"
              style={{
                background: '#FEF2F2',
                borderLeft: '4px solid #F87171',
                color: '#991B1B',
              }}
            >
              Registration required
            </div>
          )}

          {/* Transition warning */}
          {event.transitionWarning && (
            <div
              className="mt-4 px-4 py-3 rounded flex items-start gap-2"
              style={{
                background: '#FFFBEB',
                borderLeft: '4px solid #FBBF24',
                color: '#92400E',
              }}
            >
              <span aria-hidden="true">⚠</span>
              <span>{event.transitionWarning}</span>
            </div>
          )}

          {/* Optional metadata */}
          <div className="mt-4 text-sm" style={{ color: '#374151' }}>
            {event.type && (
              <div className="mb-2">
                <span className="font-semibold">Format: </span>
                <span>{event.type}</span>
              </div>
            )}
            {event.topic && (
              <div className="mb-2">
                <span className="font-semibold">Topic: </span>
                <span>{event.topic}</span>
              </div>
            )}
            {event.participants && (
              <div className="mb-2">
                <span className="font-semibold">Meeting with: </span>
                <span>{event.participants}</span>
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

          {/* Directions */}
          {event.mapsUrl && (
            <div className="mt-4">
              {isOnline ? (
                <a
                  href={event.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#00A1E0', textDecoration: 'underline' }}
                >
                  Get directions ↗
                </a>
              ) : (
                <span
                  title="Requires internet connection"
                  style={{ color: '#00A1E0', opacity: 0.6, cursor: 'not-allowed' }}
                >
                  Get directions ↗
                </span>
              )}
            </div>
          )}

          {/* Calendar buttons */}
          <div className="mt-6 flex flex-wrap gap-2">
            {isOnline ? (
              <>
                <a
                  href={gcalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border rounded px-4 py-2 text-sm"
                  style={{ ...calBtnBase, textDecoration: 'none', display: 'inline-block' }}
                >
                  Add to Google Calendar
                </a>
                <a
                  href={outlookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border rounded px-4 py-2 text-sm"
                  style={{ ...calBtnBase, textDecoration: 'none', display: 'inline-block' }}
                >
                  Add to Outlook
                </a>
              </>
            ) : (
              <>
                <button
                  type="button"
                  disabled
                  title="Requires internet connection"
                  className="border rounded px-4 py-2 text-sm"
                  style={{ ...calBtnBase, opacity: 0.5, cursor: 'not-allowed' }}
                >
                  Add to Google Calendar
                </button>
                <button
                  type="button"
                  disabled
                  title="Requires internet connection"
                  className="border rounded px-4 py-2 text-sm"
                  style={{ ...calBtnBase, opacity: 0.5, cursor: 'not-allowed' }}
                >
                  Add to Outlook
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
