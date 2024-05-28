'use client'
import { useRouter } from 'next/router'
import Button from '~/components/Button'

export default function ErrorPage() {
  const router = useRouter()
  return (
    <main className="flex h-screen w-screen items-center pt-[30vh] flex-col gap-8">
      <div>
        <div text-sm>Page meet some error.</div>

        <div className="text-8xl">500</div>
      </div>

      <Button primary onClick={() => router.back()}>
        Back
      </Button>
    </main>
  )
}
