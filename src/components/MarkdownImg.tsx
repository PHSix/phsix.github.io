'use client'
import cx from '~/utils/cx'

export default function MarkdownImg(props: {
  className?: string
  alt?: string
  src?: string
  title?: string
}) {
  const src = props.src?.startsWith('/public') ? props.src.slice(7) : props.src

  return <img {...props} src={src} className={cx(props.className, 'min-h-10')}></img>
}
