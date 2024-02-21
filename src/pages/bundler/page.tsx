import { useSignal } from '@preact/signals'
import { useState } from 'preact/hooks'
import init, { compress } from 'wasm-gzip'

export default function Bundler() {
  const text = useSignal('')
  const [results, setResults] = useState<{ url: string, blobSize: number }[]>(
    [],
  )

  async function calc() {
    const url = text.value

    init('/wasm_gzip_bg.wasm').then(() =>
      fetch(url)
        .then((res) => {
          return res.text()
        })
        .then((text) => {
          const result = compress(text)

          const blob = new Blob([result])

          setResults((prevState) => {
            const nextState = prevState.filter(item => item.url !== url)

            return [...nextState, { url, blobSize: blob.size }]
          })
        }),
    )
  }

  return (
    <div class="flex flex-col pt-[20%] items-center h-screen w-screen gap-8">
      <div class="text-xl">
        gzip calculator, calc your cdn file size under gzip.
      </div>

      <div>
        <input
          class="bg-stone-200 text-2xl p-4 rounded-md"
          onInput={(event) => {
					  text.value = event.currentTarget.value
          }}
        />
      </div>

      <div>
        <button class="px-2 py-1 bg-blue-500 text-white rounded" onClick={calc}>
          计算gzip结果
        </button>
      </div>

      <div class="flex flex-col gap-5">
        {results.map(res => (
          <div
            class="p-6 bg-stone-100 rounded-md w-[36rem] shadow-md"
            key={res.url}
          >
            <div class="overflow-ellipsis text-nowrap w-full whitespace-nowrap overflow-hidden">
              {res.url}
            </div>
            <div class="text-right">
              {(res.blobSize / 1024).toFixed(2)}
              kb
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
