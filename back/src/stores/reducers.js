import { localKey } from './config'

const token = localStorage.getItem(localKey)
let initState = {}
if (token) {
  try {
    const payload = JSON.parse(window.atob(token.split('.')[1]))
    if (payload.exp > Date.now() / 1000) initState = payload
  } catch (e) { console.log(e) }
}

export const auth = (state = initState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...action.payload }
    case 'LOGOUT':
      return {}
    default:
      return state
  }
}
