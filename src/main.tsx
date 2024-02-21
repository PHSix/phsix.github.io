import { hydrate } from 'preact-iso'
import FsRouter from '#router'
import './index.css'

interface AppProps {
  ssr: boolean
  url: string
  route: { url: string }
}

/**
 * this function will run in nodejs.
 */
function ssrLog(props: unknown) {
  if (
    Object.prototype.hasOwnProperty.call(props, 'ssr')
    && typeof window === 'undefined'
  ) {
    const _props = props as AppProps
    console.log(`prerender, url: ${_props.url}, ssr state: ${_props.ssr}`)
  }
}

function App(props: Partial<AppProps>) {
  ssrLog(props)

  return <FsRouter />
}

if (typeof window !== 'undefined')
  hydrate(<App />, document.body)

export async function prerender(data: any) {
  return await import('~/utils/prerender').then(({ default: ssr }) => {
    return ssr(<App {...data} />)
  })
}
