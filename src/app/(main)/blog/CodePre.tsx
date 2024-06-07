'use client'
import { type PropsWithChildren, Suspense, use, useEffect, useState } from 'react'

export default function CodePre(
  props: PropsWithChildren<{ className?: string }>,
) {
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
    return <Suspense fallback={null}><Internal lang={lang} code={code}></Internal></Suspense>
  }

  return <pre {...props}></pre>
}

function Internal(props: { lang: string, code: string }) {
  return (
    <code>
      <pre
        dangerouslySetInnerHTML={{ __html: props.code }}
      >
      </pre>
    </code>
  )
}
