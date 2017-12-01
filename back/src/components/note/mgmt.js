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
    { title: '内容', key: 'ntmgmtcontent', dataIndex: 'content', render: text => text.substring(0, 10) + '...' },
  ]
  getExDesc = record => <Util.EditableCell value={record.content || '无'}
    onCheck={content => 
      common.handle(common.api.putNotes({ _id: record._id, content }),
      () => record.content = content,
      this.setState.bind(this)
    )}/>
  render() {
    return (
      <Util.List 
        state={this.state}
        setState={this.setState.bind(this)}
        columns={this.columns}
        api={common.api.getNotes}
        getExDesc={this.getExDesc}
      />
    )
  }
}

export default Mgmt