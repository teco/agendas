import test from 'node:test'
import assert from 'node:assert/strict'
import { client } from '../src/data/clients/banco-inter/config.js'
import { events } from '../src/data/clients/banco-inter/events.js'
import { createConferenceData } from '../src/data/conference.js'
import { dayPlans, createContentSources } from '../src/data/content/index.js'
import { composeDay } from '../src/utils/today.js'
import { trip } from '../src/data/trip.js'

const data = createConferenceData(events, client)
test('Inter lunch is a start-only session visible once on Monday and saved across both tracks', async () => {
  const lunch = client.individualSessions.find(e => e.id === 'ind-mon-lunch-johns-grill')
  assert.equal(lunch.date, '2026-09-14')
  assert.equal(lunch.startTime, '12:00')
  assert.equal(lunch.endTime, null)
  assert.equal(lunch.type, 'Lunch')
  assert.equal(lunch.eventCategory, 'social')
  assert.match(lunch.room, /63 Ellis St/)
  assert.equal(client.sharedPlans, undefined)
  for (const track of [null, 'business', 'operations']) {
    assert.ok(data.sessionsForView('individual',new Set(),track).includes(lunch))
    const favorites = data.trackAgenda.toggle(new Set(),lunch.id)
    assert.deepEqual(data.sessionsForView('mySchedule',favorites,track),[lunch])
    const monday = composeDay(lunch.date,dayPlans,createContentSources(data.eventsForDay(track)),trip)
    assert.equal(monday.agenda.filter(item=>item.content.id===lunch.id).length,1)
  }
  for (const id of ['agibank','acerto','banco-mercantil','xp','pottencial']) {
    const {client:other}=await import(`../src/data/clients/${id}/config.js`)
    assert.ok(!other.individualSessions?.some(e=>e.id===lunch.id))
  }
})

test('client session section names and badges use the requested labels in second position', async () => {
  for(const [id,label] of [['banco-inter','Inter'],['banco-mercantil','Mercantil'],['acerto','Acerto'],['xp','XP'],['agibank','Agibank']]) {
    const {client:other}=await import(`../src/data/clients/${id}/config.js`)
    const copy=createConferenceData([],other).conferenceCopy
    assert.deepEqual(copy.views[1],{value:'individual',label:`${label} @ Dreamforce`})
    assert.equal(copy.individualLabel,`${label} @ Dreamforce`)
  }
})
