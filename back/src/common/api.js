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
const getToken = () => {
  if (localStorage.getItem('yhbgsback')) {
    return 'Bearer ' + localStorage.getItem('yhbgsback').replace(/(^\\")|(\\"$)/g, '')
  }
}

export default {
  // Token
  postTokens(params) {
    return request.post(resources.token)
      .send(params)
  },
  // 用户
  getUsers(params) {
    return request.get(resources.ausers)
      .set('Authorization', getToken())
      .query(params)
  },
  postUsers(params) {
    return request.post(resources.users)
      .set('Authorization', getToken())
      .send(params)
  },
  putUsers(params) {
    return request.put(resources.users)
      .set('Authorization', getToken())
      .send(params)
  },
  delUsers(params) {
    return request.del(resources.users)
      .set('Authorization', getToken())
      .send(params)
  },
  // 通知
  getNotes(params) {
    return request.get(resources.anotes)
      .set('Authorization', getToken())
      .query(params)
  },
  postNotes(params) {
    return request.post(resources.notes)
      .set('Authorization', getToken())
      .send(params)
  },
  putNotes(params) {
    return request.put(resources.notes)
      .set('Authorization', getToken())
      .send(params)
  },
  delNotes(params) {
    return request.del(resources.notes)
      .set('Authorization', getToken())
      .send(params)
  },
  // 物资
  getMaterials(params) {
    return request.get(resources.materials)
      .set('Authorization', getToken())
      .query(params)
  },
  postMaterials(params) {
    return request.post(resources.materials)
      .set('Authorization', getToken())
      .send(params)
  },
  putMaterials(params) {
    return request.put(resources.materials)
      .set('Authorization', getToken())
      .send(params)
  },
  delMaterials(params) {
    return request.del(resources.materials)
      .set('Authorization', getToken())
      .send(params)
  },
  // 物资申请
  getMatbooks(params) {
    return request.get(resources.matbooks)
      .set('Authorization', getToken())
      .query(params)
  },
  putMatbooks(params) {
    return request.put(resources.matbooks)
      .set('Authorization', getToken())
      .send(params)
  },
  // 会议室
  getMeetings() {
    return request.get(resources.meetings)
      .set('Authorization', getToken())
  },
  putMeetings(params) {
    return request.put(resources.meetings)
      .set('Authorization', getToken())
      .send(params)
  },
  // 会议室预约
  getMetbooks(params) {
    return request.get(resources.metbooks)
      .set('Authorization', getToken())
      .query(params)
  },
  putMetbooks(params) {
    return request.put(resources.metbooks)
      .set('Authorization', getToken())
      .send(params)
  },
}
