import { access, mkdir, readdir, stat, writeFile } from "fs/promises";
import { resolve } from "path";
import { Plugin } from "vite";

const cacheDir = resolve(process.cwd(), "node_modules", ".fs-router");
const fsRouterFile = resolve(cacheDir, "router.tsx");

type ScanedItem = {
	modulePath: string;
	routePath: string;
	componentName: string;
	lazy: boolean;
};

const defaultConfig = {
	lazy: true,
	disable: false,
};

const template = (routes: ScanedItem[]) => {
	return `import * as React from "preact";
import { LocationProvider, Router, Route, hydrate } from "preact-iso";
import { FC, Suspense, lazy } from "preact/compat";

${routes
	.filter((route) => route.lazy === false)
	.map((route) => `import ${route.componentName} from "${route.modulePath}"`)
	.join("\n")}

${routes
	.filter((route) => route.lazy === true)
	.map(
		(route) =>
			`const ${route.componentName} = lazyLoadPage(() => import("${route.modulePath}"))`
	)
	.join("\n")}

function lazyLoadPage<T extends FC>(loader: () => Promise<{ default: T } | T>) {
  const Element = lazy(loader);

  return () => (
    <Suspense fallback={null}>
      {/* @ts-ignore */}
      <Element />
    </Suspense>
  );
}

export default function FsRouter() {
  return (
    <LocationProvider>
      <Router>
        ${routes
					.map((route) => {
						return `<Route path="${route.routePath}" component={${route.componentName}} />`;
					})
					.join("\n        ")}
      </Router>
    </LocationProvider>
  )
}`;
};

const scanRoutes = async (
	dirPath: string,
	projectPath: string = "~/pages"
): Promise<ScanedItem[]> => {
	const files = await readdir(dirPath);
	const dirs: string[] = [];
	await Promise.all(
		files.map(async (f) => {
			const p = resolve(dirPath, f);
			const s = await stat(p);

			if (s.isDirectory()) {
				dirs.push(f);
			}
		})
	);

	const ret: ScanedItem[] = [];
	if (files.includes("page.tsx")) {
		const modulePath = projectPath + "/" + "page.tsx";
		// remove start `~/pages/`
		let routePath = modulePath.slice(7);
		let componentName = routePath;
		// remove end `page.tsx`
		routePath = routePath.slice(0, routePath.length - 8);
		// replace param args
		routePath = routePath.replace(/(\[|\])/g, "");
		// replace `index/`
		routePath = routePath.replace("index/", "");

		componentName = componentName
			.slice(0, componentName.length - 4)
			.replace(/(\/|\:|\[|\]|\-)\w?/g, (s) => {
				const a = s[1];

				if (!a || a.toUpperCase() === a) {
					return "";
				}
				return a.toUpperCase();
			});

		const config: typeof defaultConfig = JSON.parse(
			JSON.stringify(defaultConfig)
		);
		if (files.includes("page.config.js")) {
			const pageConfig = await import(
				`file://${resolve(dirPath, "page.config.js")}`
			).then((res) => res.default);
			Object.assign(defaultConfig, pageConfig);
		}

		if (!config.disable) {
			ret.push({
				modulePath,
				routePath: routePath,
				componentName,
				lazy: config.lazy,
			});
		}
	}

	// recursive scan directory under dirPath
	await Promise.all(
		dirs.map(async (f) => {
			return scanRoutes(resolve(dirPath, f), projectPath + "/" + f).then(
				(res) => {
					if (res.length !== 0) {
						ret.push(...res);
					}
				}
			);
		})
	);

	return ret;
};

export default function fsRouter(): Plugin {
	return {
		name: "vite:preact-fs-router-plugin",
		enforce: "pre",
		async resolveId(source) {
			if (source === "#router") {
				const routes = await scanRoutes(resolve(process.cwd(), "src", "pages"));
				try {
					await access(cacheDir);
				} catch {
					await mkdir(cacheDir, { recursive: true });
				}

				await writeFile(fsRouterFile, template(routes));

				return fsRouterFile;
			}
		},
	};
}
