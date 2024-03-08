import { ErrorBoundary, LocationProvider, Route, Router } from 'preact-iso'
import type { FunctionComponent } from 'preact/compat'
import { Suspense, lazy } from 'preact/compat'

const IndexPage = lazyLoadPage(() => import('~/pages/index/page'))
const BlogPage = lazyLoadPage(() => import('~/pages/blog/page'))
const BlogIdPage = lazyLoadPage(() => import('~/pages/blog/[:id]/page'))
const NotFoundPage = lazyLoadPage(() => import('~/pages/not-found/page'))
const ErrorPage = lazyLoadPage(() => import('~/pages/error/page'))

function lazyLoadPage(loader: () => Promise<{ default: FunctionComponent } | FunctionComponent>) {
  const Element = lazy(loader)

  return () => (
    <Suspense fallback={null}>
      <ErrorBoundary onError={() => location.replace('/500')}>
        <Element />
      </ErrorBoundary>
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
        <Route path="/404" default component={NotFoundPage} />
        <Route path="/500" component={ErrorPage} />
      </Router>
    </LocationProvider>
  )
}
