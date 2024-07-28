(() => {
  let isDark = sessionStorage.getItem('is-dark')
  if (isDark === null) {
    isDark = matchMedia('(prefers-color-scheme: dark)').matches
    if (isDark)
      document.documentElement.classList.add('dark')
  } else {
    if (isDark === 'true')
      document.documentElement.classList.add('dark')
  }
})()
