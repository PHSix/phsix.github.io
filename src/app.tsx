import { useSignal } from "@preact/signals";
import { useEffect } from "preact/hooks";
import { AnimateRotation } from "./animate-rotation";
import { Card } from "./card";
import {
	NeovimIcon,
	NodeJsIcon,
	ReactIcon,
	ThreejsIcon,
	TypescriptIcon,
} from "./icon";
import { ThemeSwitch } from "./theme-switch";

document.body.className =
	"dark:bg-neutral-900 dark:text-gray-300 bg-white text-stone-700";

export function App() {
	const dark = useSignal(false);

	useEffect(() => {
		if (dark.value) {
			document.documentElement.classList.add("dark");
		} else {
			document.documentElement.classList.remove("dark");
		}
	}, [dark.value]);

	return (
		<main class="w-screen h-screen p-0 flex-col max-w-screen-lg m-auto">
			<header class="flex justify-between items-center px-3 py-5">
				<div class="text-[2em]">PH's site</div>
				<div>
					<ThemeSwitch
						isDark={dark.value}
						onSwitch={(isDark) => {
							dark.value = isDark;
						}}
					/>
				</div>
			</header>
			<div
				class={"flex flex-col md:flex-row flex-nowrap gap-[30px] items-center"}
			>
				<section class="text-center">
					<AnimateRotation isDark={dark.value} className="w-[24em] h-[24em]" />
				</section>

				<div class="split-line min-h-full h-full w-[1px] bg-gray-600/10" />

				<section class="text-left">
					<div>Hello, I'm Yi Chen, welcome to access my github site.</div>

					<div>I am a front-end developer based in WuHan China.</div>
				</section>
			</div>

			<div class="title mt-[2em] mb-[1em]">My Technology Stack</div>
			<div class="grid grid-cols-3 gap-4">
				<Card>
					<div class="flex flex-row items-center w-full gap-2">
						<ReactIcon class="h-[1.5em]" />
						React
						<span>➕</span>
						<TypescriptIcon class="h-[1.5em]" />
						Typescript
					</div>

					<div class="py-4">
						A powerful combination of front-end frameworks.
					</div>
				</Card>

				<Card>
					<div class="flex flex-row items-center justify-between w-full">
						<div class="flex flex-row items-center gap-2">
							<div class="flex flex-row items-center w-full gap-2">
								<ReactIcon class="h-[1.5em]" />
								R3F
								<span>➕</span>
								<ThreejsIcon class="h-[1.5em]" />
								Three.js
							</div>
						</div>
					</div>

					<div class="py-4">
						A great three.js development framework for react developers.
					</div>
				</Card>

				<Card>
					<div class="flex flex-row items-center justify-between w-full">
						<div class="flex flex-row items-center gap-2">
							<NeovimIcon class="h-[1.5em]" />
							Neovim
						</div>
					</div>

					<div class="py-4">The best code edtior for every geek developer.</div>
				</Card>

				<Card>
					<div class="flex flex-row items-center justify-between w-full">
						<div class="flex flex-row items-center gap-2">
							<div class="flex flex-row items-center w-full gap-2">
								<NodeJsIcon class="h-[1.5em]" />
								Node.js
							</div>
						</div>
					</div>

					<div class="py-4">
						Node.js have many powerful framework and library for server-side
						development and commandline app etc. (Like next.js, ink and
						nuxt.js.)
					</div>
				</Card>
			</div>
		</main>
	);
}
