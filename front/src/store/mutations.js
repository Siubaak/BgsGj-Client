export default {
  USER_LOGIN (state, token) {
    try {
      const payload = JSON.parse(window.atob(token.split('.')[1]))
      if (payload.exp > Date.now() / 1000) {
        localStorage.setItem('yhbgsfont', token)
        state.user = payload
      }
    } catch (err) { console.error(err) }
  },
  USER_LOGOUT (state) {
    localStorage.removeItem('yhbgsfont')
    state.user = {}
  }
}
