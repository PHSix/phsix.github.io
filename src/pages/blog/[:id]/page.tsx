import blogs from "#blogs";
import { useLocation, useRoute } from "preact-iso";
import { FC, Suspense } from "preact/compat";
import { useEffect, useMemo, useRef } from "preact/hooks";
import { DefaultLayout } from "~/layouts/default-layout";
import { fetchWrap } from "~/utils/fetchWrap";
import "./style.scss";
import dayjs from "dayjs";
import { promises } from "dns";
import useDark from "~/hooks/useDark";
import { useSignalEffect } from "@preact/signals";
import { LinearFilter } from "three";

const fetchers: Record<string, () => { id: string; html: string }> = {};

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
	const linkRef = useRef<HTMLLinkElement>();

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
			<div class="h-56 mb-8 md:mb-16 flex flex-row items-end justify-between blog-page-banner dark:text-stone-700">
				<div class="text-2xl">{blog.attributes.title}</div>
				<div class="opacity-80">
					{dayjs(blog.attributes["create-time"]).format("YYYY年MM月DD日")}
				</div>
			</div>
			<div
				class="blog-page-content"
				dangerouslySetInnerHTML={{ __html: data.html }}
			></div>
		</DefaultLayout>
	);
}

const BlogPage = FetchWrapper(BlogPageImpl);

export default BlogPage;
