import { PropsWithChildren } from "preact/compat";

export function Card(props: PropsWithChildren) {
	return (
		<div class="rounded-md p-4 h-full bg-stone-100 dark:bg-neutral-700">
			{props.children}
		</div>
	);
}
