import { lazy } from 'preact-iso'
import { Suspense } from 'preact/compat'
import { __CLIENT__ } from '~/constant'

const GithubLangToIcon = lazy(() =>
  import('@altenull/github-lang-to-icon').then(res => res.GithubLangToIcon),
)

export default function LangIcon(props: { lang: string, size?: number }) {
  return (
    <div class="flex items-center gap-2">
      {__CLIENT__ && (
        <Suspense fallback={null}>
          <GithubLangToIcon lang={props.lang as any} size={props.size ?? 16} />
        </Suspense>
      )}
      <span>{props.lang}</span>
    </div>
  )
}
