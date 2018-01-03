import React, { Component } from 'react'
import { Badge, Button, Modal } from 'antd'
import common from '../../common'
import Util from '../util'
import './material.less'

class MaList extends Component {
  state = {
    data: [],
    pagination: { size: 'small', pageSize: 10, current: 1 },
    loading: false,
  }
  cond = [
    { status: 'warning', text: '预约' },
    { status: 'processing', text: '借出' },
    { status: 'success', text: '归还' },
    { status: 'error', text: '作废' },
  ]
  columns = [
    { title: '部门', key: 'malistaccount', dataIndex: 'user.account' },
    { title: '状态', key: 'malistcond', dataIndex: 'cond', render: i => <span><Badge status={this.cond[i].status}/>{this.cond[i].text}</span>},
    { title: '申请', key: 'malistname', dataIndex: 'name' },
    { title: '手机', key: 'malistphone', dataIndex: 'phone' },
  ]
  getExData = record => [
    { key: `${record._id}activity`, index: '活动', text: record.activity },
    { key: `${record._id}takeDate`, index: '领取', text: record.takeDate },
    { key: `${record._id}returnDate`, index: '归还', text: record.returnDate },
    { key: `${record._id}materials`, index: '物资', text: record.materials.map((mat, i) =>
      <div style={{ display: 'inline-block' }}
        key={`${record._id}mat${i}`}>({i + 1})&nbsp;
        <strong>{mat.material.name} × {mat.book}</strong>
        &nbsp;&nbsp;&nbsp;
      </div>
    )},
    { key: `${record._id}price`, index: '总价', text: record.price },
    { key: `${record._id}remark`, index: '备注', text: <Util.EditableCell textArea value={record.remark || '无'}
      onCheck={remark => 
        common.handle(common.api.putMatbooks({ _id: record._id, remark }),
          () => record.remark = remark,
          this.setState.bind(this))
      }/>
    },
    { key: `${record._id}operations`, index: '操作', text: (
      <Button.Group size='small'>
        {
          [
            { c: 1, d: 0, t: '借出', tp: 'primary' },
            { c: 2, d: 1, t: '归还', tp: 'default' },
            { c: 3, d: 0, t: '作废', tp: 'danger' },
          ].map(c =>
            <Button key={`${record._id}btn${c.c}`} type={c.tp} disabled={record.cond !== c.d} 
              onClick={() =>
                Modal.confirm({
                  title: `确定${c.t}？`,
                  content: `活动为${record.activity}，目前状态为${this.cond[record.cond].text}。申请人为${record.user.account}的${record.name}(${record.phone})。`,
                  okText: c.t,
                  okType: c.tp,
                  cancelText: '取消',
                  onOk: () =>
                    common.handle(common.api.putMatbooks({ _id: record._id, cond: c.c }),
                      () => record.cond = c.c,
                      this.setState.bind(this))
                })
            }>
              {c.t}
            </Button>
          )
        }
      </Button.Group>
    )},
  ]
  render() {
    return (
      <Util.List
        state={this.state}
        setState={this.setState.bind(this)}
        columns={this.columns}
        getExData={this.getExData}
        api={common.api.getMatbooks}
      />
    )
  }
}

export default MaList