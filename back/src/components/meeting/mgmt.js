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
    common.handle(common.api.getMeetings(), res => {
      const { enable, proj } = res.body
      this.setState({ enable, proj })
    }, this.setState.bind(this))
  }
  render() {
    return (
      <Table
        pagination={false}
        showHeader={false}
        className='table'
        loading={this.state.loading}
        columns={[
          { title: '', key: 'index', dataIndex: 'index' },
          { title: '', key: 'text', dataIndex: 'text' },
        ]}
        dataSource={[
          { key: `memgmtenable`, index: '会议室', text: <Switch checked={this.state.enable} size='small'
            onChange={checked => {
              this.setState({ loading: true })
              common.handle(common.api.putMeetings({ enable: checked, proj: this.state.proj }),
              () => this.setState({ enable: checked, loading: false }))
            }}/> },
          { key: `memgmtproj`, index: '投影仪', text: <Switch checked={this.state.proj} size='small'
            onChange={checked => {
              this.setState({ loading: true })
              common.handle(common.api.putMeetings({ enable: this.state.enable, proj: checked }),
              () => this.setState({ proj: checked, loading: false }))
            }}/> },
        ]}
      />
    )
  }
}

export default Mgmt