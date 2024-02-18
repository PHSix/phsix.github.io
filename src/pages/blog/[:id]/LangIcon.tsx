import { lazy } from "preact-iso";
import { Suspense } from "preact/compat";

const GithubLangToIcon = lazy(() =>
	import("@altenull/github-lang-to-icon").then((res) => res.GithubLangToIcon)
);

export default function LangIcon(props: { lang: string; size?: number }) {
	return (
		<Suspense fallback={null}>
			<GithubLangToIcon lang={props.lang as any} size={props.size} />
		</Suspense>
	);
}
