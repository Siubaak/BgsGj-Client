import React, { Component } from 'react'
import { Switch, Table } from 'antd'
import common from '../../common'
import './meeting.less'

class Mgmt extends Component {
  state = {
    enable: false,
    proj: false,
    loading: false,
  }
  componentDidMount() {
    common.handle(common.api.getMeetings({ settings: true }), res => {
      const { enable, proj } = res.body
      this.setState({ enable, proj })
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
            { key: `memgmtenable`, index: '会议室', text: <Switch checked={this.state.enable}
              onChange={enable => {
                common.handle(common.api.putMeetings({ enable, proj: this.state.proj }),
                  () => this.setState({ enable },
                  this.setState.bind(this)))
              }}/> },
            { key: `memgmtproj`, index: '投影仪', text: <Switch checked={this.state.proj}
              onChange={proj => {
                common.handle(common.api.putMeetings({ enable: this.state.enable, proj }),
                  () => this.setState({ proj },
                  this.setState.bind(this)))
              }}/> },
          ]}
        />
      </div>
    )
  }
}

export default Mgmt