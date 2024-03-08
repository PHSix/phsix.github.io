import { hydrate } from 'preact-iso'
import './index.css'
import SiteRouter from './router'
import { __CLIENT__ } from './constant'

interface AppProps {
  ssr: boolean
  url: string
  route: { url: string }
}

export function App(props: Partial<AppProps>) {
  if (!__CLIENT__)
    console.log(props)

  return <SiteRouter />
}

if (typeof window !== 'undefined')
  hydrate(<App />, document.body)
