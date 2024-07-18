'use client'
import { useEffect, useState } from 'react'
//
// const KEY = '--site-theme'
//
// function getDark() {
//   try {
//     const item = localStorage.getItem(KEY)
//     if (!item)
//       throw new Error(`can not get ${KEY} in localStorage`)
//
//     const dark = JSON.parse(item).value
//
//     return dark
//   } catch {
//     return false
//   }
// }

// function sync(value: boolean) {
//   localStorage.setItem(KEY, JSON.stringify({ value }))
// }

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
