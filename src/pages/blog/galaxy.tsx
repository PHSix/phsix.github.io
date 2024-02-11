import { useEffect, useRef } from "preact/hooks";
import {
	Group,
	Mesh,
	MeshBasicMaterial,
	Object3D,
	PerspectiveCamera,
	Scene,
	SphereGeometry,
	WebGLRenderer,
} from "three";

const segment = 20;
const offsetY = (1 / 720) * Math.PI;

export function createStar(opts: { rotateZ: number }) {
	const geometry = new SphereGeometry(10, segment, segment);
	const material = new MeshBasicMaterial({
		color: "#000000",
		wireframe: true,
	});
	const mesh = new Mesh(geometry, material);
	mesh.rotateZ(opts.rotateZ);

	const group = new Group();
	group.add(mesh);

	return {
		mesh,
		geometry,
		material,
		group,
		task() {
			mesh.rotateY(offsetY);
			mesh.matrixAutoUpdate = true;
		},
	};
}

/**
 * TODO:
 */
export default function Galaxy() {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const contextRef = useRef<{
		renderer: WebGLRenderer;
		camera: PerspectiveCamera;
		scene: Scene;
		taskQueue: VoidFunction[];
	}>();

	useEffect(() => {
		Object3D.DEFAULT_MATRIX_AUTO_UPDATE = true;
		const canvas = canvasRef.current;
		if (!canvas) return;

		const scene = new Scene();

		const fov = 30;
		const aspect = canvas.clientWidth / canvas.clientHeight;
		const near = 0.01;
		const far = 400;
		const camera = new PerspectiveCamera(fov, aspect, near, far);
		camera.position.set(0, 0, 200);

		const renderer = new WebGLRenderer({ canvas, alpha: true });
		// set transparent background
		renderer.setClearColor(0xffffff, 0);
		renderer.setPixelRatio(window.devicePixelRatio);
		renderer.setSize(canvas.clientWidth, canvas.clientHeight);
		renderer.render(scene, camera);

		contextRef.current = {
			camera,
			scene,
			renderer,
			taskQueue: [],
		};

		return () => {
			renderer.dispose();
		};
	}, []);

	useEffect(() => {
		if (!contextRef.current) return;
		const ctx = contextRef.current;

		const timer = setInterval(() => {
			for (const task of ctx.taskQueue) {
				task();
			}
			ctx.renderer.render(ctx.scene, ctx.camera);
		}, 1000 / 60);

		return () => {
			clearInterval(timer);
		};
	}, []);

	useEffect(() => {
		if (!contextRef.current) return;
		const ctx = contextRef.current;
		const s = createStar({
			// rotateZ: Math.PI / 5,
			rotateZ: 0,
		});

		ctx.taskQueue.push(s.task);
		ctx.scene.add(s.group);
	}, []);
	return <canvas class="h-full w-full" ref={canvasRef} />;
}
