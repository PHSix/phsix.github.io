import { MDXRemote } from 'next-mdx-remote/rsc'
import Code from './Code'
import { parseCode } from '~/utils/tree-sitter-utils'

export default function Mdx(props: { source: string }) {
  return (
    <MDXRemote
      source={props.source}
      components={{
        pre: async (props) => {
          if (
            !!props.children
            && typeof props.children === 'object'
            && 'type' in props.children
            && props.children.type === 'code'
          ) {
            const lang: string = props.children.props.className
              ? `${props.children.props.className}`.replace('lang-', '').replace('language-', '')
              : 'text'

            const code: string = props.children.props.children || ''

            const result = await parseCode(code, lang)

            return <Code code={result} lang={lang} sourceCode={code} />
          }
          return <pre {...props}></pre>
        }
        ,
      }}
    />
  )
}
