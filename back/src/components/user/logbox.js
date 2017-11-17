import React, { Component } from 'react'
import { Breadcrumb } from 'antd'

class Mgmt extends Component {
  render() {
    return (
      <div>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>User</Breadcrumb.Item>
          <Breadcrumb.Item>Bill</Breadcrumb.Item>
        </Breadcrumb>
        <h1>a</h1>
      </div>
    )
  }
}

export default Mgmt