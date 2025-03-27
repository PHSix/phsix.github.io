'use client'
import type { PropsWithChildren, ReactNode } from 'react'
import { Fragment, useState } from 'react'
import Button from '~/components/Button'
import { Modal } from '~/components/Modal'

export default function Tooltip(
  props: PropsWithChildren<{
    content: ReactNode
    className?: string
    url: string
  }>,
) {
  const [visible, setVisible] = useState(false)

  return (
    <Fragment>
      <div
        className="cursor-pointer"
        onClick={() => {
          setVisible(true)
        }}
      >
        {props.children}
      </div>

      <Modal
        visible={visible}
        onClose={() => {
          setVisible(false)
        }}
        className="w-[30vw] md:w-[40vw]"
      >
        <div>{props.content}</div>
        <div className="flex gap-4 justify-end mt-8">
          <Button
            primary
            onClick={() => {
              window.open(props.url, '_blank')
            }}
          >
            Yes
          </Button>
          <Button
            onClick={() => {
              setVisible(false)
            }}
          >
            No
          </Button>
        </div>
      </Modal>
    </Fragment>
  )
}
