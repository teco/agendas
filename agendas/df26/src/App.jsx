import { useEffect, useMemo, useState } from 'react'
import Header from './components/Header.jsx'
import FilterBar from './components/FilterBar.jsx'
import EventCard from './components/EventCard.jsx'
import EventDetail from './components/EventDetail.jsx'
import OfflineBanner from './components/OfflineBanner.jsx'
import InstallHint from './components/InstallHint.jsx'
import Toast from './components/Toast.jsx'
import { events } from './data/events.js'
import { useFavorites } from './hooks/useFavorites.js'

function applyFilter(allEvents, filter, favorites) {
  switch (filter) {
    case 'unified-data':
    case 'agentforce-mktg':
    case 'ai-journeys':
    case 'media-attribution':
    case 'efficiency':
      return allEvents.filter((e) => e.eventCategory === filter)
    case 'interested':
      return allEvents.filter((e) => favorites.has(e.id))
    case 'all':
    default:
      return allEvents
  }
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

  useEffect(() => {
    document.body.style.overflow = selectedEvent ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [selectedEvent])

  function showOfflineToast() {
    setToastVisible(true)
    setTimeout(() => setToastVisible(false), 3000)
  }

  return (
    <>
      <Header />
      <InstallHint />
      <FilterBar activeFilter={filter} onFilterChange={setFilter} />
      <OfflineBanner />

      <main className="px-3 py-4" style={{ background: '#F9FAFB', minHeight: '50vh' }}>
        {filteredEvents.length === 0 ? (
          <p className="text-center text-sm py-12" style={{ color: '#9CA3AF' }}>
            No sessions to show.
          </p>
        ) : (
          filteredEvents.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              isFavorited={favorites.has(event.id)}
              onToggleFavorite={toggleFavorite}
              onSelect={setSelectedEvent}
            />
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

      <Toast message="Requires internet connection" visible={toastVisible} />
    </>
  )
}
