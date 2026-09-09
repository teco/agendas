import test from 'node:test'
import assert from 'node:assert/strict'
import { client as xp } from '../src/data/clients/xp/config.js'
import { client as mercantil } from '../src/data/clients/banco-mercantil/config.js'
import { events } from '../src/data/clients/xp/events.js'
import { events as baseline } from '../src/data/clients/banco-mercantil/events.js'
import { brazilSessions } from '../src/data/brazil.js'
import { createContentSources, dayPlans, routes, sharedPlans } from '../src/data/content/index.js'
import { routeMaps } from '../src/data/routeMaps.js'
import { createSundayDinnerPolicy } from '../src/data/sundayDinner.js'
import { composeDay } from '../src/utils/today.js'
import { trip } from '../src/data/trip.js'
import { readPreference } from '../src/utils/preference.js'

test('XP uses its 24 complete source records as a single agenda with distinct repeat occurrences', () => {
  assert.equal(events.length, 24)
  assert.equal(new Set([...events, ...brazilSessions].map(event => event.id)).size, 32)
  assert.equal(xp.tracks, undefined)
  assert.deepEqual(xp.teamContacts, mercantil.teamContacts)
  assert.equal(xp.whatsappNumber, mercantil.whatsappNumber)
  for (const key of ['favoritesKey', 'sundayPreferenceKey', 'logo']) assert.notEqual(xp[key], mercantil[key])
  for (const event of events) {
    assert.deepEqual(Object.keys(event).sort(), Object.keys(baseline[0]).sort())
    assert.equal(event.topic, null)
    assert.equal(event.area, null)
    assert.ok(event.startTime < event.endTime)
  }
  for (const [date, count] of [['2026-09-15', 7], ['2026-09-16', 9], ['2026-09-17', 8]])
    assert.equal(composeDay(date, dayPlans, createContentSources(events), trip).agenda.length, count)
  let overlaps = 0
  for (let i = 0; i < events.length; i++) for (const other of events.slice(i + 1)) {
    const event = events[i]
    if (event.date === other.date && event.startTime < other.endTime && other.startTime < event.endTime) {
      overlaps++
      assert.ok(event.transitionWarning && other.transitionWarning)
    }
  }
  assert.equal(overlaps, 6)
})

test('XP removes Sunday dinner across plans, routes and maps without altering the other clients', () => {
  const original = JSON.stringify({ dayPlans, routes, sharedPlans, routeMaps })
  const policy = createSundayDinnerPolicy(xp)
  assert.equal(policy.enabled, false)
  const plans = policy.sharedPlans(sharedPlans)
  const days = policy.dayPlans(dayPlans)
  const adaptedRoutes = policy.routes(routes)
  const maps = policy.routeMaps(routeMaps)
  const sources = { ...createContentSources(events), sharedPlan: plans, route: adaptedRoutes }
  assert.equal(composeDay('2026-09-13', days, sources, trip).evening.length, 0)
  for (const date of ['2026-09-15', '2026-09-16', '2026-09-17'])
    assert.equal(composeDay(date, days, sources, trip).evening.length, 1)
  assert.ok(!JSON.stringify([policy.introduction, days[1], adaptedRoutes, maps]).match(/dinner|epic/i))
  assert.deepEqual(plans.map(p => p.id), ['tuesday-evening', 'dreamfest', 'thursday-dinner'])
  assert.deepEqual(adaptedRoutes.map(r => r.id), routes.map(r => r.id))
  for (let i = 0; i < routes.length; i++) assert.equal(adaptedRoutes[i].stops, routes[i].stops)
  assert.equal(adaptedRoutes[1].departureTime, '13:30')
  assert.equal(adaptedRoutes[1].arrivalTime, '15:00')
  for (const leg of maps.legs) assert.ok(maps.anchors[leg.origin] && maps.anchors[leg.destination])
  assert.equal(maps.legs.filter(leg => leg.routeId === 'sunday-classic').at(-1).destination, 'bridge')
  assert.equal(maps.legs.filter(leg => leg.routeId === 'sunday-both').at(-1).destination, 'oracle')
  assert.equal(JSON.stringify({ dayPlans, routes, sharedPlans, routeMaps }), original)
  const existing = createSundayDinnerPolicy(mercantil)
  assert.equal(existing.enabled, true)
  assert.equal(existing.routes(routes), routes)
  assert.equal(existing.sharedPlans(sharedPlans), sharedPlans)
  assert.equal(existing.dayPlans(dayPlans), dayPlans)
  assert.equal(existing.routeMaps(routeMaps), routeMaps)
  assert.equal(readPreference({ getItem: () => 'dinner-only' }, xp.sundayPreferenceKey, ['classic', 'giants', 'both']), null)
})
