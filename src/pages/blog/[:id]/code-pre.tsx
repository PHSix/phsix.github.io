import { PropsWithChildren } from "preact/compat";
import { highlight, languages } from "prismjs";
import cx from "~/utils/cx";
import { GithubLangToIcon } from "@altenull/github-lang-to-icon";
import useDark from "~/hooks/useDark";
import message from "~/components/message";

export default function CodePre(
	props: PropsWithChildren<{ className?: string }>
) {
	const dark = useDark();

	if (
		typeof props.children === "object" &&
		"type" in props.children &&
		props.children["type"] === "code"
	) {
		const lang: string = props.children.props.className
			? props.children.props.className?.replace?.("lang-", "")
			: "text";

		const code: string = props.children.props.children;
		let content = code || "";
		if (lang in languages) {
			content = highlight(code, languages[lang], lang);
		}

		return (
			<div class="relative code-pre-wrapper">
				<pre
					className={cx(props.children.props.className, {
						darkModePre: dark.value,
					})}
				>
					<code
						class={props.children.props.className}
						dangerouslySetInnerHTML={{ __html: content }}
					></code>
				</pre>
				<div className="absolute top-2 right-2 z-10 code-anchor duration-300 opacity-100 md:opacity-0 text-stone-500 select-none flex gap-2 items-center">
					<GithubLangToIcon lang={lang as any} size={16} />
					<span>{lang}</span>
					<span>|</span>
					<span
						class="cursor-pointer hover:text-orange-500"
						onClick={() => {
							if (!code) {
								return;
							}

							navigator.clipboard.writeText(code);
							message.success("复制成功");
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
