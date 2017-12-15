import { message } from 'antd'
export default (api, func, setState) => {
  if (typeof setState === 'function') setState({ loading: true })
  api.end((err, res) => {
    if (err || !res.ok) {
      try {
        const { msg } = res.body
        message.error(msg || '服务器错误')
      } catch (e) {
        message.error('服务器错误')
      }
    } else func(res)
    if (typeof setState === 'function') setState({ loading: false })
  })
}