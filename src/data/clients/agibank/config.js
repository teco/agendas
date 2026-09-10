import { individualSessions } from './individualSessions.js';
import { innovationTour } from './innovationTour.js';
export const client = {
  id: 'agibank', name: 'Agibank', agendaTitle: 'Agibank @ Dreamforce 2026',
  logo: '/icons/agibank-header-v1.png',
  appIcons: { small: '/icons/agibank-df192-v1.png', large: '/icons/agibank-df512-v1.png' },
  heroImage: null, whatsappNumber: null, teamContacts: [],
  favoritesKey: 'df26-agibank-favorites', sundayPreferenceKey: 'df26-agibank-sunday-preference',
  homeIndividualCard: true,
  trackPreferenceKey: 'df26-agibank-person',
  tracks: [
    { id: 'lucas-akira', label: 'Business Track' },
    { id: 'matheus-girardi', label: 'Executive Track' },
    { id: 'fabio-zani', label: 'Tech Track' },
  ],
  trackCopy: {
    choose: 'Which track would you like to follow?', selected: 'Your Dreamforce agenda',
    introduction: 'Choose your track. You can switch at any time.',
    reminder: 'Switching tracks keeps your saved sessions.',
    pending: 'Choose your track to see your recommended sessions.',
    schedule: 'Your saved sessions appear here.',
  },
  topicLabel: 'Track',
  individualSessions, individualSessionsLabel: 'Agibank @ Dreamforce',
  innovationTour, sundayDinner: false,
  sharedPlanEventAliases: { 'tuesday-evening': 'ind-tue-latin-america-welcome-reception' },
};
