import { access } from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import Parser from 'web-tree-sitter'

let initFinish = false
const wasmsDir = path.resolve(process.cwd(), 'public', 'wasms')
const langMap: Record<string, Parser.Language> = {}

const langNameRenameMap: Record<string, string> = {
  typescriptreact: 'tsx',
  javascriptreact: 'javascript',
  jsx: 'javascript',
}

async function loadParser() {
  if (initFinish)
    return

  await Parser.init({
    locateFile(scriptName: string) {
      return path.resolve(wasmsDir, scriptName)
    },
  })
  initFinish = true
}

async function getLang(langName: string) {
  langName = langName in langNameRenameMap ? langNameRenameMap[langName] : langName

  if (Object.prototype.hasOwnProperty.call(langMap, langName))
    return langMap[langName]

  const p = path.resolve(wasmsDir, `tree-sitter-${langName}.wasm`)
  try {
    await access(p)
  } catch {
    return undefined
  }

  const lang = await Parser.Language.load(p)

  langMap[langName] = lang

  return lang
}

export async function parseCode(code: string, langName: string) {
  await loadParser()
  const parser = new Parser()
  const lang = await getLang(langName)

  if (!lang)
    return code

  parser.setLanguage(lang)

  const tree = parser.parse(code)
  const codeResult: string[] = []

  let curIndex = 0
  function walk(node: Parser.SyntaxNode) {
    if (node.children.length > 0) {
      node.children.map(n => walk(n))
      return
    }
    if (curIndex !== node.startIndex)
      codeResult.push(code.slice(curIndex, node.startIndex))

    codeResult.push(`<span class="grammar-${node.grammarType}">${code.slice(node.startIndex, node.endIndex)}</span>`)

    curIndex = node.endIndex
  }

  walk(tree.rootNode)

  return codeResult.join('')
}
