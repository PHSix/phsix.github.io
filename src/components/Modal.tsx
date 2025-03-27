'use client'
import type { PropsWithChildren } from 'react'
import { useEffect, useState } from 'react'
import cx from '~/utils/cx'

export function Modal(
  props: PropsWithChildren<{
    visible: boolean
    onClose?: VoidFunction
    className?: string
  }>,
) {
  const [delayVisible, setDelayVisible] = useState(() => props.visible)

  useEffect(() => {
    const visible = props.visible
    setTimeout(() => {
      setDelayVisible(visible)
    }, 200)
  }, [props.visible])

  if (props.visible) {
    return (
      <>
        <div
          className="fixed top-0 left-0 h-screen w-screen bg-stone-700/60 backdrop-blur-sm z-10"
          onClick={props.onClose}
        />
        <div className="fixed top-[40%] left-[50%] z-20">
          <div
            className={cx(
              'translate-x-[-50%] translate-y-[-50%] bg-stone-100 dark:bg-stone-800 shadow-xl p-4 rounded-md  text-sm duration-300 scale-0 transform origin-center',
              {
                'scale-100': props.visible && delayVisible,
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
