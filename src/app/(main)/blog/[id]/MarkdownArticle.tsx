'use client'
import MarkdownToJSX from 'markdown-to-jsx'
import type { PropsWithChildren } from 'react'
import MarkdownImg from '../MarkdownImg'
import CodePre from '../CodePre'

export default function MarkdownArticle(props: { content: string }) {
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
