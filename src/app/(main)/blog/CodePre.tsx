'use client'
import type { PropsWithChildren } from 'react'
import { highlight, languages } from 'prismjs'
import LangIcon from '~/components/LangIcon'
import cx from '~/utils/cx'
import useDark from '~/hooks/useDark'
import { ClipboardIcon } from '~/components/Icons'
import message from '~/components/Message'
import 'prismjs/themes/prism.min.css'

export default function CodePre(
  props: PropsWithChildren<{ className?: string }>,
) {
  const dark = useDark()

  if (
    !!props.children
    && typeof props.children === 'object'
    && 'type' in props.children
    && props.children.type === 'code'
  ) {
    const lang: string = props.children.props.className
      ? `${props.children.props.className}`.replace('lang-', '')
      : 'text'

    const code: string = props.children.props.children || ''
    const content = lang in languages ? highlight(code, languages[lang], lang) : code

    const className = props.children.props.className ? `${props.children.props.className}`.replace('language-', 'lang-') : ''

    return (
      <div className="bg-stone-100 dark:bg-stone-800 rounded-md overflow-hidden">
        <div className="flex flex-row justify-between items-center px-4 py-1 bg-stone-200 dark:bg-stone-700">
          <LangIcon lang={lang} />
          <div
            className="bg-stone-200 hover:bg-stone-300 dark:bg-stone-700 hover:dark:bg-stone-800 cursor-pointer rounded-md px-2 py-1"
            onClick={() => {
              navigator.clipboard.writeText(code)
              message.success('复制成功')
            }}
          >
            <ClipboardIcon className="h-[1.3em]" />
          </div>
        </div>
        <pre
          className={cx(className, {
            darkModePre: dark.value,
          })}
        >
          <code
            className={className}
            dangerouslySetInnerHTML={{ __html: content }}
          >
          </code>
        </pre>
      </div>
    )
  }

  return <pre {...props}></pre>
}
