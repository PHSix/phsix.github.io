import { useEffect, useRef, useState } from "preact/hooks";
import {
	Color,
	Group,
	Mesh,
	MeshBasicMaterial,
	Object3D,
	PerspectiveCamera,
	Scene,
	SphereGeometry,
	WebGLRenderer,
} from "three";

function createBezierY() {
	let count = 0;
	return {
		get value() {
			return Math.sin((Math.PI * count) / 90);
		},
		next() {
			count++;
		},
	};
}

export function AnimateRotation(props: {
	className?: string;
	isDark?: boolean;
}) {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const [material] = useState(
		() =>
			new MeshBasicMaterial({
				color: new Color("#44403c"),
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
		camera.position.set(0, 0, 100);

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
		let draging = false;

		function rotateY(offsetY: number) {
			angleY = (angleY + offsetY) % 360;
		}

		const y = createBezierY();

		const renderTimer: number = setInterval(() => {
			if (!draging) {
				rotateY(1);
				y.next();
			}

			mesh.rotation.set(0, (angleY / 180) * Math.PI, 0);
			group.position.setY(y.value);
			renderer.render(scene, camera);
			// 40 frames in a second
		}, 1000 / 40);

		canvas.addEventListener("mousedown", () => {
			draging = true;
		});

		const onMouseMove = (ev: MouseEvent) => {
			if (draging) {
				rotateY(ev.movementX % 3);
			}
		};

		window.addEventListener("mousemove", onMouseMove);

		const onMouseUp = () => {
			if (draging) {
				draging = false;
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
			material.color = new Color("#44403c");
		} else {
			material.color = new Color("#d1d5db");
		}
	}, [props.isDark]);

	return <canvas className={props.className} ref={canvasRef} />;
}
