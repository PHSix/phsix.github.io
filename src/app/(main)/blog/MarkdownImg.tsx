'use client'
import { useRef } from 'react'
import cx from '~/utils/cx'

export default function MarkdownImg(props: {
  className?: string
  alt?: string
  src?: string
  title?: string
}) {
  const src = props.src?.startsWith('/public') ? props.src.slice(7) : props.src
  const ref = useRef<HTMLImageElement>(null)

  return (
    <img
      {...props}
      src={src}
      className={cx(props.className, 'min-h-10')}
      ref={ref}
    >
    </img>
  )
}
