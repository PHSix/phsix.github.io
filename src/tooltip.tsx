import { PropsWithChildren, ReactNode, useState } from "preact/compat";

export function Tooltip(
	props: PropsWithChildren<{ content: ReactNode; className?: string }>
) {
	const [isShow, setShow] = useState(false);

	return (
		<div
			class={`relative ${props.className || ""}`}
			onMouseEnter={() => setShow(true)}
			onMouseLeave={() => setShow(false)}
		>
			{isShow && (
				<div class={"absolute bottom-[100%] left-[50%] "}>
					<div
						class={
							"translate-x-[-50%] rounded-md bg-neutral-100 py-2 px-3 text-nowrap"
						}
					>
						{props.content}
					</div>
				</div>
			)}
			{props.children}
		</div>
	);
}
