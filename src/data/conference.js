import { events } from './events.js';
import { client } from '#client-config';
import { createConferenceCollections } from '../utils/conferenceCollections.js';
import { brazilSessions } from './brazil.js';
import { claudeforceSessions } from './claudeforce.js';

export function createConferenceData(events, client) {
  const individualSessions = client.individualSessions ?? [];
  const innovationTour = client.innovationTour ?? [];
  const shared = [...brazilSessions, ...claudeforceSessions, ...individualSessions, ...innovationTour];
  const trackAgenda = createConferenceCollections(events, shared, client);
  const conferenceCopy = {
    views: [
      { value: 'all', label: 'Recommended Sessions' },
      ...(individualSessions.length ? [{ value: 'individual', label: client.individualSessionsLabel ?? 'Individual Sessions' }] : []),
      ...(innovationTour.length ? [{ value: 'innovation', label: 'Innovation Tour' }] : []),
      { value: 'brazil', label: 'Brazil Sessions' },
      { value: 'claudeforce', label: 'Claudeforce Sessions' },
      { value: 'recorded', label: 'Recorded Sessions' },
      { value: 'mySchedule', label: '★ My Schedule' },
    ],
    individualLabel: client.individualSessionsLabel ?? 'Individual session',
    innovationLabel: 'Innovation Tour', topicLabel: client.topicLabel ?? 'Topic',
    recordedIntroduction: 'Sessions listed here will be available at',
    recordedService: 'Salesforce+', recordedUrl: 'https://www.salesforce.com/plus',
    sessionDetails: 'Session details', audience: 'Audience', company: 'Company',
    empty: 'No sessions to show.', emptySchedule: 'Star a live session to add it to My Schedule.',
  };
  return {
    individualSessions, innovationTour, trackAgenda, conferenceCopy,
    liveSessions: [...events, ...shared],
    eventsForDay: track => [...trackAgenda.forTrack(track), ...individualSessions, ...innovationTour],
    sessionsForView(view, favorites = new Set(), track = null) {
      if (view === 'individual') return individualSessions;
      if (view === 'innovation') return innovationTour;
      if (view === 'brazil') return brazilSessions;
      if (view === 'claudeforce') return claudeforceSessions;
      if (view === 'mySchedule') return trackAgenda.saved(favorites, track);
      return trackAgenda.forTrack(track);
    },
  };
}
export const { individualSessions, innovationTour, trackAgenda, conferenceCopy, liveSessions, eventsForDay, sessionsForView } = createConferenceData(events, client);
