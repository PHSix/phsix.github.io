'use client'
import { useState } from 'react'

const isServer = typeof window === 'undefined'

let msgs: {
  content: string
  uuid: string
  status: 'success' | 'error'
}[] = []

let update = () => {}

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
    const uuid = crypto.randomUUID()
    msgs = [...msgs, { content, status, uuid }]
    update()

    setTimeout(() => {
      msgs = msgs.filter(msg => msg.uuid !== uuid)
      update()
    }, 3000)
  }
}

const message = new Message()

export function Messages() {
  const [_, setState] = useState([])
  update = () => {
    setState([])
  }
  return (
    <>
      {msgs.map(msg => (
        <div
          key={msg.uuid}
          className="px-4 py-1 bg-slate-100 dark:bg-stone-700 rounded flex items-center gap-2"
        >
          {msg.status === 'success'
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
          <span>{msg.content}</span>
        </div>
      ))}
    </>
  )
}

export function MessageContainer() {
  return (
    <div className="fixed left-[1rem] bottom-[1rem] gap-[1rem] flex flex-col-reverse z-10" id="message-container">
      <Messages />
    </div>
  )
}

export default message
