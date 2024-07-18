import type { Metadata } from 'next'
import MainHeader from './MainHeader'
import Card from '~/components/Card'
import { GithubIcon, NixOSIcon, NodeJsIcon, PlusIcon, ReactIcon, ThreejsIcon, TypescriptIcon } from '~/components/Icons'
import Tooltip from '~/components/Tooltip'
import Sphere from '~/components/Sphere'

export const metadata: Metadata = {
  title: 'PH\'s Site',
}

export default function Home() {
  return (
    <>
      <MainHeader
        title="PH's Site"
        links={[
          {
            url: '/blog',
            text: '/Blog',
          },
          {
            url: 'https://github.com/PHSix',
            text: '/Github',
            blank: true,
          },
        ]}
      >

      </MainHeader>

      <main>
        <div
          className="flex flex-col md:flex-row flex-nowrap gap-4 md:gap-8 items-center"
        >
          <section className="text-center">
            <div className="w-[24em] h-[24em]">
              <Sphere />
            </div>
          </section>

          <div className="split-line min-h-full h-full w-[1px] bg-gray-600/10" />

          <section className="text-left p-4 md:p-0 space-y-2">
            <div>Hello, I'm Yi Chen. Welcome to my github site.</div>

            <div>I am a front-end developer based in ShenZhen, China.</div>

            <div>I am passionate about Linux, programming, and gaming.</div>
          </section>
        </div>

        <div className="title mt-[2em] mb-[1em] px-3 md:p-0">
          My Technology Stack
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-4 md:p-0">
          <Card>
            <div className="flex flex-row items-center justify-between w-full">
              <div className="flex flex-row items-center gap-2">
                <NixOSIcon className="h-[1.5em]" />
                Nixos
              </div>

              <Tooltip
                content="Do you want to visit my nix flake config?"
                url="https://github.com/PHSix/nix-config"
              >
                <GithubIcon className="h-[1.5em]" />
              </Tooltip>
            </div>

            <div className="py-4">
              A based on nix, declarative and reproducible linux dstro.
            </div>
          </Card>

          <Card>
            <div className="flex flex-row items-center w-full gap-2">
              <ReactIcon className="h-[1.5em]" />
              React
              <PlusIcon className="h-[1.5em]" />
              <TypescriptIcon className="h-[1.5em]" />
              Typescript
            </div>

            <div className="py-4">
              A powerful combination of front-end frameworks.
            </div>
          </Card>

          <Card>
            <div className="flex flex-row items-center justify-between w-full">
              <div className="flex flex-row items-center gap-2">
                <div className="flex flex-row items-center w-full gap-2">
                  <ReactIcon className="h-[1.5em]" />
                  R3F
                  <PlusIcon className="h-[1.5em]" />
                  <ThreejsIcon className="h-[1.5em]" />
                  Three.js
                </div>
              </div>
            </div>

            <div className="py-4">
              A great three.js development framework for react developers.
            </div>
          </Card>

          {/* <Card> */}
          {/*   <div className="flex flex-row items-center justify-between w-full"> */}
          {/*     <div className="flex flex-row items-center gap-2"> */}
          {/*       <NeovimIcon className="h-[1.5em]" /> */}
          {/*       Neovim */}
          {/*     </div> */}
          {/**/}
          {/*     <Tooltip */}
          {/*       content="Do you want to visit my nvim config?" */}
          {/*       url="https://github.com/PHSix/nvim" */}
          {/*     > */}
          {/*       <GithubIcon className="h-[1.5em]" /> */}
          {/*     </Tooltip> */}
          {/*   </div> */}
          {/**/}
          {/*   <div className="py-4"> */}
          {/*     The best code edtior for every geek developer. */}
          {/*   </div> */}
          {/* </Card> */}

          <Card>
            <div className="flex flex-row items-center justify-between w-full">
              <div className="flex flex-row items-center gap-2">
                <div className="flex flex-row items-center w-full gap-2">
                  <NodeJsIcon className="h-[1.5em]" />
                  Node.js
                </div>
              </div>
            </div>

            <div className="py-4">
              Node.js have many powerful framework and library for server-side
              development and commandline app etc. (Like next.js, ink and
              nuxt.js.)
            </div>
          </Card>
        </div>
      </main>
    </>
  )
}
