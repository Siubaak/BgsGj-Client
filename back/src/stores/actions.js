import common from '../common'
import { localKey } from './config'
import { message } from 'antd'

export const login = (user, done) => {
  return dispatch => {
    const hide = message.loading('正在登录...', 0)
    common.api.postTokens(user).end((err, res) => {
      hide()
      setTimeout(() => {
        if (err || !res.ok) {
          try {
            const { msg } = res.body
            message.error(msg || '服务器错误')
          } catch (e) {
            message.error('服务器错误')
          }
        } else {
          const { token } = res.body
          localStorage.setItem(localKey, token)
          try {
            const payload = JSON.parse(window.atob(token.split('.')[1]))
            if (payload.level < 3) {
              message.error('用户不存在')
            } else {
              message.success('登录成功')
              dispatch({ type: 'LOGIN', payload })
            }
          } catch (e) {
            message.error('用户不存在')
          }
        }
      }, 600)
    })
  }
}
export const logout = () => {
  localStorage.removeItem(localKey)
  message.success('注销成功')
  return { type: 'LOGOUT' }
}
