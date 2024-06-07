'use client'
import type { PropsWithChildren } from 'react'
import useClient from '~/hooks/useClient'
import useDark from '~/hooks/useDark'
import cx from '~/utils/cx'

export default function ImageBanner(props: PropsWithChildren<{ className?: string }>) {
  const [dark] = useDark()
  const isClient = useClient()
  const backgroundImage = isClient ? (dark ? 'url(/images/default-dark.png)' : 'url(/images/default.png)') : undefined

  return (
    <div
      className={cx('h-56 bg-cover bg-center rounded-xl', props.className)}
      style={{
        backgroundImage,
      }}
      suppressHydrationWarning
    >
      {props.children}
    </div>
  )
}
