import {
	LocationProvider,
	Router,
	Route,
	hydrate,
	prerender as ssr,
} from "preact-iso";
import "./index.css";
import Index from "./pages/index/page";
import Bundler from "./pages/bundler/page";
import { initTHREE } from "./lib/three";

interface AppProps {
	ssr: boolean;
	url: string;
	route: { url: string };
}

const ssrLog = (props: unknown) => {
	if (
		Object.prototype.hasOwnProperty.call(props, "ssr") &&
		typeof window === "undefined"
	) {
		const _props = props as AppProps;
		console.log(`prerender, url: ${_props.url}, ssr state: ${_props.ssr}`);
	}
};

const App = (props: AppProps | {}) => {
	ssrLog(props);

	return (
		<LocationProvider>
			<Router>
				<Route path="/" component={Index} />
				<Route path="/bundler" component={Bundler} />
			</Router>
		</LocationProvider>
	);
};

if (typeof window !== "undefined") {
	import("three").then((THREE) => {
		initTHREE(THREE);
		hydrate(<App />, document.getElementById("app"));
	});
}

export async function prerender(data: any) {
	return await ssr(<App {...data} />);
}
