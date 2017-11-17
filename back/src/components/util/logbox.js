import React, { Component } from 'react'
import { Form, Icon, Input, Button, notification } from 'antd'
import api from '../../api'
const FormItem = Form.Item

class NormalLoginForm extends Component {
  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        api.postToken(values)
          .end((err, res) => {
            if (err || !res.ok) {
              alert('Oh no! error');
            } else {
              //const { token } = JSON.parse(res.text)
              notification.success({
                message: '登录成功',
                description: '正在跳转',
              })
              localStorage.setItem('')
              //setTimeout(() => window.location.href = '/', 1500)
            }
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