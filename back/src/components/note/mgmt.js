import React, { Component } from 'react'
import common from '../../common'
import Util from '../util'
import './note.less'

class Mgmt extends Component {
  state = {
    data: [],
    pagination: { size: 'small', pageSize: 10 },
    loading: false,
  }
  columns = [
    { title: '标题', key: 'ntmgmttitle', dataIndex: 'title' },
    { title: '内容', key: 'ntmgmtcontent', dataIndex: 'content', render: text => text.substring(0,20) + '...' },
  ]
  render() {
    return (
      <Util.List 
        state={this.state}
        setState={this.setState.bind(this)}
        columns={this.columns}
        api={common.api.getNotes}
      />
    )
  }
}

export default Mgmt