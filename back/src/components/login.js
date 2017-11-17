import React, { Component } from 'react'
import { Layout } from 'antd'
import Util from './util'
import './login.less'

const { Content, Footer } = Layout

class Login extends Component {
  render() {
    return (
      <Layout className='login'>
        <Content className='center'>
          <Util.Logbox/>
        </Content>
        <Footer>
          研会小管家后台 ©2016-{(new Date()).getFullYear()}
        </Footer>
      </Layout>
    )
  }
}

export default Login