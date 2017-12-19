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
          dispatch({ type: 'LOGIN', token })
          message.success('登录成功')
          setTimeout(() => window.location.replace('/'), 1000)
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
