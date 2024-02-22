import type {
  PropsWithChildren,
} from 'preact/compat'
import {
  Fragment,
  useEffect,
  useState,
} from 'preact/compat'
import { useSignal } from '@preact/signals'
import debounce from 'debounce'
import PopupLinks from './popup-links'
import ThemeSwitch from '~/components/theme-switch'
import type { LinkProps } from '~/components/Link'
import Link from '~/components/Link'

function getIsMd() {
  return typeof window === 'undefined' ? true : window.innerWidth < 768
}

export default function DefaultLayout(
  props: PropsWithChildren<{
    title?: string
    links?: LinkProps[]
    onTitleClick?: VoidFunction
  }>,
) {
  const [isMd, setIsMd] = useState(getIsMd)
  const showMenu = useSignal(false)

  useEffect(() => {
    if (typeof window === 'undefined')
      return

    const listener = debounce(() => {
      setIsMd(getIsMd())
    }, 70)
    window.addEventListener('resize', listener)

    return () => window.removeEventListener('resize', listener)
  }, [])

  return (
    <div class="w-screen h-screen p-0 flex-col max-w-screen-lg m-auto">
      <header class="flex justify-between items-center px-3 py-5">
        <div
          class="text-[2em] cursor-pointer select-none"
          onClick={props.onTitleClick}
        >
          {props.title}
        </div>
        <div class="flex flex-row gap-4 items-center">
          {isMd
            ? (
              <Fragment>
                <div
                  class="cursor-pointer"
                  onClick={() => {
                    showMenu.value = true
                  }}
                >
                  🔗
                </div>
                <PopupLinks
                  visible={showMenu}
                  links={props.links}
                  onClose={() => {
                    showMenu.value = false
                  }}
                />
              </Fragment>
              )
            : (
                props.links?.map(link => <Link {...link} key={link.text} />)
              )}
          <ThemeSwitch />
        </div>
      </header>

      {props.children}

      <footer
        class="mt-8 pb-4 text-sm flex items-end justify-end text-stone-300 dark:text-stone-700 flex-col text-right space-y-1"
      >
        <div>This site is built by preact.js.</div>
        <div>Deploy by Vercel and Github Action Page.</div>
      </footer>
    </div>
  )
}
