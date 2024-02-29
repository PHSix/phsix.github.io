import Button from '~/components/button'

export default function ErrorPage() {
  return (
    <main class="flex h-screen w-screen items-center pt-[30vh] flex-col gap-8">
      <div>
        <div text-sm>Page meet some error.</div>

        <div class="text-8xl">500</div>
      </div>

      <Button primary onClick={() => history.back()}>
        Back
      </Button>
    </main>
  )
}
