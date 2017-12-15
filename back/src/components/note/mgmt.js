import React, { Component } from 'react'
import common from '../../common'
import Util from '../util'
import { Form, Input, Icon, Switch, Modal } from 'antd'
import './note.less'

class Mgmt extends Component {
  state = {
    data: [],
    pagination: { size: 'small', pageSize: 10, current: 1 },
    loading: false,
  }
  columns = [
    { title: '标题', key: 'ntmgmttitle', dataIndex: 'title', render: text => text.substring(0, 25).length === text.length ? text : text.substring(0, 25) + '...' },
    { title: '更新', key: 'ntmgmtupdated', dataIndex: 'updated', render: text => text.substring(0, 10) },
  ]
  getExData = record => {
    const exData = [
      { key: 'title', index: '标题' },
      { key: 'content', index: '内容' },
    ].map(obj => {
      return {
        key: `${record._id}${obj.key}`,
        index: obj.index,
        text: <Util.EditableCell textArea value={record[obj.key] || '无'}
          onCheck={value => 
            common.handle(common.api.putMaterials({ _id: record._id, [obj.key]: value }),
              () => record[obj.key] = value,
              this.setState.bind(this))}
        />,
      }
    })
    exData.push({
      key: `${record._id}enable`, index: '显示',
      text: <div className='mgmt-opts'>
        <Switch checked={record.enable} size='small'
          onChange={checked =>
            common.handle(common.api.putNotes({ _id: record._id, enable: checked }),
            () => record.enable = checked,
            this.setState.bind(this)
        )}/>
        <Icon type='delete' className='delete'
          onClick={() => this.handleDelete(record)}/>
      </div>,
    })
    return exData
  }
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
        })(<Input.TextArea style={{ resize: 'none' }} autosize={{ minRows: obj.min, maxRows: obj.max }}/>)
      }
    </Form.Item>
  )
  handleCreate = (note, done) => common.handle(common.api.postNotes(note), done)
  handleDelete = record => {
    Modal.confirm({
      title: `确定删除${record.title.substring(0, 10).length === record.title.length ? record.title : record.title.substring(0, 10) + '...'}？`,
      content: `更新时间为${record.updated.substring(0, 10)}，目前${record.enable ? '显示' : '不显示'}。`,
      okText: '删除',
      okType: 'danger',
      cancelText: '取消',
      onOk: () => 
        common.handle(common.api.delNotes({ _id: record._id }), () => {
          const { pagination } = this.state
          common.handle(common.api.getNotes({
            skip: pagination.pageSize * (pagination.current - 1),
            limit: pagination.pageSize,
          }), res => {
            const { total, list } = res.body
            const pager = { ...pagination }
            pager.total = total
            this.setState({
              data: list,
              pagination: pager,
            })
          }, this.setState.bind(this))
        }, this.setState.bind(this))
      },
    );
  }
  render() {
    return (
      <div className='note'>
        <Util.List
          state={this.state}
          setState={this.setState.bind(this)}
          columns={this.columns}
          api={common.api.getNotes}
          getExData={this.getExData}
          new={{btnText: '新建通知', onCreate: this.handleCreate, getFormItems: this.getFormItems}}
        />
      </div>
    )
  }
}

export default Mgmt