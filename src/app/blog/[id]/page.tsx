import type { PropsWithChildren } from 'react'
import { use } from 'react'
import BlogMarkdown from '~/components/BlogMarkdown'
import DefaultLayout from '~/components/DefaultLayout'
import ImageBanner from '~/components/ImageBanner'
import { getBlog, getBlogList } from '~/utils/blogs'
import './style.scss'

export default function BlogIdPage(props: { params: { id: string } }) {
  const blog = use(getBlog(props.params.id))

  return (
    <DefaultLayout
      title="PH's Blog"
      links={[
        {
          url: '/',
          text: '/index',
        },
        {
          url: '/blog',
          text: '/blog',
        },
      ]}
    >
      <ImageBanner
        className="h-56 mb-8 md:mb-16 flex flex-row items-end justify-between p-4 flex-wrap"
      >
        <div className="text-2xl">{blog.title}</div>
        <div className="opacity-80">
          {blog.date.format('YYYY年MM月DD日')}
        </div>
      </ImageBanner>
      <BlogMarkdown content={blog.content} />

      <div className="w-full text-end text-stone-700/70 dark:text-stone-300/70 italic">End.</div>
    </DefaultLayout>

  )
}

export async function generateStaticParams() {
  return await getBlogList().then(blogs =>
    blogs.map(b => ({ id: b.id })),
  )
}
