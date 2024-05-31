'use client'
import Button from '~/components/Button'

export default function ErrorPage() {
  return (
    <main className="flex h-screen w-full items-center pt-[30vh] flex-col gap-8">
      <div>
        <div text-sm>Page meet some error.</div>

        <div className="text-8xl">500</div>
      </div>

      <Button primary onClick={() => history.back()}>
        Back
      </Button>
    </main>
  )
}
