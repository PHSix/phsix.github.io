import Link from 'next/link'
import type { Metadata } from 'next'
import MainHeader from '../MainHeader'
import Banner from './Banner'
import { getBlogList } from '~/utils/blogs'

export const metadata: Metadata = {
  title: 'PH\'s Blog',
}

export default async function Blog() {
  const blogs = await getBlogList()

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
        <Banner />
        <div className="px-8 my-4">
          <div className="flex flex-col gap-5 pl-2">
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
