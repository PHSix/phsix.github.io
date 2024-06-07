import Link from 'next/link'
import type { PropsWithChildren } from 'react'
import { Fragment, createElement, useMemo } from 'react'
import LayoutLinks from './LayoutLinks'

export default function MainHeader(props: {
  title?: string
  links?: {
    url: string
    blank?: boolean
    text: string
  }[]
  titleUrl?: string
}) {
  const Wrap = ({ children }: PropsWithChildren) => props.titleUrl
    ? createElement(Link, { href: props.titleUrl }, children)
    : createElement(Fragment, {}, children)

  return (
    <header className="flex justify-between items-center px-3 py-5">

      <Wrap>
        <div
          className="text-[2em] cursor-pointer select-none"
        >
          {props.title}
        </div>
      </Wrap>
      <div className="flex flex-row gap-4 items-center">
        <LayoutLinks links={props.links || []} />
      </div>
    </header>
  )
}
