'use client'
import { atom, useAtom } from 'jotai'
import { atomWithStorage, createJSONStorage } from 'jotai/utils'

const isDark: boolean = typeof window === 'undefined' ? false : matchMedia('(prefers-color-scheme: dark)').matches
const storage = createJSONStorage<boolean>(() => sessionStorage)
const _darkAtom = atomWithStorage('is-dark', isDark, storage)

const darkAtom = atom((get) => {
  console.log('get', get(_darkAtom))
  return get(_darkAtom)
}, (get, set) => {
  const next = !get(_darkAtom)
  if (next)
    document.documentElement.classList.add('dark')
  else
    document.documentElement.classList.remove('dark')

  set(_darkAtom, next)
})

export default function useDark(): [boolean, () => void] {
  return useAtom(darkAtom)
}
