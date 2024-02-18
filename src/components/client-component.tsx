import { Suspense, lazy, useState, FC } from "preact/compat";

/**
 * promise your component only run on client side, no auto execute and import lib in prerender(ssg) runtime.
 * implement with code split
 */
export default function ClientComponent<P extends object = {}>(props: {
	component: () => Promise<{ default: FC<P> } | FC<P>>;
	componentProps: P;
}) {
	const [Component] = useState(() =>
		typeof window !== "undefined" ? lazy(props.component) : null
	);

	if (typeof window !== "undefined") {
		return (
			<Suspense fallback={null}>
				<Component {...props.componentProps} />
			</Suspense>
		);
	}

	return null;
}
