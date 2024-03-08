import { h } from 'preact'
import ssr from './utils/prerender'
import { App } from './main'

export async function prerender(data) {
  return ssr(h((App), { ...data }))
}
