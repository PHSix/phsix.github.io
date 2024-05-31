import { MDXRemote } from 'next-mdx-remote/rsc'

export default function Mdx(props: { source: string }) {
  return (
    <MDXRemote
      source={props.source}
    />
  )
}
