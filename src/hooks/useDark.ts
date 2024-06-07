'use client'
import { effect, signal } from '@preact/signals-react'
import { useEffect, useState } from 'react'

const KEY = '--site-theme'

function getDark() {
  try {
    const item = localStorage.getItem(KEY)
    if (!item)
      throw new Error(`can not get ${KEY} in localStorage`)

    const dark = JSON.parse(item).value

    return dark
  } catch {
    return false
  }
}

function sync(value: boolean) {
  localStorage.setItem(KEY, JSON.stringify({ value }))
}

const darkSignal = signal(getDark())

export default function useDark(): [boolean, (value: boolean) => void] {
  const [dark, _setDark] = useState(getDark)
  function setDark(val: boolean) {
    _setDark(val)
    darkSignal.value = val
    sync(val)
    if (val)
      document.documentElement.classList.add('dark')
    else
      document.documentElement.classList.remove('dark')
  }

  useEffect(() => {
    const disposable = effect(() => {
      setDark(darkSignal.value)
    })

    return () => disposable()
  }, [])

  return [dark, setDark]
}
