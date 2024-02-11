export interface LinkProps {
	text?: string;
	url?: string;
	blank?: boolean;
	onClick?: VoidFunction;
}

/**
 * use for default layout link component
 */
export function Link(props: LinkProps) {
	return (
		<a
			class="hover:text-stone-300"
			href={props.url}
			target={props.blank ? "_blank" : void 0}
			onClick={props.blank ? void 0 : props.onClick}
		>
			{props.text}
		</a>
	);
}
