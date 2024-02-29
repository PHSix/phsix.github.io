import { LocationProvider, Route, Router } from 'preact-iso'
import type { FC } from 'preact/compat'
import { Suspense, lazy } from 'preact/compat'

const IndexPage = lazyLoadPage(() => import('~/pages/index/page'))
const BlogPage = lazyLoadPage(() => import('~/pages/blog/page'))
const BlogIdPage = lazyLoadPage(() => import('~/pages/blog/[:id]/page'))
const NotFoundPage = lazyLoadPage(() => import('~/pages/not-found/page'))
const ErrorPage = lazyLoadPage(() => import('~/pages/error/page'))

function lazyLoadPage<T extends FC>(loader: () => Promise<{ default: T } | T>) {
  const Element = lazy(loader)

  return () => (
    <Suspense fallback={null}>
      {/* @ts-expect-error disable type check */}
      <Element />
    </Suspense>
  )
}

export default function SiteRouter() {
  return (
    <LocationProvider>
      <Router>
        <Route path="/" component={IndexPage} />
        <Route path="/blog/" component={BlogPage} />
        <Route path="/blog/:id/" component={BlogIdPage} />
        <Route path="/404" component={NotFoundPage} />
        <Route path="/500" component={ErrorPage} />
        <Route default component={NotFoundPage} />
      </Router>
    </LocationProvider>
  )
}
