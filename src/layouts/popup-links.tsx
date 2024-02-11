import cx from "~/utils/cx";

export function PopupLinks(props: { visiable: boolean }) {
	return (
		<div
			class={cx(
				{
					["hidden"]: !props.visiable,
				},
				"fixed top-[50%] left-[50%]"
			)}
		>
			<div></div>
		</div>
	);
}
