(function () {
  const item = localStorage.getItem('--site-theme')
  let value = false
  try {
    value = JSON.parse(item).value
  } catch {}
  value && document.documentElement.classList.add('dark')
})()
