import { use } from 'react'
import Link from 'next/link'
import DefaultLayout from '~/components/DefaultLayout'
import ImageBanner from '~/components/ImageBanner'
import { getBlogList } from '~/utils/blogs'

export default function Blog() {
  const blogs = use(getBlogList())

  return (
    <DefaultLayout
      title="PH's Blog"
      links={[
        {
          url: '/',
          text: '/index',
        },
      ]}

    >
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
    </DefaultLayout>
  )
}
