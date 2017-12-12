import request from 'superagent'
const apiUrl = '/api'
const resources = {
  token: apiUrl + '/tokens',
  users: apiUrl + '/users',
  notes: apiUrl + '/notes',
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
  postTokens(params) {
    return request.post(resources.token)
      .send(params)
  },

  getUsers(params) {
    return request.get(resources.users)
      .set('Authorization', getToken())
      .query(params)
  },

  getNotes(params) {
    return request.get(resources.notes)
      .set('Authorization', getToken())
      .query(params)
  },
  putNotes(params) {
    return request.get(resources.notes)
      .set('Authorization', getToken())
      .send(params)
  },
  
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

  getMeetings() {
    return request.get(resources.meetings)
      .set('Authorization', getToken())
  },
  putMeetings(params) {
    return request.put(resources.meetings)
      .set('Authorization', getToken())
      .send(params)
  },
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
