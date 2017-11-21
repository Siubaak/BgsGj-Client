import React, { Component } from 'react'
import { Switch } from 'antd'
import common from '../../common'
import Util from '../util'
import './user.less'

class Mgmt extends Component {
  columns = [
    { title: '分类', key: 'urmgmttype', dataIndex: 'type' },
    { title: '名称', key: 'urmgmtname', dataIndex: 'name' },
    { title: '单价', key: 'urmgmtprice', dataIndex: 'price', render: i => '¥' + i },
    { title: '数量', key: 'urmgmtquantity', dataIndex: 'quantity' },
    { title: '单位', key: 'urmgmtunit', dataIndex: 'unit' },
    { title: '启用', key: 'urmgmtenable', dataIndex: 'enable', render: i => <Switch defaultChecked={i}/>},
  ]
  state = {
    data: [],
    pagination: { size: 'small', pageSize: 10 },
    loading: false,
  }
  render() {
    return (
      <Util.List 
        state={this.state}
        setState={this.setState.bind(this)}
        api={common.api.getUsers}
        columns={this.columns}
      />
    )
  }
}

export default Mgmt