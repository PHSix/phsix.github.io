import { useSignal } from "@preact/signals";
import { useEffect } from "preact/hooks";
import { Card } from "./card";
import {
	GithubIcon,
	NeovimIcon,
	NixosIcon,
	NodeJsIcon,
	PlusIcon,
	ReactIcon,
	ThreejsIcon,
	TypescriptIcon,
} from "./icon";
import { ThemeSwitch } from "./theme-switch";
import { Tooltip } from "./tooltip";
import { AnimateRotation } from "./animate-rotation";

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
				<div class="flex flex-row gap-4 items-center">
					<a
						class="hover:text-stone-300"
						href={"https://github.com/PHSix"}
						target={"_blank"}
					>
						/Github
					</a>
					<ThemeSwitch
						isDark={dark.value}
						onSwitch={(isDark) => {
							dark.value = isDark;
						}}
					/>
				</div>
			</header>
			<div
				class={
					"flex flex-col md:flex-row flex-nowrap gap-4 md:gap-8 items-center"
				}
			>
				<section class="text-center">
					<div class="w-[24em] h-[24em]">
						<AnimateRotation isDark={dark.value} />
					</div>
				</section>

				<div class="split-line min-h-full h-full w-[1px] bg-gray-600/10" />

				<section class="text-left p-4 md:p-0 space-y-2">
					<div>Hello, I'm Yi Chen, welcome to access my github site.</div>

					<div>I am a front-end developer based in WuHan China.</div>

					<div>I live in linux, programing and gaming.</div>
				</section>
			</div>

			<div class="title mt-[2em] mb-[1em] px-3 md:p-0">My Technology Stack</div>
			<div class="grid grid-cols-1 md:grid-cols-3 gap-4 px-4 md:p-0">
				<Card>
					<div class="flex flex-row items-center justify-between w-full">
						<div class="flex flex-row items-center gap-2">
							<NixosIcon class="h-[1.5em]" />
							Nixos
						</div>

						<Tooltip content={<div>My nix flake config.</div>}>
							<a href={"https://github.com/PHSix/nix-config"} target={"_blank"}>
								<GithubIcon class={"h-[1.5em]"} />
							</a>
						</Tooltip>
					</div>

					<div class="py-4">The best code edtior for every geek developer.</div>
				</Card>

				<Card>
					<div class="flex flex-row items-center w-full gap-2">
						<ReactIcon class="h-[1.5em]" />
						React
						<PlusIcon class={"h-[1.5em]"} />
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
								<PlusIcon class={"h-[1.5em]"} />
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

						<Tooltip content={<div>Do you want to visit my nvim config?</div>}>
							<a href={"https://github.com/PHSix/nvim"} target={"_blank"}>
								<GithubIcon class={"h-[1.5em]"} />
							</a>
						</Tooltip>
					</div>

					<div class="py-4">
						A based on nix, declarative and reproducible linux dstro.
					</div>
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

			<footer
				class={
					"mt-8 text-sm flex items-end justify-end text-stone-300 flex-col text-right space-y-1"
				}
			>
				<div>This site is built by preact.js.</div>
				<div>Deploy by Vercel.</div>
			</footer>
		</main>
	);
}
