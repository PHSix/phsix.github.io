import Button from '~/components/button'

export default function NotFound() {
  return (
    <main class="flex h-screen w-screen items-center pt-[30vh] flex-col gap-8">
      <div>
        <div text-sm>Not found.</div>

        <div class="text-8xl">404</div>
      </div>

      <Button primary onClick={() => history.back()}>
        Back
      </Button>
    </main>
  )
}
