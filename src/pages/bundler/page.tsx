import { useSignal } from "@preact/signals";
import init, { compress } from "wasm-gzip";

export default function Bundler() {
	const text = useSignal("");

	async function calc() {
		const url = text.value;

		init().then(() =>
			fetch(url)
				.then((res) => {
					return res.text();
				})
				.then((text) => {
					const result = compress(text);
					console.log(result);
				})
		);
	}

	return (
		<div class="flex flex-col items-center justify-center h-screen w-screen gap-8">
			<div class="text-xl">Bundler, calc your cdn file size under gzip.</div>

			<div>
				<input
					class="bg-stone-200 text-2xl p-4 rounded-md"
					onInput={(event) => {
						text.value = event.currentTarget.value;
					}}
				/>
			</div>

			<div>
				<button class="px-2 py-1 bg-blue-500 text-white rounded" onClick={calc}>
					计算结果
				</button>
			</div>
		</div>
	);
}
