import React, { Component } from 'react'
import {
  Route,
  Link
} from 'react-router-dom'
import { Layout, Menu, Icon, Avatar, Dropdown } from 'antd'
import Material from './material'
import Meeting from './meeting'
import Note from './note'
import User from './user'
import './home.less'

const { Header, Content, Footer, Sider } = Layout
const SubMenu = Menu.SubMenu

class Home extends Component {
  state = {
    collapsed: window.innerWidth <= 760,
  }
  onCollapse = (collapsed) => {
    console.log(this.props.match)
    this.setState({ collapsed })
  }
  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
          className='side'
        >
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <SubMenu
              key="sub1"
              title={<span><Icon type="shop" /><span>物资</span></span>}
            >
              <Menu.Item key="1"><Link to='/malist'>申请</Link></Menu.Item>
              <Menu.Item key="2"><Link to='/mamgmt'>管理</Link></Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub2"
              title={<span><Icon type="team" /><span>会议室</span></span>}
            >
              <Menu.Item key="3"><Link to='/melist'>预约</Link></Menu.Item>
              <Menu.Item key="4"><Link to='/memgmt'>管理</Link></Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub3"
              title={<span><Icon type="notification" /><span>通知</span></span>}
            >
              <Menu.Item key="5"><Link to='/noedit'>编辑</Link></Menu.Item>
              <Menu.Item key="6"><Link to='/nomgmt'>管理</Link></Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub4"
              title={<span><Icon type="user" /><span>用户</span></span>}
            >
              <Menu.Item key="7"><Link to='/ursett'>设置</Link></Menu.Item>
              <Menu.Item key="8"><Link to='/urmgmt'>管理</Link></Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout>
          <Header className='head'>
          <Dropdown overlay={
            <Menu>
              <Menu.Item><Link to='/ursett'>设置</Link></Menu.Item>
              <Menu.Item>注销</Menu.Item>
            </Menu>}
            placement="bottomCenter"
            trigger={['click']}
          >
            <Avatar className='avatar' icon="user" />
          </Dropdown>
          </Header>
          <Content>
            <Route exact path="/malist" component={Material.List}/>
            <Route path="/mamgmt" component={Material.Mgmt}/>

            <Route path="/melist" component={Meeting.List}/>
            <Route path="/memgmt" component={Meeting.Mgmt}/>

            <Route path="/noedit" component={Note.List}/>
            <Route path="/nomgmt" component={Note.Mgmt}/>

            <Route path="/ursett" component={User.Setting}/>
            <Route path="/urmgmt" component={User.Mgmt}/>
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