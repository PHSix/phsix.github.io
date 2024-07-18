'use client'
import { useEffect, useRef } from 'react'
import {
  Color,
  Group,
  Mesh,
  MeshBasicMaterial,
  Object3D,
  PerspectiveCamera,
  Scene,
  SphereGeometry,
  WebGLRenderer,
} from 'three'
import useDark from '~/hooks/useDark'

let toggleDark = (_: boolean) => {}

export default function Sphere() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [dark] = useDark()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas)
      return

    Object3D.DEFAULT_MATRIX_AUTO_UPDATE = true
    const scene = new Scene()

    const segment = 12
    const fov = 35
    const aspect = canvas.clientWidth / canvas.clientHeight
    const near = 0.01
    const far = 300
    const camera = new PerspectiveCamera(fov, aspect, near, far)
    camera.position.set(0, 0, 90)

    const darkFg = new Color('#d1d5db')
    const fg = new Color('#525252')
    const material = new MeshBasicMaterial({
      color: dark ? darkFg : fg,
      wireframe: true,
    })

    const renderer = new WebGLRenderer({ canvas, alpha: true })
    // set transparent background
    renderer.setClearColor(0xFFFFFF, 0)

    const geometry = new SphereGeometry(25, segment, segment)
    renderer.setPixelRatio(window.devicePixelRatio)

    const mesh = new Mesh(geometry, material)

    const group = new Group()
    group.add(mesh)
    group.rotateZ(Math.PI / 5)

    scene.add(group)

    renderer.setSize(canvas.clientWidth, canvas.clientHeight)

    renderer.render(scene, camera)

    let angleY = 0
    let dragging = false

    function rotateY(offsetY: number) {
      angleY = (angleY + offsetY) % 360
    }

    const y = createBezierY()

    const renderTimer = setInterval(() => {
      if (!dragging) {
        rotateY(-0.5)
        y.next()
      }

      mesh.rotation.set(0, (angleY / 180) * Math.PI, 0)
      group.position.setY(y.value)
      renderer.render(scene, camera)
      // 60fps in a second
    }, 1000 / 60)

    canvas.addEventListener('mousedown', () => {
      dragging = true
    })

    const onMouseMove = (ev: MouseEvent) => {
      if (dragging)
        rotateY(ev.movementX % 3)
    }

    window.addEventListener('mousemove', onMouseMove)

    const onMouseUp = () => {
      if (dragging)
        dragging = false
    }

    window.addEventListener('mouseup', onMouseUp)

    // effect(() => {
    //   if (dark.value)
    //     material.color = darkFg
    //   else
    //     material.color = fg
    // })

    const globalRenderer = renderer

    toggleDark = (d) => {
      if (d)
        material.color = darkFg
      else material.color = fg
    }

    return () => {
      globalRenderer?.dispose()

      if (renderTimer !== void 0)
        clearInterval(renderTimer)

      if (onMouseMove)
        window.removeEventListener('mousemove', onMouseMove)
      if (onMouseUp)
        window.removeEventListener('mouseup', onMouseUp)
    }
  }, [])

  useEffect(() => {
    toggleDark(dark)
  }, [dark])

  return <canvas className="w-full h-full" ref={canvasRef} />
}

/**
 * create a float bezier y
 */
function createBezierY() {
  let count = 0

  return {
    get value() {
      return Math.sin((Math.PI * count) / 90)
    },
    next() {
      count += 0.3
    },
  }
}
