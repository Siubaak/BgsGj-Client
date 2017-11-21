import React, { Component } from 'react'
import { Table } from 'antd'
import common from '../../common'
import './util.less'

class List extends Component {
  exColumns = [
    { title: '', key: 'index', dataIndex: 'index', width: 50 },
    { title: '', key: 'text', dataIndex: 'text' },
  ]
  getExTable = record => {
    return (
      <Table
        size='small'
        className='table'
        pagination={false}
        showHeader={false}
        columns={this.exColumns}
        dataSource={this.props.getExData(record)}
      />
    )
  }
  fetch = params => {
    const { pagination } = this.props.state
    common.handle(this.props.api(params), res => {
      const { total, list } = JSON.parse(res.text)
      const pager = { ...pagination }
      pager.total = total
      this.props.setState({
        data: list,
        pagination: pager,
      })
    }, this.props.setState)
  }
  onChange = pagination => {
    const pager = { ...this.props.state.pagination }
    pager.current = pagination.current
    this.props.setState({ pagination: pager })
    this.fetch({
      skip: pagination.pageSize * (pagination.current - 1),
      limit: pagination.pageSize,
    })
  }
  componentDidMount() {
    this.fetch({
      skip: 0,
      limit: this.props.state.pagination.pageSize,
    })
  }
  render() {
    const { data, pagination, loading } = this.props.state
    return (
      <Table 
        className='table' 
        dataSource={data}
        loading={loading}
        scroll={{ x: 400 }}
        pagination={pagination}
        onChange={this.onChange}
        columns={this.props.columns}
        rowKey={record => record._id}
        expandedRowRender={typeof this.props.getExData === 'function' ? this.getExTable : null}
      />
    )
  }
}

export default List
