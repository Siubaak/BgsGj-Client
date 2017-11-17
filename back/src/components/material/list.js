import React, { Component } from 'react'
import { Table, Badge, Menu, Dropdown, Icon } from 'antd'
import './material.less'

const menu = (
  <Menu>
    <Menu.Item>
      Action 1
    </Menu.Item>
    <Menu.Item>
      Action 2
    </Menu.Item>
  </Menu>
)

const expandedRowRender = () => {
  const columns = [
    { title: 'Date', dataIndex: 'date', key: 'date' },
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Status', key: 'state', render: () => <span><Badge status="success" />Finished</span> },
    { title: 'Upgrade Status', dataIndex: 'upgradeNum', key: 'upgradeNum' },
    {
      title: 'Action',
      dataIndex: 'operation',
      key: 'operation',
      render: () => (
        <span className="table-operation">
          <a href="">Pause</a>
          <a href="">Stop</a>
          <Dropdown overlay={menu}>
            <a href="">
              More <Icon type="down" />
            </a>
          </Dropdown>
        </span>
      ),
    },
  ]

  const data = []
  for (let i = 0; i < 3; ++i) {
    data.push({
      key: i,
      date: '2014-12-24 23:12:00',
      name: 'This is production name',
      upgradeNum: 'Upgraded: 56',
    })
  }
  return (
    <Table
      columns={columns}
      dataSource={data}
      pagination={false}
    />
  )
}

const columns = [
  { title: '部门', dataIndex: 'account', key: 'account' },
  { title: '活动名称', dataIndex: 'activity', key: 'activity' },
]

const data = []
for (let i = 0; i < 3; ++i) {
  data.push({
    key: i,
    account: 'Scf发的是分散fdfsfasfsafreem',
    activity: 'iOS',
    cond: 'iOS',
  })
}

class Mgmt extends Component {
  render() {
    return (
      <Table
        className="table"
        size="small"
        columns={columns}
        expandedRowRender={expandedRowRender}
        dataSource={data}
        pagination={{size:'small',total:100}}
      />
    )
  }
}

export default Mgmt