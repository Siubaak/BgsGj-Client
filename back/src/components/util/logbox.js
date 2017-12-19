import React, { Component } from 'react'
import { Form, Icon, Input, Button } from 'antd'

class NormalLoginForm extends Component {
  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, user) => {
      if (!err) this.props.login(user)
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <Form onSubmit={this.handleSubmit} className='logbox'>
        <Form.Item className='center'>
          <p>研会小管家后台管理端</p>
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('account', {
            rules: [{ required: true, message: '请输入用户名' }],
          })(
            <Input prefix={<Icon type='user' style={{ fontSize: 13 }} />} placeholder='用户名' />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '请输入密码' }],
          })(
            <Input prefix={<Icon type='lock' style={{ fontSize: 13 }} />} type='password' placeholder='密码' />
          )}
        </Form.Item>
        <Form.Item>
          <Button type='primary' htmlType='submit' className='button'>登录</Button>
        </Form.Item>
      </Form>
    )
  }
}

const Logbox = Form.create({
  mapPropsToFields(props) {
    return { props: Form.createFormField({ ...props }) }
  },
})(NormalLoginForm)

export default Logbox