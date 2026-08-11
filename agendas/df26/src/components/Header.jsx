import { agendaTitle, instructions, heroImage } from '../config.js'
import salesforceLogo from '../assets/salesforce-logo.svg'

export default function Header() {
  return (
    <header className="w-full bg-white border-b-2" style={{ borderColor: '#032D60' }}>
      <div className="px-4 py-3 space-y-3">

        {/* Row 1 — Salesforce logo only; right side intentionally empty */}
        <div className="flex items-center justify-between">
          <img src={salesforceLogo} alt="Salesforce" className="h-7 w-auto" />
          <div />
        </div>

        {/* Row 2 — Agenda title */}
        <p className="text-center font-bold text-lg" style={{ color: '#032D60' }}>
          {agendaTitle}
        </p>

        {/* Row 3 — Instructions */}
        <p className="text-sm" style={{ color: '#6B7280' }}>
          {instructions}
        </p>

      </div>

      {/* Row 5 — Hero image */}
      {heroImage ? (
        <img
          src={heroImage}
          alt="Dreamforce 2026"
          className="w-full object-cover"
          style={{ height: 120 }}
        />
      ) : (
        <div
          className="w-full flex items-center justify-center"
          style={{ height: 120, background: '#E5E7EB' }}
        >
          <span style={{ fontSize: 12, color: '#9CA3AF' }}>Dreamforce 2026</span>
        </div>
      )}
    </header>
  )
}
