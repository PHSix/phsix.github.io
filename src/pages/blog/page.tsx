import { useMemo } from "preact/hooks";
import dayjs from "dayjs";
import DefaultLayout from "~/layouts/default-layout";
import blogs, { Blog as BlogType } from "#blogs";
import useDark from "~/hooks/useDark";
import useTitle from "~/hooks/useTitle";
import useHead from "~/hooks/useHead";

interface LocalBlogType extends BlogType {
	date: string;
}

export default function Blog() {
	useHead({
		title: "PH's Blog",
	});
	const dark = useDark();
	const blogsMap = useMemo(() => {
		const ret: Record<string, LocalBlogType[]> = {};
		for (const blog of blogs) {
			const day = dayjs(blog.attributes["create-time"]);

			if (!ret[day.year()]) {
				ret[day.year()] = [{ ...blog, date: day.format("YYYY年MM月DD日") }];
			} else {
				ret[day.year()].push({
					...blog,
					date: day.format("YYYY年MM月DD日"),
				});
			}
		}

		return ret;
	}, []);

	useTitle("PH's Blog");

	return (
		<DefaultLayout
			title="PH's Blog"
			links={[
				{
					url: "/",
					text: "/index",
				},
			]}
		>
			<div
				class="h-56 bg-cover bg-center rounded-xl"
				style={{
					backgroundImage: `url(${
						dark.value ? "/images/default-dark.png" : "/images/default.png"
					})`,
				}}
			></div>
			<div class="px-8 my-4">
				{Object.entries(blogsMap).map(([timeline, blogs]) => (
					<div key={timeline}>
						<div class="text-2xl mb-4">{timeline}</div>

						<div class="flex flex-col gap-3 pl-2">
							{blogs.map((b) => (
								<a
									key={b.id}
									class="flex justify-between flex-row hover:text-gray-400 duration-300"
									href={`/blog/${b.id}`}
								>
									<div>
										<div>{b.attributes.title}</div>
									</div>

									<div>{b.date}</div>
								</a>
							))}
						</div>
					</div>
				))}
			</div>
		</DefaultLayout>
	);
}
