import { access, mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import { Buffer } from 'node:buffer'

const fts = [
  'bash',
  'c_sharp',
  'c',
  'cpp',
  'css',
  'elisp',
  'elixir',
  'elm',
  'go',
  'html',
  'java',
  'javascript',
  'json',
  'kotlin',
  'lua',
  'objc',
  'ocaml',
  'php',
  'python',
  'ql',
  'rescript',
  'ruby',
  'rust',
  'scala',
  'solidity',
  'swift',
  'systemrdl',
  'tlaplus',
  'toml',
  'tsx',
  'typescript',
  'vue',
  'yaml',
]
const wasmsDir = path.resolve(process.cwd(), 'wasms')

async function main() {
  await mkdir(wasmsDir).catch(() => {})
  await Promise.all(
    fts.map(async (ft) => {
      const filename = `tree-sitter-${ft}.wasm`
      const filepath = path.resolve(wasmsDir, filename)
      try {
        await access(filepath)
      } catch {
        const buffer = await fetch(`https://unpkg.com/tree-sitter-wasms@0.1.11/out/${filename}`).then(response =>
          response.arrayBuffer(),
        ).then(arrayBuffer => Buffer.from(arrayBuffer))

        await writeFile(filepath, buffer)
      }
    }),
  )

  const filepath = path.resolve(wasmsDir, 'tree-sitter.wasm')

  await access(filepath).catch(() => {}).then(() => fetch('https://unpkg.com/web-tree-sitter@0.22.6/tree-sitter.wasm')).then(response => response.arrayBuffer()).then(blob => writeFile(filepath, Buffer.from(blob)))
}

main()
