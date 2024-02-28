import type { PropsWithChildren } from 'preact/compat'
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
      class={cx(
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
