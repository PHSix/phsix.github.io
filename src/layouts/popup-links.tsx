import { Signal } from "@preact/signals";
import Link, { LinkProps } from "~/components/Link";
import { Modal } from "~/components/modal";

export default function PopupLinks(props: {
	visible: Signal<boolean>;
	links?: LinkProps[];
	onClose?: VoidFunction;
}) {
	if (!props.links?.length) {
		return null;
	}

	return (
		<Modal visible={props.visible} onClose={props.onClose}>
			<div class="text-xs mb-4 italic font-bold">Links:</div>
			{props.links.map((link) => (
				<Link
					{...link}
					key={link.text}
					class="block text-sm my-2 p-3 hover:bg-stone-200 hover:text-stone-500 rounded-sm text-center dark:hover:bg-stone-700 dark:hover:text-stone-400 "
				/>
			))}
		</Modal>
	);
}
