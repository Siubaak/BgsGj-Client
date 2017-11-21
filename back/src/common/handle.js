import { message } from 'antd'
export default (api, func, setState) => {
  if (typeof setState === 'function') setState({ loading: true })
  api.end((err, res) => {
    if (err) {
      message.error('服务器错误')
    } else if (!res.ok) {
      const { msg } = JSON.parse(res.text)
      message.error(msg)
    } else func(res)
    if (typeof setState === 'function') setState({ loading: false })
  })
}