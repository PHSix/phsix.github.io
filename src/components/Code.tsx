import { useMemo } from 'react'
import type Parser from 'web-tree-sitter'

interface WalkableNode {
  children: WalkableNode[]
  text: string
  startIndex: Parser.Point
}

interface Props {
  node: WalkableNode
}

export default function Code(props: Props) {
  useMemo(() => {
    let index = -1
    function walk(node: WalkableNode) {
      if (index !== node.startIndex.row)
        index = node.startIndex.row

      if (node.children.length > 0)
        node.children.map(n => walk(n))

      return node.text
    }
  }, [props.node])

  return <div></div>
}
