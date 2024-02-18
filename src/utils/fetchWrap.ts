enum FetchStatus {
	pending,
	error,
	success,
}

/**
 * wrap fetch api for suspense support.
 */
export default function fetchWrap<R = Response>(
	url: string,
	opts?: {
		init?: RequestInit;
		callback?: (r: Response) => R;
	}
): () => Awaited<R> {
	let status = FetchStatus.pending;
	let response: any;
	let promise: Promise<void>;

	return () => {
		if (!response && !promise) {
			status = FetchStatus.pending;

			promise = fetch(url, opts.init)
				.then(async (res) => {
					status = FetchStatus.success;
					response = opts?.callback ? await opts.callback(res) : res;
				})
				.catch((err) => {
					status = FetchStatus.error;
					response = err;
				});
		}

		switch (status) {
			case FetchStatus.pending:
				throw promise;
			case FetchStatus.success:
				return response;
			default:
				throw response ?? new Error("unexpected error");
		}
	};
}
