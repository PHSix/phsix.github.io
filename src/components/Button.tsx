'use client'
import type { PropsWithChildren } from 'react'
import cx from '~/utils/cx'

export default function Button(
  props: PropsWithChildren<{
    primary?: boolean
    class?: string
    onClick?: VoidFunction
  }>,
) {
  return (
    <button
      className={cx(
        !props.primary ? 'bg-white text-stone-800' : 'bg-blue-500 text-white',
        'px-3 py-1 rounded-md',
        props.class,
      )}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  )
}
