import { useMemo } from "preact/hooks";
import dayjs from "dayjs";
import { DefaultLayout } from "~/layouts/default-layout";
import blogs, { Blog as BlogType } from "#blogs";
import { ClientComponent } from "~/components/client-component";
import { urlToStatic } from "~/components/image";

interface LocalBlogType extends BlogType {
	date: string;
}

export default function Blog() {
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
			{/* TODO: image holder*/}
			<div
				class="h-56 bg-cover bg-center rounded-xl"
				style={{
					backgroundImage: `url(${urlToStatic("/images/nixos-wallpaper.png")})`,
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
