import type { PropsWithChildren } from 'preact/compat'
import { highlight, languages } from 'prismjs'
import LangIcon from './LangIcon'
import cx from '~/utils/cx'
import useDark from '~/hooks/useDark'
import { ClipboardIcon } from '~/components/icon/icon'
import message from '~/components/message'
import 'prismjs/themes/prism.min.css'
import { __CLIENT__ } from '~/constant'

export default function CodePre(
  props: PropsWithChildren<{ className?: string }>,
) {
  const dark = useDark()

  if (
    typeof props.children === 'object'
    && 'type' in props.children
    && props.children.type === 'code'
  ) {
    const lang: string = props.children.props.className
      ? props.children.props.className?.replace?.('lang-', '')
      : 'text'

    const code: string = props.children.props.children || ''
    const content = lang in languages ? highlight(code, languages[lang], lang) : code

    return (
      <div class="bg-stone-100 dark:bg-stone-800 rounded-md overflow-hidden">
        <div class="flex flex-row justify-between items-center px-4 py-1 bg-stone-200 dark:bg-stone-700">
          <LangIcon lang={lang} />
          <div
            class="bg-stone-200 hover:bg-stone-300 dark:bg-stone-700 hover:dark:bg-stone-800 cursor-pointer rounded-md px-2 py-1"
            onClick={() => {
              navigator.clipboard.writeText(code)
              message.success('复制成功')
            }}
          >
            <ClipboardIcon class="h-[1.3em]" />
          </div>
        </div>
        <pre
          className={cx(props.children.props.className, {
            darkModePre: dark.value,
          })}
        >
          <code
            class={props.children.props.className}
            dangerouslySetInnerHTML={{ __html: content }}
          >
          </code>
        </pre>
      </div>
    )
  }

  return <pre {...props}></pre>
}
