import React, { Component } from 'react'
import { Table, Form, Input } from 'antd'
import common from '../../common'
import Util from '../util'
import './user.less'

class Setting extends Component {
  state = {
    oPasswd: '',
    nPasswd: '',
    ncPasswd: '',
    proj: '',
    loading: false,
  }
  getFormItems = getFieldDecorator => [
    { key: 'opasswd', label: '原密码', type: 'text' },
    { key: 'npasswd', label: '新密码', type: 'text' },
    { key: 'ncpasswd', label: '确认密码', type: 'text' },
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
  componentDidMount() {}
  handleUpdate = (user, done) => common.handle(common.api.putUsers(user), done)
  render() {
    return (
      <Table
        pagination={false}
        showHeader={false}
        className='table'
        loading={this.state.loading}
        columns={[
          { title: '', key: 'index', dataIndex: 'index', width: 100 },
          { title: '', key: 'text', dataIndex: 'text' },
        ]}
        dataSource={[
          {
            key: 'ursettrename',
            index: '负责人',
            text: <Util.EditableCell value={'曾颖' || '无'}
              onCheck={value => 
                common.handle(common.api.putUsers({ }),
                () => {},
                this.setState.bind(this)
            )}/>,
          },
          {
            key: 'ursettrephone',
            index: '联系方式',
            text: <Util.EditableCell value={'13578947384' || '无'}
              onCheck={value => 
                common.handle(common.api.putUsers({ }),
                () => {},
                this.setState.bind(this)
            )}/>,
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
    )
  }
}

export default Setting