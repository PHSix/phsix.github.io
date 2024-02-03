import { PropsWithChildren } from "preact/compat";

export default function AnimateBackground(props: PropsWithChildren<{}>) {
	return (
		<>
			<canvas class="fixed top-0 left-0 w-screen h-screen"></canvas>

			{props.children}
		</>
	);
}
