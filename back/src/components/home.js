import React, { Component } from 'react'
import { Switch, Redirect, Route, Link } from 'react-router-dom'
import { Layout, Menu, Icon, Avatar, Dropdown, Breadcrumb, message } from 'antd'
import Util from './util'
import Material from './material'
import Meeting from './meeting'
import Note from './note'
import User from './user'
import './home.less'

const { Header, Content, Footer, Sider } = Layout
const SubMenu = Menu.SubMenu

const malist = '/malist'
const mamgmt = '/mamgmt'
const melist = '/melist'
const memgmt = '/memgmt'
const noedit = '/noedit'
const nomgmt = '/nomgmt'
const ursett = '/ursett'
const urmgmt = '/urmgmt'
const breads = {
  [malist]: <Breadcrumb className='nav' separator=">"><Breadcrumb.Item>物资</Breadcrumb.Item><Breadcrumb.Item>申请</Breadcrumb.Item></Breadcrumb>,
  [mamgmt]: <Breadcrumb className='nav' separator=">"><Breadcrumb.Item>物资</Breadcrumb.Item><Breadcrumb.Item>管理</Breadcrumb.Item></Breadcrumb>,
  [melist]: <Breadcrumb className='nav' separator=">"><Breadcrumb.Item>会议室</Breadcrumb.Item><Breadcrumb.Item>预约</Breadcrumb.Item></Breadcrumb>,
  [memgmt]: <Breadcrumb className='nav' separator=">"><Breadcrumb.Item>会议室</Breadcrumb.Item><Breadcrumb.Item>管理</Breadcrumb.Item></Breadcrumb>,
  [noedit]: <Breadcrumb className='nav' separator=">"><Breadcrumb.Item>通知</Breadcrumb.Item><Breadcrumb.Item>编辑</Breadcrumb.Item></Breadcrumb>,
  [nomgmt]: <Breadcrumb className='nav' separator=">"><Breadcrumb.Item>通知</Breadcrumb.Item><Breadcrumb.Item>管理</Breadcrumb.Item></Breadcrumb>,
  [ursett]: <Breadcrumb className='nav' separator=">"><Breadcrumb.Item>用户</Breadcrumb.Item><Breadcrumb.Item>设置</Breadcrumb.Item></Breadcrumb>,
  [urmgmt]: <Breadcrumb className='nav' separator=">"><Breadcrumb.Item>用户</Breadcrumb.Item><Breadcrumb.Item>管理</Breadcrumb.Item></Breadcrumb>,
}

class Home extends Component {
  state = {
    collapsed: window.innerWidth <= 760,
  }
  onCollapse = (collapsed) => {
    this.setState({ collapsed })
  }
  onClick = ({ key }) => {
    if (key === 'u1') {
      localStorage.removeItem('yhbgsback')
      message.warn('注销成功')
      setTimeout(() => window.location.href = '/login', 1000)
    }
  }
  render() {
    return (
      <Layout className='home'>
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
          className='side'
        >
          <Menu theme='dark' defaultSelectedKeys={['1']} mode='inline'>
            <SubMenu
              key='sub1'
              title={<span><Icon type='shop' /><span>物资</span></span>}
            >
              <Menu.Item key='s0'><Link to={malist}>申请</Link></Menu.Item>
              <Menu.Item key='s1'><Link to={mamgmt}>管理</Link></Menu.Item>
            </SubMenu>
            <SubMenu
              key='sub2'
              title={<span><Icon type='team' /><span>会议室</span></span>}
            >
              <Menu.Item key='s2'><Link to={melist}>预约</Link></Menu.Item>
              <Menu.Item key='s3'><Link to={memgmt}>管理</Link></Menu.Item>
            </SubMenu>
            <SubMenu
              key='sub3'
              title={<span><Icon type='notification' /><span>通知</span></span>}
            >
              <Menu.Item key='s4'><Link to={nomgmt}>管理</Link></Menu.Item>
            </SubMenu>
            <SubMenu
              key='sub4'
              title={<span><Icon type='user' /><span>用户</span></span>}
            >
              <Menu.Item key='s5'><Link to={ursett}>设置</Link></Menu.Item>
              <Menu.Item key='s6'><Link to={urmgmt}>管理</Link></Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout>
          <Header className='head'>
            {breads[window.location.pathname]
              || <div/>}
            <Dropdown overlay={
              <Menu onClick={this.onClick}>
                <Menu.Item key='u0'><Link to={ursett}>设置</Link></Menu.Item>
                <Menu.Item key='u1'>注销</Menu.Item>
              </Menu>}
              placement='bottomCenter'
              trigger={['click']}
              className='drop'
            >
              <Avatar className='avatar' icon='user' />
            </Dropdown>
          </Header>
          <Content className='content'>
            <Switch>
              <Route exact path="/" render={() => <Redirect to={malist} />} />
              <Route exact path={malist} component={Material.List} />
              <Route exact path={mamgmt} component={Material.Mgmt} />
              <Route exact path={melist} component={Meeting.List} />
              <Route exact path={memgmt} component={Meeting.Mgmt} />
              <Route exact path={noedit} component={Note.List} />
              <Route exact path={nomgmt} component={Note.Mgmt} />
              <Route exact path={ursett} component={User.Setting} />
              <Route exact path={urmgmt} component={User.Mgmt} />
              <Route render={() => <Util.Exce type='404'/>}/>
            </Switch>
          </Content>
          <Footer className='foot'>
            研会小管家后台 ©2016-{(new Date()).getFullYear()}
          </Footer>
        </Layout>
      </Layout>
    )
  }
}

export default Home