const token = localStorage.getItem('yhbgsfont')
let state = {}
if (token) {
  try {
    const payload = JSON.parse(window.atob(token.split('.')[1]))
    if (payload.exp > Date.now() / 1000) state.user = payload
  } catch (err) { console.error(err) }
}

export default state
