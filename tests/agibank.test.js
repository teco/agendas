import test from 'node:test'
import assert from 'node:assert/strict'
import { client } from '../src/data/clients/agibank/config.js'
import { events } from '../src/data/clients/agibank/events.js'
import { createConferenceData } from '../src/data/conference.js'
import { applyClientDayPlans } from '../src/utils/clientPlans.js'
import { createSundayDinnerPolicy } from '../src/data/sundayDinner.js'
import { dayPlans, createContentSources } from '../src/data/content/index.js'
import { composeDay } from '../src/utils/today.js'
import { trip } from '../src/data/trip.js'
import { toUtcComponents } from '../src/utils/calendar.js'

const data = createConferenceData(events, client)
test('Agibank has three tracks and seven correctly ordered collections', () => {
  assert.deepEqual(data.conferenceCopy.views.map(v => v.label), ['Recommended Sessions','Agibank @ Dreamforce','Innovation Tour','Brazil Sessions','Claudeforce Sessions','Recorded Sessions','★ My Schedule'])
  assert.equal(data.sessionsForView('all').length,0)
  for (const [id,name,count] of [['lucas-akira','Business Track',14],['matheus-girardi','Executive Track',15],['fabio-zani','Tech Track',17]]) {
    const recommended=data.sessionsForView('all',new Set(),id)
    assert.equal(recommended.length,count)
    assert.ok(recommended.every(e=>e.topic===name))
    assert.equal(data.sessionsForView('individual',new Set(),id).length,13)
    assert.equal(data.sessionsForView('innovation',new Set(),id).length,11)
  }
  assert.equal(client.homeIndividualCard,true)
  assert.equal(client.trackPreferenceKey,'df26-agibank-person')
  assert.deepEqual(client.teamContacts,[])
  assert.equal(client.whatsappNumber,null)
})

test('Agibank stars share repeated-person occurrences and retain saved meetings/tour across switches', () => {
  const mains=events.filter(e=>e.title==='Dreamforce Main Keynote 2026')
  assert.equal(mains.length,3)
  const cf=data.sessionsForView('claudeforce').find(e=>e.title===mains[0].title)
  assert.ok(mains.every(e=>data.trackAgenda.favoriteId(e.id)===data.trackAgenda.favoriteId(cf.id)))
  let favorites=data.trackAgenda.toggle(new Set(),cf.id)
  const meeting=client.individualSessions.find(e=>e.id==='ind-wed-salesforce-broadcast-agibank-and-agentforce')
  const transfer=client.innovationTour.at(-1)
  favorites=data.trackAgenda.toggle(favorites,meeting.id)
  favorites=data.trackAgenda.toggle(favorites,transfer.id)
  for(const track of client.tracks) {
    const saved=data.sessionsForView('mySchedule',favorites,track.id)
    assert.equal(saved.length,3)
    assert.equal(saved.find(e=>e.title===mains[0].title).topic,track.label)
    assert.ok(saved.includes(meeting));assert.ok(saved.includes(transfer))
  }
  favorites=data.trackAgenda.toggle(favorites,mains[1].id)
  assert.equal(favorites.size,2)
})

test('Agibank Monday replaces the generic guide, retains both parties, and avoids duplicate reception on Home', () => {
  const plans=applyClientDayPlans(createSundayDinnerPolicy(client).dayPlans(dayPlans),client)
  const sources=createContentSources(data.eventsForDay(null))
  const monday=composeDay('2026-09-14',plans,sources,trip)
  assert.equal(monday.primary.length,0)
  assert.equal(monday.agenda.length,13)
  assert.ok(monday.agenda.some(e=>e.content.id==='it-departure-to-sfo'))
  assert.ok(monday.agenda.some(e=>e.content.id==='ind-mon-successfest'))
  assert.ok(monday.agenda.some(e=>e.content.id==='ind-mon-platform-security-latam-happy-hour'))
  const tuesday=composeDay('2026-09-15',plans,sources,trip)
  assert.equal(tuesday.agenda.filter(e=>e.content.id==='ind-tue-latin-america-welcome-reception').length,1)
  assert.equal(tuesday.evening.length,0)
  assert.equal(composeDay('2026-09-13',plans,sources,trip).evening.length,0)
  assert.equal(applyClientDayPlans(dayPlans,{}).find(d=>d.date==='2026-09-14').primary[0].id,'monday')
})

test('Agibank confirmed end times remain usable for calendar export without editorial notes', () => {
  for (const [id,end] of [['ind-thu-sic-observabilidade-e-inteligencia-de','16:55'],['ind-mon-platform-security-latam-happy-hour','23:00'],['it-departure-to-sfo','18:10']]) {
    const e=data.liveSessions.find(e=>e.id===id)
    assert.equal(e.endTime,end)
    assert.ok(toUtcComponents(e.date,e.endTime).iso)
    assert.doesNotMatch(e.summary??'',/assumed|source gives/i)
  }
  for(const e of [...client.individualSessions,...client.innovationTour]) {
    assert.equal(Object.keys(e).length,17)
    assert.equal(e.transitionWarning,null)
    assert.doesNotMatch(e.summary??'',/Title corrected|End time assumed/i)
  }
})


test('Agibank moved meetings retain saved identity and the removed Charly meeting disappears', () => {
  const movedId = 'ind-wed-meeting-with-charly-and-franchi'
  const removedId = 'ind-wed-meeting-with-charly'
  const moved = client.individualSessions.find(e => e.id === movedId)
  assert.equal(moved.date, '2026-09-17')
  assert.equal(moved.startTime, '11:15')
  assert.equal(moved.endTime, '12:00')
  assert.equal(toUtcComponents(moved.date,moved.startTime).iso,'2026-09-17T18:15:00Z')
  const analyst = client.individualSessions.find(e => e.id === 'ind-wed-industry-analyst-1-1s')
  assert.equal(analyst.startTime,'13:30')
  assert.equal(analyst.endTime,'14:00')
  for (const track of [null, ...client.tracks.map(t => t.id)]) {
    const saved = data.sessionsForView('mySchedule',new Set([movedId,removedId]),track)
    assert.deepEqual(saved,[moved])
    const sources = createContentSources(data.eventsForDay(track))
    const wed = composeDay('2026-09-16',dayPlans,sources,trip)
    const thu = composeDay('2026-09-17',dayPlans,sources,trip)
    assert.ok(!wed.agenda.some(e => [movedId,removedId].includes(e.content.id)))
    assert.equal(thu.agenda.filter(e => e.content.id === movedId).length,1)
  }
})
