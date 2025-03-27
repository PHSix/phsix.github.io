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
        <div className="px-2 md:px-8 my-4">
          <div className="flex flex-col gap-5 pl-2">
            {blogs.map(b => (
              <Link
                key={b.id}
                className="flex justify-between items-end flex-row hover:text-gray-400 duration-300 gap-2 md:gap-8"
                href={`/blog/${b.id}`}
              >
                <div>{b.title}</div>

                <div className="text-nowrap text-xs md:text-[1em]">{b.dateString}</div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </>
  )
}
