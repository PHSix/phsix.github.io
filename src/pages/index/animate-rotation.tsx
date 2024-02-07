import { useEffect, useRef, useState } from "preact/hooks";
import { getTHREE } from "~/lib/three";

function AnimateRotation(props: { isDark?: boolean }) {
	const {
		Color,
		Group,
		Mesh,
		MeshBasicMaterial,
		Object3D,
		PerspectiveCamera,
		Scene,
		SphereGeometry,
		WebGLRenderer,
	} = getTHREE();

	const canvasRef = useRef<HTMLCanvasElement>(null);
	const [darkFg] = useState(() => new Color("#d1d5db"));
	const [fg] = useState(() => new Color("#44403c"));
	const [material] = useState(
		() =>
			new MeshBasicMaterial({
				color: props.isDark ? darkFg : fg,
				wireframe: true,
			})
	);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		Object3D.DEFAULT_MATRIX_AUTO_UPDATE = true;
		const scene = new Scene();

		const segment = 12;
		const fov = 35;
		const aspect = canvas.clientWidth / canvas.clientHeight;
		const near = 0.01;
		const far = 300;
		const camera = new PerspectiveCamera(fov, aspect, near, far);
		camera.position.set(0, 0, 90);

		const renderer = new WebGLRenderer({ canvas, alpha: true });
		// set transparent background
		renderer.setClearColor(0xffffff, 0);

		const geometry = new SphereGeometry(25, segment, segment);
		renderer.setPixelRatio(window.devicePixelRatio);

		const mesh = new Mesh(geometry, material);

		const group = new Group();
		group.add(mesh);
		group.rotateZ(-Math.PI / 5);

		scene.add(group);

		renderer.setSize(canvas.clientWidth, canvas.clientHeight);

		renderer.render(scene, camera);

		let angleY = 0;
		let dragging = false;

		function rotateY(offsetY: number) {
			angleY = (angleY + offsetY) % 360;
		}

		const y = createBezierY();

		const renderTimer: number = setInterval(() => {
			if (!dragging) {
				rotateY(0.5);
				y.next();
			}

			mesh.rotation.set(0, (angleY / 180) * Math.PI, 0);
			group.position.setY(y.value);
			renderer.render(scene, camera);
			// 60fps in a second
		}, 1000 / 60);

		canvas.addEventListener("mousedown", () => {
			dragging = true;
		});

		const onMouseMove = (ev: MouseEvent) => {
			if (dragging) {
				rotateY(ev.movementX % 3);
			}
		};

		window.addEventListener("mousemove", onMouseMove);

		const onMouseUp = () => {
			if (dragging) {
				dragging = false;
			}
		};

		window.addEventListener("mouseup", onMouseUp);

		return () => {
			renderer.dispose();

			clearInterval(renderTimer);

			window.removeEventListener("mousemove", onMouseMove);
			window.removeEventListener("mouseup", onMouseUp);
		};
	}, []);

	useEffect(() => {
		if (props.isDark) {
			material.color = darkFg;
		} else {
			material.color = fg;
		}
	}, [props.isDark]);

	return <canvas className={"w-full h-full"} ref={canvasRef} />;
}

/**
 * create a float bezier y
 */
function createBezierY() {
	let count = 0;

	return {
		get value() {
			return Math.sin((Math.PI * count) / 90);
		},
		next() {
			count += 0.3;
		},
	};
}

export default function (props: Parameters<typeof AnimateRotation>[0]) {
	if (typeof window !== "undefined") {
		return <AnimateRotation {...props} />;
	}

	return null;
}
