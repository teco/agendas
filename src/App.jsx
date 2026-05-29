import { useEffect, useMemo, useState } from 'react'
import Header from './components/Header.jsx'
import FilterBar from './components/FilterBar.jsx'
import EventCard from './components/EventCard.jsx'
import EventDetail from './components/EventDetail.jsx'
import OfflineBanner from './components/OfflineBanner.jsx'
import InstallHint from './components/InstallHint.jsx'
import WhatsAppButton from './components/WhatsAppButton.jsx'
import Toast from './components/Toast.jsx'
import { events } from './data/events.js'
import { useFavorites } from './hooks/useFavorites.js'
import { formatEventDate } from './utils/date.js'

function applyFilter(allEvents, filter, favorites) {
  switch (filter) {
    case 'sessions':
      return allEvents.filter(
        (e) => e.eventCategory === 'suggested' || e.eventCategory === 'also'
      )
    case 'oneOnOne':
      return allEvents.filter((e) => e.eventCategory === 'oneOnOne')
    case 'social':
      return allEvents.filter((e) => e.eventCategory === 'social')
    case 'mySchedule':
      return allEvents.filter((e) => favorites.has(e.id))
    case 'all':
    default:
      return allEvents
  }
}

function groupByDate(eventList) {
  const groups = new Map()
  for (const e of eventList) {
    if (!groups.has(e.date)) groups.set(e.date, [])
    groups.get(e.date).push(e)
  }
  const sortedDates = Array.from(groups.keys()).sort()
  return sortedDates.map((date) => ({
    date,
    events: groups.get(date).slice().sort((a, b) => a.startTime.localeCompare(b.startTime)),
  }))
}

export default function App() {
  const [filter, setFilter] = useState('all')
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [favorites, toggleFavorite] = useFavorites()
  const [toastVisible, setToastVisible] = useState(false)

  const filteredEvents = useMemo(
    () => applyFilter(events, filter, favorites),
    [filter, favorites]
  )
  const grouped = useMemo(() => groupByDate(filteredEvents), [filteredEvents])

  useEffect(() => {
    document.body.style.overflow = selectedEvent ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [selectedEvent])

  function showOfflineToast() {
    setToastVisible(true)
    setTimeout(() => setToastVisible(false), 3000)
  }

  return (
    <>
      <Header onOfflineTap={showOfflineToast} />
      <InstallHint />
      <FilterBar activeFilter={filter} onFilterChange={setFilter} />
      <OfflineBanner />

      <main className="px-3 py-4" style={{ background: '#F9FAFB', minHeight: '50vh' }}>
        {filteredEvents.length === 0 ? (
          <p className="text-center text-sm py-12" style={{ color: '#9CA3AF' }}>
            No events to show.
          </p>
        ) : (
          grouped.map((group) => (
            <section key={group.date} className="mb-6">
              <h3
                className="text-sm font-semibold uppercase tracking-wide mb-2 px-1"
                style={{ color: '#032D60' }}
              >
                {formatEventDate(group.date)}
              </h3>
              {group.events.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  isFavorited={favorites.has(event.id)}
                  onToggleFavorite={toggleFavorite}
                  onSelect={setSelectedEvent}
                />
              ))}
            </section>
          ))
        )}
      </main>

      {selectedEvent && (
        <EventDetail
          event={selectedEvent}
          isFavorited={favorites.has(selectedEvent.id)}
          onToggleFavorite={toggleFavorite}
          onClose={() => setSelectedEvent(null)}
        />
      )}

      <WhatsAppButton onOfflineTap={showOfflineToast} />
      <Toast message="Requires internet connection" visible={toastVisible} />
    </>
  )
}
