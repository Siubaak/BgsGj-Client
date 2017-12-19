import React, { Component } from 'react'
import common from '../../common'
import Util from '../util'
import { Form, Input, Icon, Modal, Menu } from 'antd'
import './user.less'
class Mgmt extends Component {
  state = {
    data: [],
    pagination: { size: 'small', pageSize: 10, current: 1 },
    loading: false,
    visible: false,
    level: 0,
  }
  level = ['未审核用户', '研分会用户', '研会及研团委用户', '普通管理员', '全局管理员']
  columns = [
    { title: '分类', key: 'urmgmtlevel', dataIndex: 'level', render: text => this.level[text] },
    { title: '账号', key: 'urmgmtaccount', dataIndex: 'account' },
  ]
  getExData = record => {
    const exData = [
      { key: 'level', index: '分类', dropDown: true,
        text: this.level,
        menu: this.level.map((d, i) => <Menu.Item key={i}>{d}</Menu.Item>)},
      { key: 'account', index: '账号', type: 'text' },
    ].map(obj => {
      return {
        key: `${record._id}${obj.key}`,
        index: obj.index,
        text: <Util.EditableCell
          dropDown={obj.dropDown} menu={obj.menu} text={obj.text}
          type={obj.type} value={obj.dropDown ? record[obj.key] : record[obj.key] || '无'}
          onCheck={value => 
            common.handle(common.api.putUsers({ _id: record._id, [obj.key]: value }),
              () => record[obj.key] = value,
              this.setState.bind(this))}
        />
      }
    })
    if (record.level < 3) {
      exData.push(
        ...[
          { key: 'name', index: '部长', type: 'text' },
          { key: 'phone', index: '手机', type: 'number' },
          { key: 'wallet', index: '钱包', type: 'number'  },
        ].map(obj => {
          return {
            key: `${record._id}${obj.key}`,
            index: obj.index,
            text: <Util.EditableCell
              type={obj.type} value={record[obj.key] || '无'}
              onCheck={value => 
                common.handle(common.api.putUsers({ _id: record._id, [obj.key]: value }),
                  () => record[obj.key] = value,
                  this.setState.bind(this))}
            />
          }
        })
      )
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
    { key: 'password', label: '密码', type: 'text' },
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
  handleCreate = (user, done) => common.handle(common.api.postUsers(user), done)
  handleDelete = record => {
    Modal.confirm({
      title: `确定删除${record.account}？`,
      content:
        record.level < 3 ? 
        `用户分类为${this.level[record.level]}，部长为${record.name || '无'}，手机为${record.phone || '无'}，目前钱包剩余￥${record.wallet || 0}。`
        :
        `管理员分类为${this.level[record.level]}。`,
      okText: '删除',
      okType: 'danger',
      cancelText: '取消',
      onOk: () => 
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
      },
    );
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
      </div>
    )
  }
}

export default Mgmt