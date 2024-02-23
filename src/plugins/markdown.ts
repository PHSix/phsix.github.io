import { resolve } from 'node:path'
import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises'
import process from 'node:process'
import type { Plugin } from 'vite'
import yaml from 'yaml'
import type { BlogAttributes } from 'virtual:blogs'

const blogsFolder = resolve(process.cwd(), 'blogs')
const blogReqUrlReg = /\/blogs\/.+\.json/g

async function getAttributesAndContent(str: string) {
  const index = str.indexOf('\n---', 2)
  const attributes: BlogAttributes = {
    'title': '',
    'create-time': '',
    'tags': [],
  }

  Object.assign(attributes, yaml.parse(str.slice(3, index - 1)))

  const content = str.slice(index + 4)

  return {
    attributes,
    content,
  }
}

async function getBlogs() {
  const blogFolder = resolve(process.cwd(), 'blogs')
  const dir = await readdir(blogFolder)
  const contents: Record<string, string> = {}

  const files = dir.map(async (fileName) => {
    const filePath = resolve(blogFolder, fileName)
    const id = fileName.split('.').shift()

    const { attributes, content } = await getAttributesAndContent(
      (await readFile(filePath)).toString(),
    )

    contents[id] = content

    return {
      id,
      path: filePath,
      attributes,
    }
  })

  return {
    blogList: await Promise.all(files),
    contents,
  }
}

export default function markdown(): Plugin {
  let blogs = getBlogs()
  let blogList = blogs.then(res => res.blogList)
  let contents = blogs.then(res => res.contents)
  const virtualModuleId = 'virtual:blogs'
  const resolvedVirtualModuleId = `\0${virtualModuleId}`

  function update() {
    blogs = getBlogs()
    blogList = blogs.then(res => res.blogList)
    contents = blogs.then(res => res.contents)
  }

  return {
    name: 'vite:markdown-plugin',
    enforce: 'pre',
    async buildStart() {
      return blogs.then(async (res) => {
        const folder = resolve(process.cwd(), 'public', 'blogs')
        await mkdir(folder).catch(() => void 0)

        await Promise.all(
          Object.entries(res.contents).map(([id, content]) =>
            writeFile(
              resolve(folder, `${id}.json`),
              JSON.stringify({
                id,
                content,
              }),
            ),
          ),
        )
      })
    },
    async resolveId(source) {
      if (source === virtualModuleId)
        return resolvedVirtualModuleId
    },
    async load(source) {
      if (source === resolvedVirtualModuleId)
        return `export default ${JSON.stringify(await blogList)}`
    },
    configureServer(server) {
      server.watcher.add(blogsFolder)

      server.watcher.on('all', (_, path) => {
        if (path.match(/\/blogs\/.+\.md/g))
          update()
      })

      server.middlewares.use(async (req, res, next) => {
        if (req.url.match(blogReqUrlReg)) {
          res.setHeader('Content-type', 'application/json')
          const id = req.url.slice(7, req.url.length - 5)
          const contentsThen = await contents
          if (contentsThen[id]) {
            res.write(
              JSON.stringify({
                id,
                content: contentsThen[id],
              }),
            )
          } else {
            res.statusCode = 400
            res.write('failed to get')
          }

          res.end()
          return
        }

        next()
      })
    },
  }
}
