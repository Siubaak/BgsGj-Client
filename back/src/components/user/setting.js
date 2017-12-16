import React, { Component } from 'react'
import { Table, Form, Input } from 'antd'
import common from '../../common'
import Util from '../util'
import './user.less'

class Setting extends Component {
  state = {
    oPass: '',
    nPass: '',
    ncPass: '',
    name: '',
    phone: '',
    loading: false,
  }
  getFormItems = getFieldDecorator => [
    { key: 'opasswd', label: '原密码', type: 'lock' },
    { key: 'npasswd', label: '新密码', type: 'lock' },
    { key: 'ncpasswd', label: '确认密码', type: 'lock' },
  ].map(obj => 
    <Form.Item
      label={obj.label}
      labelCol={{span: 7}}
      wrapperCol={{span: 14}}
      key={`${obj.key}new`}
    >
      {
        getFieldDecorator(obj.key, {
          rules: [{ required: true, message: `请输入${obj.label}` }],
        })(<Input type={obj.type}/>)
      }
    </Form.Item>
  )
  componentDidMount() {
    common.handle(common.api.getUsers({ account: 'test' }), res => {
      const { name, phone } = res.body
      this.setState({ name, phone })
    }, this.setState.bind(this))
  }
  handleUpdate = (user, done) => common.handle(common.api.putUsers(user), done)
  render() {
    return (
      <div className='user'>
        <Table
          className='sett-table'
          pagination={false}
          showHeader={false}
          loading={this.state.loading}
          columns={[
            { title: '', key: 'index', dataIndex: 'index', width: 100 },
            { title: '', key: 'text', dataIndex: 'text' },
          ]}
          dataSource={[
            {
              key: 'ursettname',
              index: '主任',
              text: <Util.EditableCell value={this.state.name || '无'}
                // onCheck={name => 
                //   common.handle(common.api.putUsers({ _id: record._id, name }),
                //     () => record.name = name,
                //     this.setState.bind(this))}
              />,
            },
            {
              key: 'ursettphone',
              index: '手机',
              text: <Util.EditableCell value={this.state.phone || '无'}
                // onCheck={phone =>
                //   common.handle(common.api.putUsers({ _id: record._id, phone }),
                //     () => record.phone = phone,
                //     this.setState.bind(this))}
              />,
            },
            {
              key: 'ursettpassword',
              index: '更新信息',
              text: <Util.New
                btnText='更改密码'
                layout='vertical'
                onCreate={this.handleUpdate}
                getFormItems={this.getFormItems}
              />,
            },
          ]}
        />
      </div>
    )
  }
}

export default Setting