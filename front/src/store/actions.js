import api from '../api'
import router from '../router'
import weui from 'weui.js'
export default {
  login ({ commit }, user) {
    api.handleApi(api.postTokens(user), res => {
      weui.toast('登录成功', 1500)
      commit('USER_LOGIN', res.body.token)
      router.replace({ path: '/' })
    }, '登录中')
  },
  logout ({ commit }) {
    commit('USER_LOGOUT')
    router.push({ path: '/log' })
    weui.toast('注销成功', 1500)
  }
}
