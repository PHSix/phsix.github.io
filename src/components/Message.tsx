'use client'
import type { CSSProperties } from 'react'
import { useEffect, useState } from 'react'

const isServer = typeof window === 'undefined'

interface Msg {
  content: string
  uuid: string
  status: 'success' | 'error'
}

let insertMsg = (_: string, _status: 'success' | 'error') => {}

class Message {
  success(content: string) {
    if (isServer)
      return
    this.insert(content, 'success')
  }

  error(content: string) {
    if (isServer)
      return
    this.insert(content, 'error')
  }

  private insert(content: string, status: 'success' | 'error') {
    insertMsg(content, status)
  }
}

const message = new Message()

export function MessageEle(props: { uuid: string, status: 'success' | 'error', content: string, index: number, removeSelf: VoidFunction }) {
  const [mounted, setMounted] = useState(false)
  const [unmouted, setUnmounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    setTimeout(() => {
      setTimeout(() => {
        props.removeSelf()
      }, 500)
      setUnmounted(true)
    }, 4000)
  }, [])

  const style: CSSProperties = {

  }

  if (mounted)
    style.transform = `translateX(0%) translateY(-${props.index * 120}%)`

  if (unmouted)
    style.opacity = 0

  return (
    <div
      style={style}
      className="px-4 py-1 bg-slate-100 dark:bg-stone-700 rounded flex items-center gap-2 fixed left-[1rem] bottom-[1rem] transition-all translate-x-[-100%] duration-300"
    >
      {props.status === 'success'
        ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 36 36"
          >
            <path
              fill="#40be1e"
              d="M18 2a16 16 0 1 0 16 16A16 16 0 0 0 18 2m10.45 10.63L15.31 25.76L7.55 18a1.4 1.4 0 0 1 2-2l5.78 5.78l11.14-11.13a1.4 1.4 0 1 1 2 2Z"
              className="clr-i-solid clr-i-solid-path-1"
            >
            </path>
            <path fill="none" d="M0 0h36v36H0z"></path>
          </svg>
          )
        : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
          >
            <path
              fill="#f04747"
              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2m1 15h-2v-2h2zm0-4h-2V7h2z"
            >
            </path>
          </svg>
          )}
      <span>{props.content}</span>
    </div>
  )
}

export function MessageContainer() {
  const [msgs, setMsgs] = useState<Msg[]>([])
  insertMsg = (content: string, status: 'success' | 'error') => {
    const uuid = crypto?.randomUUID?.() ?? Math.random().toString(36).slice(2)
    setMsgs(prev => [...prev, { content, status, uuid }])
  }

  return (
    <>
      {msgs.map((msg, index) => (
        <MessageEle
          key={msg.uuid}
          removeSelf={() => {
            setMsgs(prev => prev.filter(item => item.uuid !== msg.uuid))
          }}
          {...msg}
          index={msgs.length - index - 1}
        />
      ))}
    </>
  )
}

export default message
