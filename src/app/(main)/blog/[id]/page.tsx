import type { Metadata } from 'next'
import { use } from 'react'
import MainHeader from '../../MainHeader'
import ImageBanner from '../ImageBanner'
import MarkdownArticle from './MarkdownArticle'
import { getBlog, getBlogList } from '~/utils/blogs'
import './style.scss'

interface Props {
  params: { id: string }
}

export default function BlogIdPage(props: Props) {
  const blog = use(getBlog(props.params.id))

  return (
    <>
      <MainHeader
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
      </MainHeader>
      <ImageBanner
        className="h-56 mb-8 md:mb-16 flex flex-row items-end justify-between p-4 flex-wrap"
      >
        <div className="text-2xl">{blog.title}</div>
        <div className="opacity-80">
          {blog.date.format('YYYY年MM月DD日')}
        </div>
      </ImageBanner>
      <MarkdownArticle content={blog.content} />

      <div className="w-full text-end text-stone-700/70 dark:text-stone-300/70 italic">End.</div>
    </>
  )
}

export async function generateStaticParams() {
  return await getBlogList().then(blogs =>
    blogs.map(b => ({ id: b.id })),
  )
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const blog = await getBlogList().then(blogs =>
    blogs.find(item => item.id === props.params.id)!,

  )

  return {
    title: `BLOG | ${blog.title}`,
  }
}