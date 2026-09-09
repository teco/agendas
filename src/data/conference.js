import { events } from './events.js';
import { client } from '#client-config';
import { createConferenceCollections } from '../utils/conferenceCollections.js';
import { brazilSessions } from './brazil.js';
import { claudeforceSessions } from './claudeforce.js';
export const trackAgenda = createConferenceCollections(events, [...brazilSessions, ...claudeforceSessions], client);
export const conferenceCopy = {
  views: [
    { value: 'all', label: 'Recommended Sessions' },
    { value: 'brazil', label: 'Brazil Sessions' },
    { value: 'claudeforce', label: 'Claudeforce Sessions' },
    { value: 'recorded', label: 'Recorded Sessions' },
    { value: 'mySchedule', label: '★ My Schedule' },
  ],
  recordedIntroduction: 'Sessions listed here will be available at',
  recordedService: 'Salesforce+',
  recordedUrl: 'https://www.salesforce.com/plus',
  sessionDetails: 'Session details',
  audience: 'Audience',
  company: 'Company',
  empty: 'No sessions to show.',
  emptySchedule: 'Star a live session to add it to My Schedule.',
};
// Stable source IDs remain intact. Repeated catalog sessions at different times are distinct live choices.
export const liveSessions = [...events, ...brazilSessions, ...claudeforceSessions];
export function sessionsForView(view, favorites = new Set(), track = null) {
  if (view === 'brazil') return brazilSessions;
  if (view === 'claudeforce') return claudeforceSessions;
  if (view === 'mySchedule') return trackAgenda.saved(favorites, track);
  return trackAgenda.forTrack(track);
}
