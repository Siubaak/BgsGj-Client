import React, { Component } from 'react'
import { Switch, Form, Input, Button } from 'antd'
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
      key: `${record._id}enable`, index: '启用',
      text: (
        <div className='mgmt-opts'>
          <Switch checked={record.enable} size='small'
            onChange={checked =>
              common.handle(common.api.putMaterials({ _id: record._id, enable: checked }),
              () => record.enable = checked,
              this.setState.bind(this)
          )}/>
          <Button type='danger' size='small'
            onClick={() =>
              common.handle(common.api.delMaterials({ _id: record._id }),
                () => record = undefined,
                this.setState.bind(this)
          )}>
            删除物资
          </Button>
        </div>
      )
    })
    return exData
  }
  getFormItems = getFieldDecorator => [
    { key: 'type', label: '分类', type: 'text' },
    { key: 'name', label: '名称', type: 'text' },
    { key: 'quantity', label: '数量', type: 'number' },
    { key: 'unit', label: '单位', type: 'text' },
    { key: 'price', label: '单价', type: 'number' },
  ].map(obj => 
    <Form.Item
      className='new-form-item'
      label={obj.label}
      labelCol={{span: 6}}
      wrapperCol={{span: 18}}
      key={`${obj.key}new`}
    >
      {
        getFieldDecorator(obj.key, {
          rules: [{ required: true, message: `请输入${obj.label}` }],
        })(<Input type={obj.type}/>)
      }
    </Form.Item>
  )
  handleCreate = (material, done) => common.handle(common.api.postMaterials(material), done)
  render() {
    return (
      <div>
        <Util.List 
          state={this.state}
          setState={this.setState.bind(this)}
          columns={this.columns}
          getExData={this.getExData}
          api={common.api.getMaterials}
          new={{btnText: '新建物资', onCreate: this.handleCreate, getFormItems: this.getFormItems}}
        />
      </div>
    )
  }
}

export default Mgmt
