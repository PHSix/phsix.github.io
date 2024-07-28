import type { PropsWithChildren } from 'react'
import cx from '~/utils/cx'

export default function Banner(props: PropsWithChildren<{ className?: string }>) {
  return (
    <div
      className={cx('w-full h-56 bg-cover bg-center rounded-xl relative', props.className)}
    >
      <img src="/images/default.png" className="absolute z-[-1] dark:hidden w-full h-full top-0 left-0 rounded-xl object-cover" />
      <img
        src="/images/default-dark.png"
        className="absolute z-[-1] w-[900px] h-full top-0 left-0 rounded-xl object-cover hidden dark:block"
      />
      {props.children}
    </div>
  )
}
