import request from 'superagent'
const apiUrl = '/api'

export default {
  postToken(params) {
    console.log(params)
    return request.post(apiUrl + '/tokens')
      .send(params)
      .set('Accept', 'application/json')
  }
}
