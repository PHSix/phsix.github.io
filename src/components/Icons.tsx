import { EPSILON, func } from 'three/examples/jsm/nodes/Nodes.js'

type IconProps = Omit<JSX.IntrinsicElements['img'], 'src' | 'alt'>

export function NeovimIcon(props: IconProps) {
  return <img alt="neovim" src="/icons/neovim.svg" {...props} />
}

export function GithubIcon(props: IconProps) {
  return (
    <img alt="github" src="/icons/github.svg" {...props} />
  )
}

export function ReactIcon(props: IconProps) {
  return <img alt="react" src="/icons/react.svg" {...props} />
}

export function TypescriptIcon(props: IconProps) {
  return <img alt="typescript" src="/icons/typescript.svg" {...props} />
}

export function ThreejsIcon(props: IconProps) {
  return <img alt="threejs" src="/icons/threejs.svg" {...props} />
}

export function NodeJsIcon(props: IconProps) {
  return <img alt="nodejs" src="/icons/nodejs.svg" {...props} />
}

export function NixOSIcon(props: IconProps) {
  return <img alt="nixos" src="/icons/nixos.svg" {...props} />
}

export function PlusIcon(props: IconProps) {
  return <img alt="plus" src="/icons/plus.svg" {...props} />
}

export function ClipboardIcon(props: IconProps) {
  return <img alt="clipboard" src="/icons/clipboard.svg" {...props} />
}

export function SunIcon(props: IconProps) {
  return <img alt="sun" src="/icons/sun.svg" {...props} />
}

export function MoonIcon(props: IconProps) {
  return <img alt="sun" src="/icons/moon.svg" {...props} />
}
