import React, { Component } from 'react'
import { Switch } from 'antd'
import common from '../../common'
import Util from '../util'
import './material.less'

class Mgmt extends Component {
  state = {
    data: [],
    pagination: { size: 'small', pageSize: 10 },
    loading: false,
  }
  columns = [
    { title: '分类', key: 'mamgmttype', dataIndex: 'type' },
    { title: '名称', key: 'mamgmtname', dataIndex: 'name' },
    { title: '数量', key: 'mamgmtquantity', dataIndex: 'quantity' },
    { title: '单价', key: 'mamgmtprice', dataIndex: 'price', render: i => '¥' + i },
  ]
  getExData = record => {
    const exData = [
      { key: 'type', index: '分类' },
      { key: 'name', index: '名称' },
      { key: 'quantity', index: '数量' },
      { key: 'unit', index: '单位' },
      { key: 'price', index: '单价' },
    ].map(obj => {
      return {
        key: `${record._id}${obj.key}`,
        index: obj.index,
        text: <Util.EditableCell value={record[obj.key] || '无'}
          onCheck={value => 
            common.handle(common.api.putMaterials({ _id: record._id, [obj.key]: value }),
            () => record[obj.key] = value,
            this.setState.bind(this)
          )}/>
        }
      })
    exData.push({
      key: `${record._id}enable`, index: '启用', text: <Switch size='small' checked={record.enable}
        onChange={checked =>
          common.handle(common.api.putMaterials({ _id: record._id, enable: checked }),
          () => record.enable = checked,
          this.setState.bind(this)
      )}/>
    })
    return exData
  }
  render() {
    return (
      <Util.List 
        state={this.state}
        setState={this.setState.bind(this)}
        columns={this.columns}
        getExData={this.getExData}
        api={common.api.getMaterials}
      />
    )
  }
}

export default Mgmt
