'use client'
import type { PropsWithChildren } from 'react'
import useDark from '~/hooks/useDark'
import cx from '~/utils/cx'

export default function ImageBanner(props: PropsWithChildren<{ className?: string }>) {
  const dark = useDark()
  return (
    <div
      className={cx('h-56 bg-cover bg-center rounded-xl', props.className)}
      style={{
        backgroundImage: dark.value ? 'url(/images/default-dark.png)' : 'url(/images/default.png)',
      }}
    >
      {props.children}
    </div>
  )
}
