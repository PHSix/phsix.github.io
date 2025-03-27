'use client'
import { Fragment, useState } from 'react'
import NextLink from 'next/link'
import PopupLinks from './PopupLinks'
import DarkModeSwitcher from './DarkModeSwitcher'

export default function LayoutLinks(props: {
  links: {
    url: string
    blank?: boolean
    text: string
  }[]
}) {
  const [showMenu, setShowMenu] = useState(false)
  return (
    <Fragment>
      <div
        className="cursor-pointer md:hidden"
        onClick={() => {
          setShowMenu(true)
        }}
      >
        🔗
      </div>
      <PopupLinks
        visible={showMenu}
        links={props.links}
        onClose={() => {
          setShowMenu(false)
        }}
      />
      <div className="gap-4 hidden md:flex">
        {
          props.links.map(l => <NextLink href={l.url} target={l.blank ? '_blank' : void 0} key={l.text} className="hover:text-stone-300">{l.text}</NextLink>)
        }
      </div>
      <DarkModeSwitcher />
    </Fragment>
  )
}
