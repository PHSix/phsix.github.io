'use client'
import MarkdownToJSX from 'markdown-to-jsx'
import type { PropsWithChildren } from 'react'
import CodePre from './CodePre'
import MarkdownImg from './MarkdownImg'

export default function BlogMarkdown(props: { content: string }) {
  return (
    <MarkdownToJSX options={{
      wrapper: (props: PropsWithChildren) => (
        <div className="blog-page-content">{props.children}</div>
      ),
      overrides: {
        pre: CodePre,
        img: MarkdownImg,
      },
    }}
    >
      {props.content}
    </MarkdownToJSX>
  )
}
