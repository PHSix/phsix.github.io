import * as THREE from "three";

let three: typeof THREE;

export function initTHREE(t: typeof THREE) {
	three = t;
}

export function getTHREE() {
	return three;
}
