const enhancedSet = new WeakSet();

export function enhance(
	node: HTMLElement,
	opts: {
		onImageClick: VoidFunction;
	}
) {
	if (enhancedSet.has(node)) return;
	enhancedSet.add(node);

	// TODO: enhance code element, img click and so on
}
