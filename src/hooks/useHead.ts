import { useEffect, useMemo, useState } from 'preact/hooks'

interface Head {
  title: string
  lang: string
}

const heads: Head[] = [
  {
    title: 'Site',
    lang: 'en',
  },
]

export default function useHead(head: Partial<Head>) {
  useState(() => {
    const lastHead = getHead()
    heads.push(Object.assign({ ...lastHead }, head))
  })

  useEffect(() => {
    return () => {
      heads.pop()
    }
  }, [])
}

export function getHead() {
  return heads[heads.length - 1]
}
