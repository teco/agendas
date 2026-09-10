import { individualSessions } from './individualSessions.js';

export const client = {
  individualSessions,
  id: 'xp',
  name: 'XP',
  agendaTitle: 'XP @ Dreamforce 2026',
  logo: '/icons/xp-header-v1.png',
  appIcons: { small: '/icons/xp-df192-v1.png', large: '/icons/xp-df512-v1.png' },
  heroImage: null,
  whatsappNumber: '5511934079641',
  teamContacts: [{ name: 'Terence Reis', phone: '5511934079641' }, { name: 'Fabiana Maniero', phone: '5511930227247' }, { name: 'Léo Boaventura', phone: '5511989214117' }],
  favoritesKey: 'df26-xp-favorites',
  sundayPreferenceKey: 'df26-xp-sunday-preference',
  sundayDinner: false,
};
