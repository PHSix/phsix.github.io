import {
	Fragment,
	PropsWithChildren,
	ReactNode,
	useState,
} from "preact/compat";
import { Button } from "~/components/button";
import cx from "~/utils/cx";

export function Tooltip(
	props: PropsWithChildren<{
		content: ReactNode;
		className?: string;
		url: string;
	}>
) {
	const [visible, setVisible] = useState(false);
	const [delayVisible, setDelayVisible] = useState(visible);

	function closeModal() {
		setVisible(false);
		setTimeout(() => {
			setDelayVisible(false);
		}, 200);
	}

	function openUrl() {
		closeModal();
		window.open(props.url, "_blank");
	}

	function openModal() {
		setVisible(true);
		setTimeout(() => {
			setDelayVisible(true);
		}, 200);
	}

	return (
		<Fragment>
			<div class="cursor-pointer" onClick={openModal}>
				{props.children}
			</div>

			{(delayVisible || visible) && (
				<>
					<div
						class="fixed top-0 left-0 h-screen w-screen bg-stone-700/60 backdrop-blur-sm"
						onClick={closeModal}
					/>
					<div class="fixed top-[40%] left-[50%]">
						<div
							class={cx(
								"translate-x-[-50%] translate-y-[-50%] bg-stone-100 dark:bg-stone-800 shadow-xl p-4 rounded-md w-[70vw] md:w-[50vw] text-sm duration-300 scale-0 transform",
								{
									["scale-100"]: visible && delayVisible,
								}
							)}
						>
							<div>{props.content}</div>
							<div class="flex gap-4 justify-end mt-8">
								<Button primary onClick={openUrl}>
									Yes
								</Button>
								<Button onClick={closeModal}>No</Button>
							</div>
						</div>
					</div>
				</>
			)}
		</Fragment>
	);
}
