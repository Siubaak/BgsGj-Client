import React, { Component } from 'react'
import { Layout } from 'antd'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { login } from '../stores/actions'
import Util from './util'
import './login.less'

const { Content, Footer } = Layout

class Login extends Component {
  render() {
    return this.props.level && this.props.level > 2 ?
    <Redirect to='/'></Redirect>
    :
    (
      <Layout className='login'>
        <Content className='center'>
          <Util.Logbox {...this.props}/>
        </Content>
        <Footer>
          研会小管家后台 ©2016-{(new Date()).getFullYear()}
        </Footer>
      </Layout>
    )
  }
}

export default connect(state => ({ ...state }), { login })(Login)