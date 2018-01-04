<template>
  <div id="log" class="full-screen">
    <div class="weui-msg">
      <div class="weui-msg__icon-area"><i class="weui-icon-waiting weui-icon_msg"></i></div>
      <h2 class="weui-msg__title">登录</h2>
      <p class="weui-msg__desc">【初始密码为123456】</p>
      <p class="weui-msg__desc">首次登录请更改密码完善资料</p>
      <p class="weui-msg__desc">审核通过后方能获得操作权限</p>
      <div class="weui-msg__opr-area">
        <div class="weui-cells weui-cells_form">
          <a class="weui-cell weui-cell_access" @click="getAccountList">
            <div class="weui-cell__hd"><label class="weui-label">部门</label></div>
            <div class="weui-cell__bd">
              <p class="account-text">{{ user.account }}</p>
            </div>
            <div class="weui-cell__ft"></div>
          </a>
          <div class="weui-cell">
            <div class="weui-cell__hd">
              <label class="weui-label">密码</label>
            </div>
            <div class="weui-cell__bd">
              <input class="weui-input" type="password" placeholder="请输入密码" v-model="user.password">
            </div>
          </div>
        </div>
      </div>
      <div class="weui-msg__opr-area">
        <p class="weui-btn-area">
          <a @click="login" class="weui-btn weui-btn_primary">登录</a>
          <router-link to="/" class="weui-btn weui-btn_warn">取消</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../api'
import weui from 'weui.js'
export default {
  data () {
    return {
      user: {
        account: '请选择部门',
        password: ''
      }
    }
  },
  methods: {
    login () {
      if (this.user.account !== '请选择部门' && this.user.password) {
        this.$store.dispatch('login', this.user)
      }
    },
    getAccountList () {
      api.handleApi(api.getUsers(), res => {
        const options = []
        res.body.list.forEach((user, index) => {
          options.push({
            label: user.account,
            value: index
          })
        })
        if (!options.length) {
          options.push({
            label: '无',
            value: -1
          })
        }
        weui.picker(options, {
          onConfirm: result => {
            if (result[0].value !== -1) {
              this.user.account = result[0].label
            }
          },
          id: 'user-picker'
        })
      }, '正在加载列表')
    }
  }
}
</script>

<style scoped>
.account-text {
  text-align: left !important;
}
</style>
