'use client'
import type { MouseEvent } from 'react'
import useClient from '~/hooks/useClient'
import useDark from '~/hooks/useDark'

export default function DarkModeSwitcher() {
  const isClient = useClient()
  const [dark, setDark] = useDark()

  function darkModeToggle(event: MouseEvent) {
    const isAppearanceTransition = !!document.startViewTransition
      && !window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (!isAppearanceTransition)
      setDark(!dark)

    const x = event.clientX
    const y = event.clientY
    const endRadius = Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y),
    )

    const transition = document.startViewTransition(() => {
      setDark(!dark)
    })

    transition.ready
      .then(() => {
        const clipPath = [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${endRadius}px at ${x}px ${y}px)`,
        ]
        document.documentElement.animate(
          {
            clipPath: dark
              ? clipPath.reverse()
              : clipPath,
          },
          {
            duration: 400,
            easing: 'ease-out',
            pseudoElement: dark
              ? '::view-transition-old(root)'
              : '::view-transition-new(root)',
          },
        )
      })
  }

  const src = isClient ? dark ? '/icons/sun.svg' : '/icons/moon.svg' : ''
  return (
    <img
      suppressHydrationWarning
      width={18}
      src={src}
      onClick={darkModeToggle}
    />
  )
}
