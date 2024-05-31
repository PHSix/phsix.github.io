import { readFile, readdir } from 'node:fs/promises'
import process from 'node:process'
import { resolve } from 'node:path'
import { watch } from 'node:fs'
import { cache } from 'react'
import dayjs from 'dayjs'
import { parse } from 'yaml'
import { omit } from 'radash'

async function calcBlogs() {
  return readdir(resolve(process.cwd(), 'blogs')).then(dir =>
    Promise.all(dir.map(filename => readFile(resolve(process.cwd(), 'blogs', filename)).then((content) => {
      const data = content.toString()
      const result = data.match(/---\n([^]+?)\n---/)!
      const header = parse(result[1]) as { 'title': string, 'create-time': string, 'tags': string[] }
      const date = dayjs(header['create-time'])
      return { ...header, id: filename.slice(0, filename.length - 3), date, dateString: date.format('YYYY年MM月DD日'), content: data.replace(/---\n([^]+?)\n---/, '') }
    }))),
  )
}

let getBlogs = cache(calcBlogs)

watch(resolve(process.cwd(), 'blogs'), { encoding: 'buffer' }, () => {
  getBlogs = cache(calcBlogs)
})

export async function getBlogList() {
  return getBlogs().then(blogs => blogs.map(b => omit(b, ['content'])).sort((a, b) => b.date.unix() - a.date.unix()))
}

export async function getBlog(id: string) {
  return getBlogs().then((blogs) => {
    return blogs.find(blog => blog.id === id)!
  })
}
