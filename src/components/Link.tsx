import cx from '~/utils/cx'

export interface LinkProps {
  class?: string
  text?: string
  url?: string
  blank?: boolean
  onClick?: VoidFunction
}

/**
 * use for default layout link component
 */
export default function Link(props: LinkProps) {
  return (
    <a
      class={cx('hover:text-stone-300', props.class)}
      href={props.url}
      target={props.blank ? '_blank' : void 0}
      onClick={props.blank ? void 0 : props.onClick}
    >
      {props.text}
    </a>
  )
}
