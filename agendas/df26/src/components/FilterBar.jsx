const FILTERS = [
  { value: 'all',               label: 'All' },
  { value: 'unified-data',      label: 'Unified Data' },
  { value: 'agentforce-mktg',  label: 'Agentforce Mktg' },
  { value: 'ai-journeys',      label: 'AI Journeys' },
  { value: 'media-attribution', label: 'Media & Attribution' },
  { value: 'efficiency',        label: 'Efficiency' },
  { value: 'interested',        label: '★ Interested' },
]

export default function FilterBar({ activeFilter, onFilterChange }) {
  return (
    <nav
      className="w-full bg-white border-b border-gray-200"
      style={{ overflowX: 'auto', whiteSpace: 'nowrap' }}
    >
      <div className="flex">
        {FILTERS.map((f) => {
          const active = f.value === activeFilter
          return (
            <button
              key={f.value}
              type="button"
              onClick={() => onFilterChange(f.value)}
              className="px-4 text-sm font-medium"
              style={{
                minHeight: 44,
                color: active ? '#032D60' : '#6B7280',
                borderBottom: active ? '2px solid #032D60' : '2px solid transparent',
                background: 'transparent',
                cursor: 'pointer',
              }}
            >
              {f.label}
            </button>
          )
        })}
      </div>
    </nav>
  )
}
