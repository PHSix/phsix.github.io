'use client'
import type { PropsWithChildren } from 'react'
import './grammar.scss'
import LangIcon from '~/components/LangIcon'
import { ClipboardIcon } from '~/components/Icons'
import message from '~/components/Message'

export default function Code(
  props: PropsWithChildren<{ className?: string, code: string, lang: string, sourceCode: string }>,
) {
  return (
    <div className="grammar-container mb-2 mx-2">
      <div className="px-1 py-1 border-b-[1px] border-b-[#5c6b5e50] flex justify-between items-center select-none">
        <LangIcon lang={props.lang} />
        <ClipboardIcon
          width={20}
          height={20}
          className="cursor-pointer hover:bg-neutral-800 rounded-md p-1"
          onClick={() => {
            navigator.clipboard.writeText(props.sourceCode)
            message.success('复制成功')
          }}
        />
      </div>
      <pre className="grammar-pre-container">
        <code
          className="grammar-code-container"
          dangerouslySetInnerHTML={{ __html: props.code }}
        >
        </code>
      </pre>
    </div>
  )
}
