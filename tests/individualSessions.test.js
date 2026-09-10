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

test('Mercantil private sessions are not attached to any other client', async () => {
  for (const id of ['acerto','banco-inter','xp','pottencial']) {
    const {client} = await import(`../src/data/clients/${id}/config.js`)
    assert.equal(client.individualSessions,undefined)
  }
})
