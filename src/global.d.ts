declare module '#blogs' {
  export interface Blog {
    id: string
    attributes: BlogAttributes
  }

  export interface BlogAttributes {
    title: string
    ['create-time']: string
    tags?: string[]
  }

  declare const blogs: Blog[]

  export default blogs
}

declare module '#router' {
  import type { FC } from 'preact/compat'

  const FsRouter: FC
  export default FsRouter
}
