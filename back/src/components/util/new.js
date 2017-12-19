import React, { Component } from 'react'
import { Button, Modal, Form } from 'antd'

class NewBoxFom extends Component {
  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <Form>
        {
          typeof this.props.getFormItems === 'function'
          ? this.props.getFormItems(getFieldDecorator)
          : []
        }
      </Form>
    )
  }
}

const NewBox = Form.create()(NewBoxFom)

class New extends Component {
  state = {
    title: this.props.btnText,
    visible: false,
    confirmLoading: false,
  }
  showModal = () => {
    this.setState({ visible: true })
  }
  handleCancel = () => {
    this.setState({ visible: false })
  }
  handleCreate = () => {
    this.form.validateFields((err, values) => {
      if (err) return
      this.setState({ confirmLoading: true })
      if (typeof this.props.onCreate === 'function') {
        this.props.onCreate(values, () => {
          this.setState({
            confirmLoading: false,
            visible: false,
          })
          this.form.resetFields()
          if (typeof this.props.onChange === 'function') this.props.onChange()
        })
      } else {
        this.setState({
          confirmLoading: false,
          visible: false,
        })
        this.form.resetFields()
      }
    })
  }
  saveFormRef = form => this.form = form
  render() {
    return (
      <div className='new'>
        <Button type='default' className='new-button' onClick={this.showModal}>{this.props.btnText}</Button>
        <Modal
          okText='确定'
          cancelText='取消'
          wrapClassName='modal'
          title={this.state.title}
          onOk={this.handleCreate}
          onCancel={this.handleCancel}
          visible={this.state.visible}
          confirmLoading={this.state.confirmLoading}
        >
          <NewBox
            ref={this.saveFormRef}
            visible={this.state.visible}
            getFormItems={this.props.getFormItems}
          />
        </Modal>
      </div>
    )
  }
}

export default New