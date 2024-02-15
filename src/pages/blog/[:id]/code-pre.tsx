import { PropsWithChildren } from "preact/compat";
import cx from "~/utils/cx";

export function CodePre(props: PropsWithChildren<{ className?: string }>) {
	if (
		typeof props.children === "object" &&
		"type" in props.children &&
		props.children["type"] === "code"
	) {
		const lang = props.children.props.className
			? props.children.props.className.replace("lang-", "")
			: "text";

		return (
			<div class="relative code-pre-wrapper">
				<pre className={cx(props.children.props.className)}>
					{props.children}
				</pre>
				<div className="absolute top-2 right-2 z-10 code-anchor duration-300 opacity-0 text-stone-400 select-none">
					{lang}
					{" | "}
					<span
						class="cursor-pointer hover:text-stone-500"
						onClick={() => {
							const code =
								typeof props.children === "string"
									? props.children
									: typeof props.children === "object" &&
									  "type" in props.children
									? props.children.props.children
									: void 0;

							if (!code) {
								return;
							}

							navigator.clipboard.writeText(code);
						}}
					>
						复制
					</span>
				</div>
			</div>
		);
	}

	return <pre {...props}></pre>;
}
