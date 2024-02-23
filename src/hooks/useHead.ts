import { useState } from 'preact/hooks'
import localOptions from '~/options'

interface Head {
  title: string
  lang: string
}

const defaultHead = {
  title: 'Site',
  lang: 'en',
}

export default function useHead(head: Partial<Head>) {
  useState(() => {
    localOptions.head = { ...defaultHead, ...head }

    if (typeof window !== 'undefined') {
      document.title = localOptions.head.title
      document.head.lang = localOptions.head.lang
    }
  })
}
