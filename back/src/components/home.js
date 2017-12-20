import React, { Component } from 'react'
import { Switch, Redirect, Route, Link } from 'react-router-dom'
import { Layout, Menu, Icon, Dropdown, Breadcrumb } from 'antd'
import { connect } from 'react-redux'
import { logout } from '../stores/actions'
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
  [malist]: <Breadcrumb separator=">"><Breadcrumb.Item>物资</Breadcrumb.Item><Breadcrumb.Item>申请</Breadcrumb.Item></Breadcrumb>,
  [mamgmt]: <Breadcrumb separator=">"><Breadcrumb.Item>物资</Breadcrumb.Item><Breadcrumb.Item>管理</Breadcrumb.Item></Breadcrumb>,
  [melist]: <Breadcrumb separator=">"><Breadcrumb.Item>会议室</Breadcrumb.Item><Breadcrumb.Item>预约</Breadcrumb.Item></Breadcrumb>,
  [memgmt]: <Breadcrumb separator=">"><Breadcrumb.Item>会议室</Breadcrumb.Item><Breadcrumb.Item>管理</Breadcrumb.Item></Breadcrumb>,
  [noedit]: <Breadcrumb separator=">"><Breadcrumb.Item>通知</Breadcrumb.Item><Breadcrumb.Item>编辑</Breadcrumb.Item></Breadcrumb>,
  [nomgmt]: <Breadcrumb separator=">"><Breadcrumb.Item>通知</Breadcrumb.Item><Breadcrumb.Item>管理</Breadcrumb.Item></Breadcrumb>,
  [ursett]: <Breadcrumb separator=">"><Breadcrumb.Item>用户</Breadcrumb.Item><Breadcrumb.Item>设置</Breadcrumb.Item></Breadcrumb>,
  [urmgmt]: <Breadcrumb separator=">"><Breadcrumb.Item>用户</Breadcrumb.Item><Breadcrumb.Item>管理</Breadcrumb.Item></Breadcrumb>,
}

class Home extends Component {
  state = {
    collapsed: window.innerWidth <= 576,
  }
  onCollapse = collapsed => this.setState({ collapsed })
  toggle = () => this.setState({ collapsed: !this.state.collapsed })
  onClick = e => { if (e.key === 'u1') this.props.logout() }
  render() {
    return this.props.level && this.props.level > 2 ?
    (
      <Layout className='home'>
        <Sider
          collapsible
          trigger={null}
          breakpoint='md'
          className='side'
          collapsedWidth={0}
          onCollapse={this.onCollapse}
          collapsed={this.state.collapsed}
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
            <Icon
              className='icon fold'
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
            {breads[window.location.pathname]
              || <div/>}
            <Dropdown overlay={
              <Menu onClick={this.onClick}>
                <Menu.Item key='u0'><Link to={ursett}>设置</Link></Menu.Item>
                <Menu.Item key='u1'>注销</Menu.Item>
              </Menu>}
              placement='bottomCenter'
            >
              <Icon className='icon' type='user'/>
            </Dropdown>
          </Header>
          <Content className='content'>
            <Switch>
              <Route exact path='/' render={() => <Redirect to={malist} />} />
              <Route exact path={malist} component={Material.List} />
              <Route exact path={mamgmt} render={() => {
                if (this.props.level > 3) return <Material.Mgmt/>
                else return <Util.Exce type='403'/>
              }}/>
              <Route exact path={melist} component={Meeting.List} />
              <Route exact path={memgmt} render={() => {
                if (this.props.level > 3) return <Meeting.Mgmt/>
                else return <Util.Exce type='403'/>
              }}/>
              <Route exact path={nomgmt} render={() => {
                if (this.props.level > 3) return <Note.Mgmt/>
                else return <Util.Exce type='403'/>
              }}/>
              <Route exact path={ursett} component={User.Setting} />
              <Route exact path={urmgmt} render={() => {
                if (this.props.level > 3) return <User.Mgmt/>
                else return <Util.Exce type='403'/>
              }}/>
              <Route render={() => <Util.Exce type='404'/>}/>
            </Switch>
          </Content>
          <Footer className='foot'>
            研会小管家后台 ©2016-{(new Date()).getFullYear()}
          </Footer>
        </Layout>
      </Layout>
    )
    :
    <Redirect to='/login'></Redirect>
  }
}

export default connect(state => ({ ...state }), { logout })(Home)