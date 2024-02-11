import { LocationProvider, Router, Route, hydrate } from "preact-iso";
import ssr from "./utils/ssr";
import "./index.css";
import { FC, Suspense, lazy } from "preact/compat";

function lazyLoadPage<T extends FC>(loader: () => Promise<{ default: T } | T>) {
	const Element = lazy(loader);

	return () => (
		<Suspense fallback={"null"}>
			{/* @ts-ignore */}
			<Element />
		</Suspense>
	);
}

const Index = lazyLoadPage(() => import("~/pages/index/page"));
const Bundler = lazyLoadPage(() => import("~/pages/bundler/page"));
const Blog = lazyLoadPage(() => import("~/pages/blog/page"));
const BlogPage = lazyLoadPage(() => import("~/pages/blog/[:id]/page"));

interface AppProps {
	ssr: boolean;
	url: string;
	route: { url: string };
}

/**
 * this function will run in nodejs.
 */
const ssrLog = (props: unknown) => {
	if (
		Object.prototype.hasOwnProperty.call(props, "ssr") &&
		typeof window === "undefined"
	) {
		const _props = props as AppProps;
		console.log(`prerender, url: ${_props.url}, ssr state: ${_props.ssr}`);
	}
};

const App = (props: Partial<AppProps>) => {
	ssrLog(props);

	return (
		<LocationProvider>
			<Router>
				<Route path="/" component={Index} />
				<Route path="/bundler" component={Bundler} />
				<Route path="/blog" component={Blog} />
				<Route path="/blog/:id" component={BlogPage} />
			</Router>
		</LocationProvider>
	);
};

if (typeof window !== "undefined") {
	hydrate(<App />, document.body);
}

export async function prerender(data: any) {
	return await ssr(<App {...data} />, {});
}
