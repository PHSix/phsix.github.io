import { useSignal } from "@preact/signals";
import { Fragment, PropsWithChildren, ReactNode } from "preact/compat";
import Button from "~/components/button";
import { Modal } from "~/components/modal";

export default function Tooltip(
	props: PropsWithChildren<{
		content: ReactNode;
		className?: string;
		url: string;
	}>
) {
	const visible = useSignal(false);

	return (
		<Fragment>
			<div
				class="cursor-pointer"
				onClick={() => {
					visible.value = true;
				}}
			>
				{props.children}
			</div>

			<Modal
				visible={visible}
				onClose={() => {
					visible.value = false;
				}}
				className="w-[70vw] md:w-[50vw]"
			>
				<div>{props.content}</div>
				<div class="flex gap-4 justify-end mt-8">
					<Button
						primary
						onClick={() => {
							window.open(props.url, "_blank");
						}}
					>
						Yes
					</Button>
					<Button
						onClick={() => {
							visible.value = false;
						}}
					>
						No
					</Button>
				</div>
			</Modal>
		</Fragment>
	);
}
