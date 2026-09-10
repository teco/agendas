import { client } from '../config.js'
import salesforceLogo from '../assets/salesforce-logo.svg'

export default function BrandLogos() {
  return (
    <div className="conference-brands">
      <img src={salesforceLogo} alt="Salesforce" />
      <span className={`conference-client-brand${client.logoWide ? ' conference-client-brand-wide' : ''}`}>
        {client.logo ? <img src={client.logo} alt={client.name} /> : <span>{client.name}</span>}
      </span>
    </div>
  )
}
