import React, { Component } from 'react'
import { Badge, Button, Modal } from 'antd'
import common from '../../common'
import Util from '../util'
import './meeting.less'

class MeList extends Component {
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
    { title: '部门', key: 'melistaccount', dataIndex: 'user.account' },
    { title: '状态', key: 'melistcond', dataIndex: 'cond', render: i => <span><Badge status={this.cond[i].status} />{this.cond[i].text}</span>},
    { title: '预约', key: 'melistname', dataIndex: 'name' },
    { title: '手机', key: 'melistphone', dataIndex: 'phone' },
  ]
  getExData = record => [
    { key: `${record._id}activity`, index: '会议', text: record.activity },
    { key: `${record._id}date`, index: '日期', text: record.date },
    { key: `${record._id}time`, index: '时间', text: record.time },
    { key: `${record._id}proj`, index: '投影', text: record.proj ? '需要' : '不需要' },
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
                    common.handle(common.api.putMetbooks({ _id: record._id, cond: c.c }),
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
        api={common.api.getMetbooks} 
      />
    )
  }
}

export default MeList