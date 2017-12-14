import React, { Component } from 'react'
import common from '../../common'
import Util from '../util'
import { Form, Input, Icon } from 'antd'
import './note.less'

class Mgmt extends Component {
  state = {
    data: [],
    pagination: { size: 'small', pageSize: 10, current: 1 },
    loading: false,
  }
  columns = [
    { title: '标题', key: 'ntmgmttitle', dataIndex: 'title', render: text => text.substring(0, 4).length === text.length ? text : text.substring(0, 4) + '...' },
    { title: '内容', key: 'ntmgmtcontent', dataIndex: 'content', render: text => text.substring(0, 14).length === text.length ? text : text.substring(0, 14) + '...' },
    { title: '更新', key: 'ntmgmtupdated', dataIndex: 'updated', render: text => text.substring(0, 10) },
  ]
  getExDesc = record => (
    <div className='mgmt-edit'>
      <Util.EditableCell value={record.content || '无'} style={{flex: 1}}
        onCheck={content => 
          common.handle(common.api.putNotes({ _id: record._id, content }),
          () => record.content = content,
          this.setState.bind(this))}/>
      <Icon type='delete' className='delete'
        onClick={() => this.handleDelete(record)}/>
    </div>
  )
  getFormItems = getFieldDecorator => [
    { key: 'title', label: '标题', min: 1, max: 3 },
    { key: 'content', label: '内容', min: 5, max: 10 },
  ].map(obj => 
    <Form.Item
      label={obj.label}
      labelCol={{span: 5}}
      wrapperCol={{span: 16}}
      key={`${obj.key}new`}
    >
      {
        getFieldDecorator(obj.key, {
          rules: [{ required: true, message: `请输入${obj.label}` }],
        })(<Input.TextArea className='textarea' autosize={{ minRows: obj.min, maxRows: obj.max }}/>)
      }
    </Form.Item>
  )
  handleCreate = (note, done) => common.handle(common.api.postNotes(note), done)
  render() {
    return (
      <Util.List 
        state={this.state}
        setState={this.setState.bind(this)}
        columns={this.columns}
        api={common.api.getNotes}
        getExDesc={this.getExDesc}
        new={{btnText: '新建通知', onCreate: this.handleCreate, getFormItems: this.getFormItems}}
      />
    )
  }
}

export default Mgmt