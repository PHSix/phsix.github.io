import {
	LocationProvider,
	Router,
	Route,
	lazy,
	hydrate,
	prerender as ssr,
} from "preact-iso";
import "./index.css";

const App = () => {
	return (
		<LocationProvider>
			<Router>
				<Route default component={lazy(() => import("~/pages/index/page"))} />
				<Route
					path="bundler"
					component={lazy(() => import("~/pages/bundler/page"))}
				/>
			</Router>
		</LocationProvider>
	);
};

if (typeof window !== "undefined") {
	hydrate(<App />, document.getElementById("app"));
}

export async function prerender(data: any) {
	return await ssr(<App {...data} />);
}
