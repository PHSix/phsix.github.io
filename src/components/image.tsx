import type { HTMLAttributes } from 'preact/compat'

const staticServerPrefix = ''

export function urlToStatic(url: string) {
  return staticServerPrefix + url
}

export function Image(
  props: Omit<HTMLAttributes<HTMLImageElement>, 'src'> & { src?: string },
) {
  const fixProps = {
    ...props,
    src: props.src?.startsWith('/static')
      ? staticServerPrefix + props.src.slice(7)
      : props.src,
  }
  return <img {...fixProps}></img>
}
