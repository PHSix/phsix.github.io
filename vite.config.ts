import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
// @ts-ignore
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		preact({
			prerender: {
				enabled: true,
				additionalPrerenderRoutes: ["/bundler"],
			},
		}),
	],
	server: {
		port: 3000,
	},
	build: {
		rollupOptions: {
			external: ["three"],
			output: {
				paths: {
					three: "https://unpkg.com/three@0.161.0/build/three.module.js",
					// three: "https://unpkg.com/browse/three@0.161.0/build/three.cjs",
				},
			},
		},
	},
	resolve: {
		alias: {
			// @ts-ignore
			"~": resolve(__dirname, "src"),
		},
	},
});
