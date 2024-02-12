import { Link, LinkProps } from "~/components/Link";
import cx from "~/utils/cx";

export function PopupLinks(props: {
	visiable: boolean;
	links?: LinkProps[];
	onClose?: VoidFunction;
}) {
	if (!props.links?.length) {
		return null;
	}

	return (
		<div
			class={cx(
				{
					["hidden"]: !props.visiable,
				},
				"fixed top-[35%] left-[50%] z-10"
			)}
		>
			<div
				class="fixed top-0 left-0 z-1 bg-stone-600/60 w-screen h-screen backdrop-blur-sm"
				onClick={props.onClose}
			/>
			<div class="translate-x-[-50%] translate-y-[-50%] p-6 bg-stone-100 dark:bg-stone-800 shadow-md rounded-md text-xl z-2 min-w-[50vw]">
				<div class="text-xs mb-4 italic font-bold">Links:</div>
				{props.links.map((link) => (
					<Link
						{...link}
						key={link.text}
						class="block text-sm my-2 p-3 hover:bg-stone-200 hover:text-stone-500 rounded-sm text-center dark:hover:bg-stone-700 dark:hover:text-stone-400 "
					/>
				))}
			</div>
		</div>
	);
}
