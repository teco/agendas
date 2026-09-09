import test from 'node:test'
import assert from 'node:assert/strict'
import { client } from '../src/data/clients/pottencial/config.js'
import { client as xp } from '../src/data/clients/xp/config.js'
import { events } from '../src/data/clients/pottencial/events.js'
import { events as baseline } from '../src/data/clients/xp/events.js'
import { brazilSessions } from '../src/data/brazil.js'
import { createContentSources, dayPlans, routes, sharedPlans } from '../src/data/content/index.js'
import { createSundayDinnerPolicy } from '../src/data/sundayDinner.js'
import { createTrackAgenda } from '../src/utils/tracks.js'
import { composeDay } from '../src/utils/today.js'
import { trip } from '../src/data/trip.js'

test('Pottencial has a complete independent agenda and no Sunday dinner', () => {
  assert.equal(events.length, 21)
  assert.equal(new Set([...events, ...brazilSessions].map(e => e.id)).size, 29)
  assert.equal(client.tracks, undefined)
  assert.deepEqual(client.teamContacts, xp.teamContacts)
  assert.equal(client.whatsappNumber, xp.whatsappNumber)
  for (const key of ['favoritesKey', 'sundayPreferenceKey', 'logo']) assert.notEqual(client[key], xp[key])
  const policy = createSundayDinnerPolicy(client)
  assert.equal(policy.enabled, false)
  const sources = { ...createContentSources(events), sharedPlan: policy.sharedPlans(sharedPlans) }
  const days = policy.dayPlans(dayPlans)
  assert.equal(composeDay('2026-09-13', days, sources, trip).evening.length, 0)
  assert.ok(!JSON.stringify(policy.routes(routes)).match(/dinner|epic/i))
  for (const [date, count] of [['2026-09-15', 6], ['2026-09-16', 8], ['2026-09-17', 7]]) {
    const day = composeDay(date, days, sources, trip)
    assert.equal(day.agenda.length, count)
    assert.equal(day.evening.length, 1)
  }
  for (const event of events) {
    assert.deepEqual(Object.keys(event).sort(), Object.keys(baseline[0]).sort())
    assert.equal(event.area, null)
    assert.equal(event.topic, null)
    assert.ok(event.startTime < event.endTime)
  }
})

test('Pottencial iFood stars share one occurrence across Recommended and Brazil, preserving warnings and repeats', () => {
  const agenda = createTrackAgenda(events, client.tracks, client.favoriteAliases)
  const recommended = events.find(e => e.id === 'wed-how-ifood-built-an-ai')
  const brazil = brazilSessions.find(e => e.id === 'br-wed-how-ifood-built-an-ai')
  for (const field of ['title', 'date', 'startTime', 'endTime', 'room']) assert.equal(recommended[field], brazil[field])
  assert.equal(recommended.url.split('/session/')[1], brazil.url.split('/session/')[1])
  assert.equal(agenda.favoriteId(brazil.id), recommended.id)
  const selected = agenda.toggle(new Set(), brazil.id)
  assert.deepEqual([...selected], [recommended.id])
  assert.deepEqual(agenda.saved(selected), [recommended])
  assert.ok(agenda.saved(selected)[0].transitionWarning)
  assert.deepEqual(agenda.saved(new Set([recommended.id, brazil.id])), [recommended])
  assert.equal(agenda.toggle(selected, recommended.id).size, 0)
  assert.equal(agenda.toggle(selected, brazil.id).size, 0)
  const repeat = events.filter(e => e.title === 'Roadmap Session: Agentforce Innovations for Insurance')
  assert.equal(agenda.saved(new Set(repeat.map(e => e.id))).length, 2)
  assert.equal(agenda.forTrack(null), events)
})
