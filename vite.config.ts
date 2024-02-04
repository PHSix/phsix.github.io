import { defineConfig } from "vite";
import preact from "@preact/preset-vite";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [preact()],
	server: {
		port: 3000,
	},
	build: {
		rollupOptions: {
			external: ["three"],
			output: {
				paths: {
					three: "https://unpkg.com/three@<version>/build/three.module.js",
				},
			},
		},
	},
});
