'use client'
import type { PropsWithChildren } from 'react'
import cx from '~/utils/cx'

export default function ImageBanner(props: PropsWithChildren<{ className?: string }>) {
  return (
    <div
      className={cx('h-56 bg-cover bg-center rounded-xl dark:bg-[url(/images/default-dark.png)] bg-[url(/images/default.png)]', props.className)}
      suppressHydrationWarning
    >
      {props.children}
    </div>
  )
}
