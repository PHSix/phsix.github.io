import type { PropsWithChildren } from 'react'

export default function Card(props: PropsWithChildren) {
  return (
    <div className="rounded-md p-4 h-full bg-stone-100 dark:bg-neutral-700">
      {props.children}
    </div>
  )
}
