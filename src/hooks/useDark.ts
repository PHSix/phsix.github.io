import type { Signal } from '@preact/signals-react'
import { signal, useSignalEffect } from '@preact/signals-react'

function getDark() {
  try {
    const dark = localStorage.getItem('useDark') === 'true'

    return dark
  } catch {
    return false
  }
}

const dark = signal(getDark())

export default function useDark(): Signal<boolean> {
  useSignalEffect(() => {
    if (dark.value) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('useDark', 'true')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('useDark', 'false')
    }
  })

  return dark
}
