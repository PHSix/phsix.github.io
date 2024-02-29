import cx from '~/utils/cx'

export default function InternalImg(props: {
  className?: string
  alt?: string
  src?: string
  title?: string
}) {
  if (props.src?.startsWith('/public'))
    props.src = props.src.slice(7)

  return <img {...props} class={cx(props.className, 'min-h-10')}></img>
}
