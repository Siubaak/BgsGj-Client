import React, { Component } from 'react'
import { Breadcrumb } from 'antd'

class Mgmt extends Component {
  render() {
    return (
      <div>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>用户</Breadcrumb.Item>
          <Breadcrumb.Item>管理</Breadcrumb.Item>
        </Breadcrumb>
        <h1>a</h1>
      </div>
    )
  }
}

export default Mgmt