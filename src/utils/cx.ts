/**
 * a mini implemention of `classname`
 */
function cx(...args: (string | Record<string, boolean>)[]) {
	let result = "";

	for (const arg of args) {
		if (typeof arg === "string") {
			result += arg + " ";
		} else {
			for (const key in arg) {
				if (arg[key]) {
					result += key + " ";
				}
			}
		}
	}

	return result;
}

export default cx;
