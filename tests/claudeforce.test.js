import test from 'node:test'
import assert from 'node:assert/strict'
import { claudeforceSessions } from '../src/data/claudeforce.js'
import { brazilSessions } from '../src/data/brazil.js'
import { createConferenceCollections } from '../src/utils/conferenceCollections.js'
import { sessionsForView } from '../src/data/conference.js'

test('Claudeforce is a shared live collection with valid fields and intentional repeat slots', () => {
  assert.equal(sessionsForView('claudeforce'), claudeforceSessions)
  assert.equal(claudeforceSessions.length, 19)
  assert.equal(new Set(claudeforceSessions.map(e => e.id)).size, 19)
  for (const e of claudeforceSessions) {
    assert.equal(Object.keys(e).length, 17)
    assert.ok(e.startTime < e.endTime)
    assert.equal(e.eventCategory, 'also')
    assert.ok(e.summary && e.room)
    assert.doesNotMatch(e.summary, /<script|onerror=|javascript:/i)
  }
  const repeat = claudeforceSessions.filter(e => e.title.includes('Chose Spiff'))
  assert.equal(repeat.length, 2)
  assert.notEqual(repeat[0].date, repeat[1].date)
})

for (const id of ['banco-mercantil', 'acerto', 'banco-inter', 'xp', 'pottencial']) {
  const { events } = await import(`../src/data/clients/${id}/events.js`)
  const { client } = await import(`../src/data/clients/${id}/config.js`)
  test(`${id}: shared stars deduplicate recommendations, preserve repeats and track choices`, () => {
    const agenda = createConferenceCollections(events, [...brazilSessions, ...claudeforceSessions], client)
    const main = claudeforceSessions.find(e => e.id === 'cf-tue-dreamforce-main-keynote-2026')
    const recommended = events.find(e => e.title === main.title)
    let favorites = agenda.toggle(new Set(), main.id)
    assert.equal(agenda.favoriteId(main.id), agenda.favoriteId(recommended.id))
    for (const track of client.tracks?.map(t => t.id) ?? [null]) {
      assert.equal(agenda.saved(favorites, track).length, 1)
      assert.equal(agenda.saved(favorites, track)[0].title, main.title)
      if (track) assert.equal(agenda.saved(favorites, track)[0].topic, client.tracks.find(t => t.id === track).label)
    }
    favorites = agenda.toggle(favorites, recommended.id)
    assert.equal(favorites.size, 0)
    for (const e of claudeforceSessions.filter(e => e.title.includes('Chose Spiff'))) favorites = agenda.toggle(favorites, e.id)
    assert.equal(agenda.saved(favorites).length, 2)
    // Every shared session can be saved even before an Inter track is chosen.
    for (const event of claudeforceSessions) {
      const saved = agenda.saved(agenda.toggle(new Set(), event.id))
      assert.equal(saved.length, 1)
      assert.equal(saved[0].date, event.date)
      assert.equal(saved[0].startTime, event.startTime)
    }
    if (id === 'pottencial') {
      const saved = agenda.saved(new Set(['br-wed-how-ifood-built-an-ai']))
      assert.equal(saved.length, 1)
      assert.equal(saved[0].id, 'wed-how-ifood-built-an-ai')
    }
  })
}
