import request from 'superagent'
const apiUrl = '/api'
const resources = {
  token: apiUrl + '/tokens',
  users: apiUrl + '/users',
  ausers: apiUrl + '/ausers',
  notes: apiUrl + '/notes',
  anotes: apiUrl + '/anotes',
  materials: apiUrl + '/materials',
  matbooks: apiUrl + '/matbooks',
  meetings: apiUrl + '/meetings',
  metbooks: apiUrl + '/metbooks',
}
const sendReq = (method, uri, params)=> {
  let token
  try {
    token = 'Bearer ' + localStorage.getItem('yhbgsback').replace(/(^\\")|(\\"$)/g, '')
  } catch (err) {
    token = undefined
  }
  return request[method](uri)
    .set('Authorization', token)
    .send(params)
}

export default {
  // Token
  postTokens(params) { return sendReq('post', resources.token, params) },
  // 用户
  getUsers(params) { return sendReq('get', resources.ausers, params) },
  postUsers(params) { return sendReq('post', resources.users, params) },
  putUsers(params) { return sendReq('put', resources.users, params) },
  delUsers(params) { return sendReq('del', resources.users, params) },
  // 通知
  getNotes(params) { return sendReq('get', resources.anotes, params) },
  postNotes(params) { return sendReq('post', resources.notes, params) },
  putNotes(params) { return sendReq('put', resources.notes, params) },
  delNotes(params) { return sendReq('del', resources.notes, params) },
  // 物资
  getMaterials(params) { return sendReq('get', resources.materials, params) },
  postMaterials(params) { return sendReq('post', resources.materials, params) },
  putMaterials(params) { return sendReq('put', resources.materials, params) },
  delMaterials(params) { return sendReq('del', resources.materials, params) },
  // 物资申请
  getMatbooks(params) { return sendReq('get', resources.matbooks, params) },
  putMatbooks(params) { return sendReq('put', resources.matbooks, params) },
  // 会议室
  getMeetings(params) { return sendReq('get', resources.meetings, params) },
  putMeetings(params) { return sendReq('put', resources.meetings, params) },
  // 会议室预约
  getMetbooks(params) { return sendReq('get', resources.metbooks, params) },
  putMetbooks(params) { return sendReq('put', resources.metbooks, params) },
}
