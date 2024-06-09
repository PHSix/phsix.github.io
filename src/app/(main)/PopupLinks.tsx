import type { Signal } from '@preact/signals-react'
import NextLink from 'next/link'
import { Modal } from '~/components/Modal'

export default function PopupLinks(props: {
  visible: Signal<boolean>
  links?: {
    text: string
    url: string
    blank?: boolean
  }[]
  onClose?: VoidFunction
}) {
  if (!props.links?.length)
    return null

  return (
    <Modal visible={props.visible} onClose={props.onClose} className="min-w-48 w-[40vw]">
      <div className="text-xs mb-4 italic font-bold">Links:</div>
      {props.links.map(link => (
        <NextLink
          key={link.text}
          href={link.url}
          target={link.blank ? '_blank' : void 0}
          className="block text-sm my-2 p-3 hover:bg-stone-200 hover:text-stone-500 rounded-sm text-center dark:hover:bg-stone-700 dark:hover:text-stone-400 "
        >
          {link.text}
        </NextLink>
      ))}
    </Modal>
  )
}
