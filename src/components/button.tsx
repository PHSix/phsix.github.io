import { PropsWithChildren } from "preact/compat";
import cx from "~/utils/cx";

export function Button(
	props: PropsWithChildren<{
		primary?: boolean;
		class?: string;
		onClick?: VoidFunction;
	}>
) {
	return (
		<button
			class={cx(
				{
					["bg-blue-500 text-white"]: !!props.primary,
					["bg-white text-stone-800"]: !props.primary,
				},
				"px-3 py-1 rounded-md",
				props.class
			)}
			onClick={props.onClick}
		>
			{props.children}
		</button>
	);
}
