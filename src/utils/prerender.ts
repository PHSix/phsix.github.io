import { options, VNode } from "preact";
import renderToString from "preact-render-to-string";
import prepass from "preact-ssr-prepass";
import { getHead } from "../hooks/useHead";

const maxTries = 10;

export default async function prerender(vnode: VNode<any>) {
	const oldVnodeHook = options.vnode;
	let tries = 0;
	const links = new Set();
	options.vnode = (vnode: VNode<any>) => {
		oldVnodeHook(vnode);
		if (
			vnode.type === "a" &&
			vnode.props &&
			vnode.props.href &&
			(!vnode.props.target || vnode.props.target === "_self")
		) {
			links.add(vnode.props.href);
		}
	};

	const render = async () => {
		if (++tries > maxTries) return;

		try {
			await prepass(vnode);
			return renderToString(vnode);
		} catch (e) {
			if (e && e.then) return e.then(render);

			throw e;
		}
	};

	let html = await render();
	html += `<script type="isodata"></script>`;
	return { html, links, head: getHead() };
}
