import { useEffect, useState } from 'react'

const STORAGE_KEY = 'df26-favorites'

function readInitial() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return new Set()
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return new Set()
    return new Set(parsed)
  } catch {
    return new Set()
  }
}

export function useFavorites() {
  const [favorites, setFavorites] = useState(readInitial)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(favorites)))
    } catch {
      // ignore quota / private-mode errors
    }
  }, [favorites])

  function toggleFavorite(id) {
    setFavorites((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return [favorites, toggleFavorite]
}
