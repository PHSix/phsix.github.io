/**
 * a mini implemention of `classname`
 */
function cx(...args: (string | Record<string, boolean> | undefined | null)[]) {
  const temp: string[] = []

  for (const arg of args) {
    if (typeof arg === 'string') {
      temp.push(arg)
    } else if (arg !== null && arg !== undefined) {
      for (const key in arg) {
        if (arg[key])
          temp.push(key)
      }
    }
  }

  return temp.join(' ')
}

export default cx
