import { lazy } from 'preact-iso'
import { Suspense } from 'preact/compat'

const GithubLangToIcon = lazy(() =>
  import('@altenull/github-lang-to-icon').then(res => res.GithubLangToIcon),
)

export default function LangIcon(props: { lang: string, size?: number }) {
  return (
    <Suspense fallback={null}>
      <div class="flex items-center gap-2">
        <GithubLangToIcon lang={props.lang as any} size={props.size ?? 16} />
        <span>{props.lang}</span>
      </div>
    </Suspense>
  )
}
