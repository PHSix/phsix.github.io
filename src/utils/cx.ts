/**
 * a mini implemention of `classname`
 */
function cx(...args: (string | Record<string, boolean> | undefined | null)[]) {
  let result = ''

  for (const arg of args) {
    if (typeof arg === 'string') {
      result += `${arg} `
    } else if (arg !== null && arg !== undefined) {
      for (const key in arg) {
        if (arg[key])
          result += `${key} `
      }
    }
  }

  return result
}

export default cx
