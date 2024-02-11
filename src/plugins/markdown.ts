import { Plugin } from "vite";
import { resolve } from "path";
import { access, mkdir, writeFile, readdir, readFile } from "fs/promises";
import { marked } from "marked";
import yaml from "yaml";
import { BlogAttributes } from "#blogs";

const blogsFolder = resolve(process.cwd(), "blogs");
const cacheDir = resolve(process.cwd(), "node_modules/.markdown-cache/");
const blogListFile = resolve(cacheDir, "blog-list.json");
const blogReqUrlReg = /\/blogs\/.+\.json/g;

const getAttributesAndContent = async (str: string) => {
	const index = str.indexOf("\n---", 2);
	const attributes: BlogAttributes = {
		title: "",
		["create-time"]: "",
		tags: [],
	};

	Object.assign(attributes, yaml.parse(str.slice(3, index - 1)));

	const content = str.slice(index + 4);

	return {
		attributes,
		htm: await marked(content),
	};
};

const getBlogs = async () => {
	const blogFolder = resolve(process.cwd(), "blogs");
	const dir = await readdir(blogFolder);
	const htms: Record<string, string> = {};

	const files = dir.map(async (fileName) => {
		const filePath = resolve(blogFolder, fileName);
		const id = fileName.split(".").shift();

		const { attributes, htm } = await getAttributesAndContent(
			(await readFile(filePath)).toString()
		);

		htms[id] = htm;

		return {
			id,
			path: filePath,
			attributes,
		};
	});

	return {
		blogList: await Promise.all(files),
		htms,
	};
};

export function markdown(): Plugin {
	let blogs = getBlogs();
	let blogList = blogs.then((res) => res.blogList);
	let htms = blogs.then((res) => res.htms);

	function update() {
		blogs = getBlogs();
		blogList = blogs.then((res) => res.blogList);
		htms = blogs.then((res) => res.htms);
	}

	return {
		name: "markdown-plugin",
		enforce: "pre",
		async buildStart() {
			return blogs.then(async (res) => {
				const folder = resolve(process.cwd(), "public", "blogs");
				try {
					await mkdir(folder);
				} catch {}

				await Promise.all(
					Object.entries(res.htms).map(([id, html]) =>
						writeFile(
							resolve(folder, `${id}.json`),
							JSON.stringify({
								id,
								html,
							})
						)
					)
				);
			});
		},
		async resolveId(source) {
			try {
				await access(cacheDir);
			} catch {
				await mkdir(cacheDir, { recursive: true });
			}

			try {
				await access(blogListFile);
			} catch {
				await writeFile(blogListFile, JSON.stringify(await blogList));
			}

			if (source === "#blogs") {
				return blogListFile;
			}
		},
		configureServer(server) {
			server.watcher.add(blogsFolder);

			server.watcher.on("all", (_, path) => {
				if (path.match(/\/blogs\/.+\.md/g)) {
					update();
				}
			});

			server.middlewares.use(async (req, res, next) => {
				if (req.url.match(blogReqUrlReg)) {
					res.setHeader("Content-type", "application/json");
					const id = req.url.slice(7, req.url.length - 5);
					const htmsThen = await htms;
					if (htmsThen[id]) {
						res.write(
							JSON.stringify({
								id,
								html: htmsThen[id],
							})
						);
					} else {
						res.statusCode = 400;
						res.write("failed to get");
					}

					res.end();
					return;
				}

				next();
			});
		},
	};
}
