import test from 'node:test'
import assert from 'node:assert/strict'
import { individualSessions, sessionsForView, conferenceCopy, eventsForDay, trackAgenda } from '../src/data/conference.js'
import { createContentSources, dayPlans } from '../src/data/content/index.js'
import { composeDay } from '../src/utils/today.js'
import { trip } from '../src/data/trip.js'

test('Mercantil individual sessions preserve Monday, field contract and second tab position', () => {
  assert.equal(individualSessions.length, 3)
  assert.equal(sessionsForView('individual'), individualSessions)
  assert.equal(conferenceCopy.views[1].value, 'individual')
  const sources = createContentSources(eventsForDay(null))
  const monday = composeDay('2026-09-14', dayPlans, sources, trip)
  assert.deepEqual(monday.agenda.map(e => e.content.id), [individualSessions[0].id])
  const tuesday = composeDay('2026-09-15', dayPlans, sources, trip)
  assert.equal(tuesday.agenda.filter(e => e.content.eventCategory === 'oneOnOne').length, 2)
  for (const event of individualSessions) {
    assert.equal(Object.keys(event).length,17)
    assert.equal(event.url,null)
    assert.equal(event.eventCategory,'oneOnOne')
    const favorites = trackAgenda.toggle(new Set(),event.id)
    assert.deepEqual(sessionsForView('mySchedule',favorites),[event])
    assert.equal(trackAgenda.toggle(favorites,event.id).size,0)
    assert.ok(!sessionsForView('all').some(e=>e.id===event.id))
  }
})

test('each client receives only its own individual sessions; Pottencial has none', async () => {
  for (const id of ['acerto', 'banco-inter', 'xp']) {
    const { client } = await import(`../src/data/clients/${id}/config.js`)
    const { individualSessions: source } = await import(`../src/data/clients/${id}/individualSessions.js`)
    const { events } = await import(`../src/data/clients/${id}/events.js`)
    const { createConferenceCollections } = await import('../src/utils/conferenceCollections.js')
    assert.equal(client.individualSessions, source)
    assert.equal(source.length, 3)
    assert.ok(!source.some(e => e.id === 'ind-tue-salesforce-personalization-with-mercantil'))
    const agenda = createConferenceCollections(events, source, client)
    for (const track of [null, ...(client.tracks?.map(t => t.id) ?? [])]) {
      for (const event of source) {
        assert.equal(event.transitionWarning, null)
        assert.equal(Object.keys(event).length, 17)
        assert.deepEqual(agenda.saved(agenda.toggle(new Set(),event.id), track), [event])
      }
      const dayEvents = [...agenda.forTrack(track), ...source]
      for (const event of source) {
        const day = composeDay(event.date, dayPlans, createContentSources(dayEvents), trip)
        assert.ok(day.agenda.some(item => item.content.id === event.id))
      }
    }
    if (id === 'banco-inter') {
      const sics = source.filter(e => e.type === 'SIC')
      const selected = new Set(sics.map(e => e.id))
      assert.equal(agenda.saved(selected,'business').length,2)
      assert.equal(agenda.saved(selected,'operations').length,2)
    }
    if (id === 'xp') {
      const benchmarks = source.filter(e => e.type === 'Benchmark')
      assert.equal(benchmarks.length,2)
      assert.ok(benchmarks.every(e => e.room === null && e.participants))
    }
  }
  const { client } = await import('../src/data/clients/pottencial/config.js')
  assert.equal(client.individualSessions,undefined)
})
