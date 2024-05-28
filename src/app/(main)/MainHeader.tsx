import LayoutLinks from '~/components/LayoutLinks'

export default function MainHeader(props: {
  title?: string
  links?: {
    url: string
    blank?: boolean
    text: string
  }[]
  onTitleClick?: VoidFunction
}) {
  return (
    <header className="flex justify-between items-center px-3 py-5">
      <div
        className="text-[2em] cursor-pointer select-none"
        onClick={props.onTitleClick}
      >
        {props.title}
      </div>
      <div className="flex flex-row gap-4 items-center">
        <LayoutLinks links={props.links || []} />
      </div>
    </header>
  )
}
