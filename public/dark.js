(function () {
  const isDark = matchMedia('(prefers-color-scheme: dark)').matches
  if (isDark)
    document.documentElement.classList.add('dark')
})()
