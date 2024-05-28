import { use } from 'react'
import Link from 'next/link'
import type { Metadata } from 'next'
import MainHeader from '../MainHeader'
import ImageBanner from './ImageBanner'
import { getBlogList } from '~/utils/blogs'

export const metadata: Metadata = {
  title: 'PH\'s Blog',
}

export default function Blog() {
  const blogs = use(getBlogList())

  return (
    <>
      <MainHeader
        title="PH's Blog"
        links={[
          {
            url: '/',
            text: '/index',
          },
        ]}
      >
      </MainHeader>
      <main>
        <ImageBanner />
        <div className="px-8 my-4">
          <div className="flex flex-col gap-3 pl-2">
            {blogs.map(b => (
              <Link
                key={b.id}
                className="flex justify-between flex-row hover:text-gray-400 duration-300"
                href={`/blog/${b.id}`}
              >
                <div>
                  <div>{b.title}</div>
                </div>

                <div>{b.dateString}</div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </>
  )
}
