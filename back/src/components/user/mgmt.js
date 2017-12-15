import React, { Component } from 'react'
import common from '../../common'
import Util from '../util'
import { Form, Input, Icon, Modal, Menu } from 'antd'
import './user.less'

class PassBoxFom extends Component {
  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <Form>
        {
          [
            { key: 'oPass', label: '密码', type: 'password', placeholder: '此全局管理员密码' },
            { key: 'cPass', label: '确认', type: 'password', placeholder: '确认全局管理员密码'  },
          ].map(obj =>
            <Form.Item
              label={obj.label}
              labelCol={{span: 5}}
              wrapperCol={{span: 16}}
              key={obj.key}
            >
              {
                getFieldDecorator(obj.key, {
                  rules: [{ required: true, message: `请输入${obj.label}` }],
                })(<Input type={obj.type} placeholder={obj.placeholder}/>)
              }
            </Form.Item>
          )
        }
      </Form>
    )
  }
}

const PassBox = Form.create()(PassBoxFom)

class Mgmt extends Component {
  state = {
    data: [],
    pagination: { size: 'small', pageSize: 10, current: 1 },
    loading: false,
    visible: false,
  }
  level = ['未审核用户', '研分会用户', '研会及研团委用户', '普通管理员', '全局管理员']
  columns = [
    { title: '账号', key: 'urmgmtaccount', dataIndex: 'account' },
    { title: '分类', key: 'urmgmtlevel', dataIndex: 'level', render: text => this.level[text] },
  ]
  getExData = record => {
    const exData = [
      { key: 'account', index: '账号', textArea: true },
      { key: 'level', index: '分类', dropDown: true,
        text: this.level,
        menu: this.level.map((d, i) => <Menu.Item key={i}>{d}</Menu.Item>)},
      { key: 'name', index: '部长', textArea: true },
      { key: 'phone', index: '手机', type: 'number'  },
    ].map(obj => {
      return {
        key: `${record._id}${obj.key}`,
        index: obj.index,
        text: <Util.EditableCell
          dropDown={obj.dropDown} textArea={obj.textArea}
          menu={obj.menu} text={obj.text} type={obj.type} value={record[obj.key] || '无'}
          onCheck={value => 
            common.handle(common.api.putUsers({ _id: record._id, [obj.key]: value }),
              () => record[obj.key] = value,
              this.setState.bind(this))}
        />
      }
    })
    if (record.level < 3) {
      exData.push({
        key: `${record._id}wallet`,
        index: '钱包',
        text: <Util.EditableCell value={`￥${record.wallet}` || '无'}
        onCheck={value => this.setState({ visible: true, user: { _id: record._id, wallet: value } })}/>
      })
    }
    exData.push({
      key: `${record._id}delete`, index: '删除',
      text: (
        <div className='mgmt-opts'>
          <div style={{flex: 1}}/>
          <Icon type='delete' className='delete'
            onClick={() => this.handleDelete(record)}/>
        </div>
      )
    })
    return exData
  }
  getFormItems = getFieldDecorator => [
    { key: 'account', label: '账号', type: 'text' },
    { key: 'password', label: '密码', type: 'test' },
    { key: 'wallet', label: '钱包', type: 'text' },
    { key: 'level', label: '分类', type: 'text' },
    { key: 'name', label: '部长', type: 'text' },
    { key: 'phone', label: '手机', type: 'number' },
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
        })(<Input type={obj.type}/>)
      }
    </Form.Item>
  )
  handleCreate = (note, done) => common.handle(common.api.postNotes(note), done)
  handleDelete = record => {
    common.handle(common.api.delUsers({ _id: record._id }), () => {
      const { pagination } = this.state
      common.handle(common.api.getUsers({
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
  }
  render() {
    return (
      <div className='user'>
        <Util.List 
          state={this.state}
          setState={this.setState.bind(this)}
          columns={this.columns}
          api={common.api.getUsers}
          getExData={this.getExData}
          new={{btnText: '新建用户', onCreate: this.handleCreate, getFormItems: this.getFormItems}}
        />
        <Modal
          okText='删除'
          title='请输入密码'
          onOk={this.handleDelete}
          onCancel={() => {
            this.form.resetFields()
            this.setState({ visible: false })
          }}
          visible={this.state.visible}
        >
          <PassBox
            ref={form => this.form = form}
            visible={this.state.visible}
          />
        </Modal>
      </div>
    )
  }
}

export default Mgmt