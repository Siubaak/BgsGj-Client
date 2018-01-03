import request from 'superagent'
import weui from 'weui.js'
const apiUrl = 'http://api.localhost'
const resources = {
  token: apiUrl + '/tokens',
  users: apiUrl + '/users',
  ausers: apiUrl + '/ausers',
  notes: apiUrl + '/notes',
  anotes: apiUrl + '/anotes',
  materials: apiUrl + '/materials',
  matbooks: apiUrl + '/matbooks',
  meetings: apiUrl + '/meetings',
  metbooks: apiUrl + '/metbooks'
}
const sendReq = (method, uri, params) => {
  let token
  try {
    token = 'Bearer ' + localStorage.getItem('yhbgsfont').replace(/(^\\")|(\\"$)/g, '')
  } catch (err) { console.error(err) }
  const req = request[method](uri)
    .set('Authorization', token)
  if (method === 'get') return req.query(params)
  else return req.send(params)
}

export default {
  // Token
  postTokens (params) { return sendReq('post', resources.token, params) },
  // 用户
  getUsers (params) { return sendReq('get', resources.users, params) },
  putUsers (params) { return sendReq('put', resources.users, params) },
  // 通知
  getNotes (params) { return sendReq('get', resources.notes, params) },
  // 物资
  getMaterials (params) { return sendReq('get', resources.materials, params) },
  // 物资申请
  getMatbooks (params) { return sendReq('get', resources.matbooks, params) },
  postMatbooks (params) { return sendReq('post', resources.matbooks, params) },
  putMatbooks (params) { return sendReq('put', resources.matbooks, params) },
  // 会议室
  getMeetings (params) { return sendReq('get', resources.meetings, params) },
  putMeetings (params) { return sendReq('put', resources.meetings, params) },
  // 会议室预约
  getMetbooks (params) { return sendReq('get', resources.metbooks, params) },
  postMetbooks (params) { return sendReq('post', resources.metbooks, params) },
  putMetbooks (params) { return sendReq('put', resources.metbooks, params) },
  // 通用处理
  handleApi (api, done, loadText) {
    let loading
    if (loadText) loading = weui.loading(loadText)
    api.end((err, res) => {
      if (err || !res.ok) {
        try {
          const { msg } = res.body
          weui.alert(msg || '服务器错误')
        } catch (e) {
          weui.alert('服务器错误')
        }
      } else done(res)
      if (loadText) loading.hide()
    })
  }
}
