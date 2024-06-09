'use client'
import { useSignal } from '@preact/signals-react'
import type { PropsWithChildren, ReactNode } from 'react'
import { Fragment } from 'react'
import Button from '~/components/Button'
import { Modal } from '~/components/Modal'

export default function Tooltip(
  props: PropsWithChildren<{
    content: ReactNode
    className?: string
    url: string
  }>,
) {
  const visible = useSignal(false)

  return (
    <Fragment>
      <div
        className="cursor-pointer"
        onClick={() => {
          visible.value = true
        }}
      >
        {props.children}
      </div>

      <Modal
        visible={visible}
        onClose={() => {
          visible.value = false
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
              visible.value = false
            }}
          >
            No
          </Button>
        </div>
      </Modal>
    </Fragment>
  )
}
