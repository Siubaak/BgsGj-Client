import React, { Component } from 'react'
import { Form, Icon, Input, Button, message } from 'antd'
import common from '../../common'
const FormItem = Form.Item

class NormalLoginForm extends Component {
  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        common.handle(common.api.postTokens(values), res => {
          const { token } = JSON.parse(res.text)
          message.success('登录成功')
          localStorage.setItem('yhbgsback', token)
          setTimeout(() => window.location.href = '/', 1000)
        })
      }
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <Form onSubmit={this.handleSubmit} className="logbox">
        <FormItem className='center'>
          <p>研会小管家后台管理端</p>
        </FormItem>
        <FormItem>
          {getFieldDecorator('account', {
            rules: [{ required: true, message: '请输入用户名！' }],
          })(
            <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="用户名" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '请输入密码！' }],
          })(
            <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="密码" />
          )}
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit" className="button">登录</Button>
        </FormItem>
      </Form>
    )
  }
}

const Logbox = Form.create()(NormalLoginForm)

export default Logbox