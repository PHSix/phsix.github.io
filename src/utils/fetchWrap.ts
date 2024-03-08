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
    init?: RequestInit
    immediate?: boolean
    callback?: (r: Response) => R
  },
): () => Awaited<R> {
  let status = FetchStatus.pending
  let response: any
  let promise: Promise<void>

  function startRequest() {
    status = FetchStatus.pending

    promise = fetch(url, opts.init)
      .then(async (res) => {
        status = FetchStatus.success
        response = opts?.callback ? await opts.callback(res) : res
      })
      .catch((err) => {
        status = FetchStatus.error
        response = err
      })
  }

  if (opts.immediate)
    startRequest()

  return () => {
    if (!response && !promise)
      startRequest()

    switch (status) {
      case FetchStatus.pending:
        throw promise
      case FetchStatus.success:
        return response
      default:
        throw response ?? new Error('unexpected error')
    }
  }
}
