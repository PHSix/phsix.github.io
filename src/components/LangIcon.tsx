import { Suspense, lazy } from 'react'

import { GithubLangToIcon } from '@altenull/github-lang-to-icon'

export default function LangIcon(props: { lang: string, size?: number }) {
  return (
    <div className="flex items-center gap-2">
      <GithubLangToIcon lang={props.lang as any} size={props.size ?? 16} />
      <span>{`${props.lang[0].toUpperCase()}${props.lang.slice(1)}`}</span>
    </div>
  )
}
