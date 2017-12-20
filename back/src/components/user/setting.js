import React, { Component } from 'react'
import { Table, Form, Input, message, Icon } from 'antd'
import common from '../../common'
import { connect } from 'react-redux'
import Util from '../util'
import './user.less'

class Setting extends Component {
  state = {
    name: '',
    phone: '',
    loading: false,
  }
  getFormItems = getFieldDecorator => [
    { key: 'npasswd', label: '新密码' },
    { key: 'ncpasswd', label: '确认密码' },
  ].map(obj => 
    <Form.Item key={`${obj.key}new`}>
      {
        getFieldDecorator(obj.key, {
          rules: [{ required: true, message: `请输入${obj.label}` }],
        })(<Input type='password' prefix={<Icon type='lock' style={{fontSize: 13}}/>} placeholder={obj.label}/>)
      }
    </Form.Item>
  )
  componentDidMount() {
    common.handle(common.api.getUsers({ id: this.props.id }), res => {
      const { name, phone } = res.body
      this.setState({ name, phone })
    }, this.setState.bind(this))
  }
  handleUpdate = (user, done) => {
    if (user.npasswd === user.ncpasswd) {
      common.handle(common.api.putUsers({
        _id: this.props.id,
        password: user.npasswd,
      }), done)
    } else {
      message.error('两次密码输入不匹配')
      done()
    }
  }
  render() {
    return (
      <div className='user'>
        <Table
          className='sett-table'
          pagination={false}
          showHeader={false}
          loading={this.state.loading}
          columns={[
            { title: '', key: 'index', dataIndex: 'index', width: 150 },
            { title: '', key: 'text', dataIndex: 'text' },
          ]}
          dataSource={[
            {
              key: 'ursettname',
              index: '办公室主任',
              text: <Util.EditableCell value={this.state.name}
                onCheck={name =>
                  common.handle(common.api.putUsers({ _id: this.props.id, name }),
                    () => this.setState({ name }),
                    this.setState.bind(this))}
              />,
            },
            {
              key: 'ursettphone',
              index: '联系方式',
              text: <Util.EditableCell value={this.state.phone}
                onCheck={phone =>
                  common.handle(common.api.putUsers({ _id: this.props.id, phone }),
                    () => this.setState({ phone }),
                    this.setState.bind(this))}
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

export default connect(state => ({ ...state }))(Setting)