'use client'
import { useEffect, useState } from 'react'

export default function useDark(): [boolean, (value: boolean) => void] {
  const [dark, _setDark] = useState(() => typeof window === 'undefined' ? false : window.matchMedia('(prefers-color-scheme: dark)').matches)
  function setDark(val: boolean) {
    _setDark(val)
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
