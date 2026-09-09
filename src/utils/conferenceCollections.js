import { createTrackAgenda } from './tracks.js'

// Catalog widgets can differ while the session and its scheduled occurrence are identical.
function occurrenceKey(event) {
  const session = event.url?.match(/\/session\/([^/?#]+)/)?.[1]
  return session ? JSON.stringify([session, event.date, event.startTime, event.endTime]) : null
}

export function createConferenceCollections(events, shared, client) {
  const aliases = { ...client.favoriteAliases }
  const occurrences = new Map()
  for (const event of [...events, ...shared]) {
    const key = occurrenceKey(event)
    if (!key) continue
    if (occurrences.has(key)) aliases[event.id] = occurrences.get(key)
    else occurrences.set(key, aliases[event.id] ?? event.id)
  }
  const agenda = createTrackAgenda(events, client.tracks, aliases)
  return {
    ...agenda,
    saved(favorites, track) {
      const normalized = agenda.normalizeFavorites(favorites)
      const result = agenda.saved(normalized, track)
      const seen = new Set(result.map(event => agenda.favoriteId(event.id)))
      for (const event of shared) {
        const id = agenda.favoriteId(event.id)
        if (normalized.has(id) && !seen.has(id)) { result.push(event); seen.add(id) }
      }
      return result
    },
  }
}
