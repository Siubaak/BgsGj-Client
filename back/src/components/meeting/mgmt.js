import React, { Component } from 'react'
import { Table, Switch, Form, Input, Icon, Modal, Select } from 'antd'
import common from '../../common'
import Util from '../util'
import availTimes from './times'
import './meeting.less'

const availTimesOpts = availTimes.map((time, index) => <Select.Option key={time}>{time}</Select.Option>)

class Mgmt extends Component {
  state = {
    data: [],
    pagination: { size: 'small', pageSize: 10, current: 1 },
    loading: false,
    gEnable: false,
  }
  columns = [
    { title: '名称', key: 'mamgmtname', dataIndex: 'name' },
    { title: '投影', key: 'mamgmtproj', dataIndex: 'proj', render: i => i ? '启用': '禁用' },
  ]
  getExData = record => {
    const exData = [{
      key: `${record._id}name`, index: '名称',
      text: <Util.EditableCell type='text' value={record.name || '无'}
        onCheck={value => 
          common.handle(common.api.putMeetings({ _id: record._id, name: value }),
            () => record.name = value,
            this.setState.bind(this))}
      />,
    }, {
      key: `${record._id}times`, index: '时间',
      text: <Util.EditableCell select options={availTimesOpts} value={record.times}
        onCheck={value => 
          common.handle(common.api.putMeetings({ _id: record._id, times: value }),
            () => record.times = value,
            this.setState.bind(this))}
      />,
    }, {
      key: `${record._id}proj`, index: '投影',
      text: <div className='mgmt-opts'>
        <Switch checked={record.proj} size='small'
          onChange={checked =>
            common.handle(common.api.putMeetings({ _id: record._id, proj: checked }),
              () => record.proj = checked,
              this.setState.bind(this))
        }/>
        <Icon type='delete' className='delete'
          onClick={() => this.handleDelete(record)}/>
      </div>,
    }]
    return exData
  }
  getFormItems = getFieldDecorator => [
    <Form.Item key='namenew'>
      {
        getFieldDecorator('name', {
          rules: [{ required: true, message: '请输入名称' }],
        })(<Input type='text' prefix={<Icon type='form' style={{fontSize: 13}}/>} placeholder='名称'/>)
      }
    </Form.Item>,
    <Form.Item key='timesnew'>
    {
      getFieldDecorator('times', {
        rules: [{ required: true, message: '请输入时间段' }],
      })(<Select
          mode='multiple'
          placeholder='时间段'
        >
          {availTimesOpts}
        </Select>)
    }
    </Form.Item>,
  ]
  handleCreate = (meeting, done) => common.handle(common.api.postMeetings(meeting), done)
  handleDelete = record => {
    Modal.confirm({
      title: `确定删除${record.name}？`,
      okText: '删除',
      okType: 'danger',
      cancelText: '取消',
      onOk: () => 
        common.handle(common.api.delMeetings({ _id: record._id }), () => {
          const { pagination } = this.state
          common.handle(common.api.getMeetings({
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
  componentDidMount() {
    common.handle(common.api.getMeetings({ settings: true }), res => {
      const { gEnable } = res.body
      this.setState({ gEnable })
    }, this.setState.bind(this))
  }
  render() {
    return (
      <div className='meeting'>
        <Table
          pagination={false}
          showHeader={false}
          className='mgmt-table'
          loading={this.state.loading}
          columns={[
            { title: '', key: 'index', dataIndex: 'index' },
            { title: '', key: 'text', dataIndex: 'text' },
          ]}
          dataSource={[
            { key: `mamgmtenable`, index: '会议室预约', text: <Switch checked={this.state.gEnable}
              onChange={gEnable => {
                common.handle(common.api.putMeetings({ gEnable }),
                  () => this.setState({ gEnable },
                  this.setState.bind(this)))
              }}/> },
          ]}
        />
        <Util.List 
          state={this.state}
          setState={this.setState.bind(this)}
          columns={this.columns}
          getExData={this.getExData}
          api={common.api.getMeetings}
          new={{btnText: '新建会议室', layout: 'vertical', onCreate: this.handleCreate, getFormItems: this.getFormItems}}
        />
      </div>
    )
  }
}

export default Mgmt
