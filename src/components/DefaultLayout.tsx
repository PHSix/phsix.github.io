import type {
  PropsWithChildren,
} from 'react'
import {
  Suspense,
} from 'react'
import LayoutLinks from './LayoutLinks'

export default function DefaultLayout(
  props: PropsWithChildren<{
    title?: string
    links?: {
      url: string
      blank?: boolean
      text: string
    }[]
    onTitleClick?: VoidFunction
  }>,
) {
  return (
    <>
      <head>
        <title>
          {props.title}
        </title>
      </head>
      <body>
        <div className="w-screen h-screen p-0 flex-col max-w-screen-lg m-auto">
          <header className="flex justify-between items-center px-3 py-5">
            <div
              className="text-[2em] cursor-pointer select-none"
              onClick={props.onTitleClick}
            >
              {props.title}
            </div>
            <div className="flex flex-row gap-4 items-center">
              <LayoutLinks links={props.links || []} />
            </div>
          </header>

          <Suspense>
            {props.children}
          </Suspense>

          <footer
            className="mt-8 pb-4 text-sm flex items-end justify-end text-stone-300 dark:text-stone-700 flex-col text-right space-y-1"
          >
            <div>This site is built by Next.js.</div>
            <div>Deploy by Vercel and Github Action Page.</div>
          </footer>
        </div>
      </body>
    </>
  )
}
