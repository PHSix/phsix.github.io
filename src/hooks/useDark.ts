'use client'
import { useEffect, useState } from 'react'

function getFromSession(): boolean | null {
  const item = sessionStorage.getItem('--is-dark')
  if (!item)
    return null
  try {
    const val = Boolean(item)
    return val
  } catch {
    return null
  }
}

export default function useDark(): [boolean, (value: boolean) => void] {
  const [dark, _setDark] = useState(() => typeof window === 'undefined' ? false : (getFromSession() ?? window.matchMedia('(prefers-color-scheme: dark)').matches))
  function setDark(val: boolean) {
    _setDark(val)
    sessionStorage.setItem('--is-dark', `${val}`)
    if (val)
      document.documentElement.classList.add('dark')
    else
      document.documentElement.classList.remove('dark')
  }

  useEffect(() => {
    setDark(dark)
  }, [])

  return [dark, setDark]
}
