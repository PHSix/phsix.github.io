import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import { resolve } from "path";
import { markdown } from "./src/plugins/markdown";
// import { visualizer } from "rollup-plugin-visualizer";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		markdown(),
		preact({
			prerender: {
				enabled: true,
				additionalPrerenderRoutes: ["/blog"],
			},
		}),

		// visualizer({
		// 	gzipSize: true,
		// 	brotliSize: true,
		// 	emitFile: false,
		// 	filename: "visualizer.html", //分析图生成的文件名
		// 	open: true, //如果存在本地服务端口，将在打包后自动展示
		// }),
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
