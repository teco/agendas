import { claudeforceHome as copy } from '../data/claudeforceHome.js'

export default function ClaudeforceHome({ onOpen }) {
  return <footer className="claudeforce-home" aria-labelledby="claudeforce-title">
    <h2 id="claudeforce-title">{copy.title}</h2>
    <p className="claudeforce-booth">{copy.booth}</p>
    <div className="claudeforce-panels">
      <div><h3>{copy.labs}</h3><p>{copy.location}</p></div>
      <div><h3>{copy.experience}</h3></div>
    </div>
    <a className="claudeforce-link" href="#/dreamforce" onClick={onOpen}>{copy.action} <span aria-hidden="true">→</span></a>
  </footer>
}
