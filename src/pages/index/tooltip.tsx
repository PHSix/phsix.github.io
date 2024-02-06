import { PropsWithChildren, ReactNode } from "preact/compat";

export function Tooltip(
	props: PropsWithChildren<{ content: ReactNode; className?: string }>
) {
	return (
		<div class={`relative ${props.className || ""} tooltip`}>
			<div class={"absolute bottom-[100%] left-[50%] tooltip-child"}>
				<div
					class={
						"translate-x-[-50%] rounded-md bg-gray-200 dark:bg-gray-800 py-2 px-3 text-nowrap"
					}
				>
					{props.content}
				</div>
			</div>
			{props.children}
		</div>
	);
}
