'use client'
import type { Signal } from '@preact/signals-react'
import { useSignalEffect } from '@preact/signals-react'
import type { PropsWithChildren } from 'react'
import { useState } from 'react'
import cx from '~/utils/cx'

export function Modal(
  props: PropsWithChildren<{
    visible: Signal<boolean>
    onClose?: VoidFunction
    className?: string
  }>,
) {
  const [delayVisible, setDelayVisible] = useState(() => props.visible.value)

  useSignalEffect(() => {
    const visible = props.visible.value
    setTimeout(() => {
      setDelayVisible(visible)
    }, 200)
  })

  if (delayVisible || props.visible.value) {
    return (
      <>
        <div
          className="fixed top-0 left-0 h-screen w-screen bg-stone-700/60 backdrop-blur-sm"
          onClick={props.onClose}
        />
        <div className="fixed top-[40%] left-[50%]">
          <div
            className={cx(
              'translate-x-[-50%] translate-y-[-50%] bg-stone-100 dark:bg-stone-800 shadow-xl p-4 rounded-md  text-sm duration-300 scale-0 transform',
              {
                'scale-100': props.visible.value && delayVisible,
              },
              props.className,
            )}
          >
            {props.children}
          </div>
        </div>
      </>
    )
  }

  return null
}
