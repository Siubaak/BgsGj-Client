<template>
  <div id="main" class="full-screen">
    <div class="weui-tab">
      <div class="weui-navbar">
        <div class="weui-navbar__item weui-bar__item_on">
          {{ titles[path] }}
        </div>
      </div>
      <div class="weui-tab__panel">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </div>
      <div class="weui-tabbar">
        <router-link to='/'
          :class="{ 'weui-tabbar__item': true, 'weui-bar__item_on': path === '/' }"
          @click.native="click">
          <img src="../assets/img/notification.png" alt="" class="weui-tabbar__icon">
          <p class="weui-tabbar__label">通知公告</p>
        </router-link>
        <router-link to='/material'
          :class="{ 'weui-tabbar__item': true, 'weui-bar__item_on': path === '/material' }"
          @click.native="click">
          <img src="../assets/img/material.png" alt="" class="weui-tabbar__icon">
          <p class="weui-tabbar__label">物资申请</p>
        </router-link>
        <router-link to='/meeting'
          :class="{ 'weui-tabbar__item': true, 'weui-bar__item_on': path === '/meeting' }"
          @click.native="click">
          <img src="../assets/img/meeting.png" alt="" class="weui-tabbar__icon">
          <p class="weui-tabbar__label">会议室预约</p>
        </router-link>
        <router-link to='/account'
          :class="{ 'weui-tabbar__item': true, 'weui-bar__item_on': path === '/account' }"
          @click.native="click">
          <img src="../assets/img/account.png" alt="" class="weui-tabbar__icon">
          <p class="weui-tabbar__label">部门账号</p>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      titles: {
        '/': '通知公告',
        '/material': '物资申请',
        '/meeting': '会议室预约',
        '/account': '部门账号',
        '/logmsg': '请登录'
      },
      path: window.location.pathname
    }
  },
  methods: {
    click () {
      this.path = window.location.pathname
    }
  }
}
</script>

<style scoped>
.weui-navbar__item {
  padding: 13px 0 !important;
  background-color: #304758 !important;
  color: #FFFFFF !important;
}
.weui-tab__panel {
  padding-bottom: 60px !important;
}
</style>
