import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import { resolve } from "path";
import { markdown } from "./src/plugins/markdown";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		markdown(),
		preact({
			prerender: {
				enabled: true,
				additionalPrerenderRoutes: ["/bundler", "/blog"],
			},
		}),
	],
	server: {
		port: 3000,
	},
	build: {
		rollupOptions: {
			external: ["three", "prism"],
			output: {
				paths: {
					three: "https://unpkg.com/three@0.161.0/build/three.module.js",
					prismjs:
						"https://cdnjs.cloudflare.com/ajax/libs/prism/9000.0.1/prism.min.js",
				},
			},
		},
	},
	resolve: {
		alias: {
			"~": resolve(__dirname, "src"),
		},
	},
});
