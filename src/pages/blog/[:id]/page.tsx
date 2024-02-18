import { useLocation, useRoute } from "preact-iso";
import { FC, PropsWithChildren, Suspense } from "preact/compat";
import { useEffect, useMemo } from "preact/hooks";
import dayjs from "dayjs";
import Markdown from "markdown-to-jsx";
import blogs from "#blogs";
import DefaultLayout from "~/layouts/default-layout";
import fetchWrap from "~/utils/fetchWrap";
import useDark from "~/hooks/useDark";
import useTitle from "~/hooks/useTitle";
import InternalImg from "./img";
import CodePre from "./code-pre";
import "./style.scss";

const fetchers: Record<string, () => { id: string; content: string }> = {};

// inited all fetchers, but not request at first time.
for (const b of blogs) {
	fetchers[b.id] = fetchWrap(`/blogs/${b.id}.json`, {
		callback: (r) => r.json(),
	});
}

function FetchWrapper(Element: FC) {
	return () => (
		<Suspense fallback={null}>
			<Element />
		</Suspense>
	);
}

function BlogPageImpl() {
	const route = useRoute();
	const location = useLocation();
	const dark = useDark();
	const id = useMemo(() => {
		try {
			return route.params.id ?? "";
		} catch {
			return "";
		}
	}, [route.params]);

	const data = useMemo(() => fetchers[id]?.(), []);
	const blog = useMemo(() => blogs.find((b) => b.id === id), []);
	useTitle(blog.attributes.title);
	// JSX.IntrinsicElements

	const markdown = useMemo(
		() => (
			<Markdown
				options={{
					wrapper: (props: PropsWithChildren) => (
						<div class="blog-page-content">{props.children}</div>
					),
					overrides: {
						img: {
							component: InternalImg,
						},
						pre: {
							component: CodePre,
						},
					},
				}}
			>
				{data.content}
			</Markdown>
		),
		[]
	);

	useEffect(() => {
		if (typeof window !== "undefined") {
			import("prismjs");
			import("prismjs/themes/prism.css");
		}
	}, []);

	return (
		<DefaultLayout
			title="PH's Blog"
			onTitleClick={() => {
				location.route("/blog");
			}}
			links={[
				{
					url: "/",
					text: "/index",
				},

				{
					url: "/blog",
					text: "/blog",
				},
			]}
		>
			<div
				class="h-56 mb-8 md:mb-16 flex flex-row items-end justify-between blog-page-banner"
				style={{
					backgroundImage: `url(${
						dark.value ? "/images/default-dark.png" : "/images/default.png"
					})`,
				}}
			>
				<div class="text-2xl">{blog.attributes.title}</div>
				<div class="opacity-80">
					{dayjs(blog.attributes["create-time"]).format("YYYY年MM月DD日")}
				</div>
			</div>
			{markdown}
		</DefaultLayout>
	);
}

const BlogPage = FetchWrapper(BlogPageImpl);

export default BlogPage;
