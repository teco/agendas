import { agendaTitle, instructions, teamContacts, heroImage } from '../config.js'
import BrandLogos from './BrandLogos.jsx'
export default function Header() {
  return <header className="conference-header">
    <BrandLogos />
    <h1>{agendaTitle}</h1><p>{instructions}</p>
    {teamContacts.length > 0 && <div className="conference-contacts">{teamContacts.map(contact => <a key={contact.phone} href={`https://wa.me/${contact.phone}?text=${encodeURIComponent(`Oi ${contact.name.split(' ')[0]}!`)}`} target="_blank" rel="noreferrer">{contact.name}</a>)}</div>}
    {heroImage && <img className="conference-hero" src={heroImage} alt="Dreamforce 2026" />}
  </header>
}
