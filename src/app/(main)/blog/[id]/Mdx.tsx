import { MDXRemote } from 'next-mdx-remote/rsc'
import CodePre from '../CodePre'

export default function Mdx(props: { source: string }) {
  return (
    <MDXRemote
      source={props.source}
      components={{
        pre: CodePre,
      }}
    />
  )
}
