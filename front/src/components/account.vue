<template>
  <div id="account">
    <div v-show="infoEdit">
      <div class="weui-msg">
        <div class="weui-msg__icon-area"><i class="weui-icon-info weui-icon_msg"></i></div>
        <h2 class="weui-msg__title">信息更改</h2>
        <p class="weui-msg__desc">请完善部长信息用以审核授权</p>
        <div class="weui-msg__opr-area">
          <div class="weui-cells weui-cells_form">
            <div class="weui-cell">
              <div class="weui-cell__hd">
                <label class="weui-label">姓名</label>
              </div>
              <div class="weui-cell__bd">
                <input class="weui-input" type="text" placeholder="请输入部长姓名" v-model="name">
              </div>
            </div>
            <div class="weui-cell">
              <div class="weui-cell__hd">
                <label class="weui-label">手机</label>
              </div>
              <div class="weui-cell__bd">
                <input class="weui-input" type="number" placeholder="请输入部长手机" v-model="phone">
              </div>
            </div>
          </div>
        </div>
        <div class="weui-msg__opr-area">
          <p class="weui-btn-area">
            <a @click="updateUser" class="weui-btn weui-btn_primary">修改</a>
            <a @click="clickInfoEdit" class="weui-btn weui-btn_warn">取消</a>
          </p>
        </div>
      </div>
    </div>
    <div v-show="passEdit">
      <div class="weui-msg">
        <div class="weui-msg__icon-area"><i class="weui-icon-warn weui-icon_msg-primary"></i></div>
        <h2 class="weui-msg__title">密码更改</h2>
        <p class="weui-msg__desc">初始密码为123456，首次登录请自行更改密码</p>
        <div class="weui-msg__opr-area">
          <div class="weui-cells weui-cells_form">
            <div class="weui-cell">
              <div class="weui-cell__hd">
                <label class="weui-label">新密码</label>
              </div>
              <div class="weui-cell__bd">
                <input class="weui-input" type="password" placeholder="请输入密码" v-model="npasswd">
              </div>
            </div>
            <div class="weui-cell">
              <div class="weui-cell__hd">
                <label class="weui-label"></label>
              </div>
              <div class="weui-cell__bd">
                <input class="weui-input" type="password" placeholder="请再次输入密码" v-model="ncpasswd">
              </div>
            </div>
          </div>
        </div>
        <div class="weui-msg__opr-area">
          <p class="weui-btn-area">
            <a @click="updateUser" class="weui-btn weui-btn_primary">修改</a>
            <a @click="clickPassEdit" class="weui-btn weui-btn_warn">取消</a>
          </p>
        </div>
      </div>
    </div>
    <div v-show="!infoEdit && !passEdit">
      <div class="weui-cells__title">部门信息</div>
      <div class="weui-cells weui-cells_form">
        <div class="weui-cell">
          <div class="weui-cell__hd">
            <label class="weui-label">部门</label>
          </div>
          <div class="weui-cell__bd">{{ user.account }}</div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__hd">
            <label class="weui-label">部长</label>
          </div>
          <div class="weui-cell__bd">{{ user.name ? user.name : '请完善信息' }}</div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__hd">
            <label class="weui-label">手机</label>
          </div>
          <div class="weui-cell__bd">{{ user.phone ? user.phone : '请完善信息' }}</div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__hd">
            <label class="weui-label">钱包</label>
          </div>
          <div class="weui-cell__bd">{{ '￥' + user.wallet }}</div>
        </div>
      </div>
      <div class="weui-cells__title">物资申请</div>
      <div class="weui-cells">
        <a class="weui-cell weui-cell_access" v-for="matbook in matbooks" @click="failMatbook(matbook._id)">
          <div class="weui-cell__bd">
            活动：{{ matbook.activity }}<br>
            预约人：{{ matbook.name }} ({{ matbook.phone }})<br>
            领取时间：{{ matbook.takeDate }}<br>
            归还时间：{{ matbook.returnDate }}<br>
            借用物资：<label v-for="(material, index) of matbook.materials"><b>({{ index + 1 }})&nbsp{{ material.material.name }} × {{ material.book }}&nbsp&nbsp</b></label><br>
            目前状态：{{ cond[matbook.cond] }}
          </div>
          <div class="weui-cell__ft"></div>
        </a>
        <div class="weui-cell" v-show="!matbooks.length">
          <div class="weui-cell__bd">暂无物资申请记录</div>
        </div>
      </div>
      <div class="weui-cells__title">会议室预约</div>
      <div class="weui-cells">
        <a class="weui-cell weui-cell_access" v-for="metbook in metbooks" @click="failMetbook(metbook._id)">
          <div class="weui-cell__bd">
            会议：{{ metbook.activity }}<br>
            预约人：{{ metbook.name }} ({{ metbook.phone }})<br>
            预约日期：{{ metbook.date }}<br>
            预约时间：{{ metbook.time }}
          </div>
          <div class="weui-cell__ft"></div>
        </a>
        <div class="weui-cell" v-show="!metbooks.length">
          <div class="weui-cell__bd">暂无会议室预约记录</div>
        </div>
      </div>
      <div class="weui-cells__title">部门账号设置</div>
      <div class="weui-cells">
        <a class="weui-cell weui-cell_access" @click="clickInfoEdit">
          <div class="weui-cell__hd"><label class="weui-label">信息更改</label></div>
          <div class="weui-cell__bd"></div>
          <div class="weui-cell__ft"></div>
        </a>
        <a class="weui-cell weui-cell_access" @click="clickPassEdit">
          <div class="weui-cell__hd"><label class="weui-label">密码更改</label></div>
          <div class="weui-cell__bd"></div>
          <div class="weui-cell__ft"></div>
        </a>
      </div>
      <div class="weui-msg__opr-area">
        <p class="weui-btn-area">
          <a @click="logout" class="weui-btn weui-btn_warn">注销</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../api'
import logmsg from './logmsg'
import weui from 'weui.js'
export default {
  components: {
    logmsg
  },
  data () {
    return {
      userId: this.$store.state.user.id,
      user: {},
      name: '',
      phone: '',
      npasswd: '',
      ncpasswd: '',
      infoEdit: false,
      passEdit: false,
      matbooks: [],
      metbooks: [],
      cond: [ '预约', '借出', '归还', '作废' ]
    }
  },
  activated () {
    this.getUser()
    const level = this.$store.state.user.level
    if (level > 0) this.getMatbooks()
    if (level > 1) this.getMetbooks()
  },
  methods: {
    clickInfoEdit () {
      this.infoEdit = !this.infoEdit
      this.name = ''
      this.phone = ''
      this.npasswd = ''
      this.ncpasswd = ''
    },
    clickPassEdit () {
      this.passEdit = !this.passEdit
      this.name = ''
      this.phone = ''
      this.npasswd = ''
      this.ncpasswd = ''
    },
    logout () {
      this.$store.dispatch('logout')
    },
    getUser () {
      api.handleApi(api.getUsers({ id: this.userId }), res => {
        this.user = res.body
      }, '正在获取信息')
    },
    updateUser () {
      if (this.name && this.phone) {
        api.handleApi(api.putUsers({
          _id: this.userId,
          name: this.name,
          phone: this.phone
        }), res => {
          this.clickInfoEdit()
          this.getUser()
          weui.toast('更新信息成功', 1500)
        }, '正在更新信息')
      } else if (this.npasswd && this.ncpasswd) {
        if (this.npasswd === this.ncpasswd) {
          api.handleApi(api.putUsers({
            _id: this.userId,
            password: this.npasswd
          }), res => {
            this.clickPassEdit()
            this.getUser()
            weui.toast('更新信息成功', 1500)
          }, '正在更新信息')
        } else {
          weui.alert('两次密码不一致')
        }
      } else {
        weui.alert('请正确填写信息')
      }
    },
    getMatbooks () {
      api.handleApi(api.getMatbooks({ user: this.userId }), res => {
        this.matbooks = res.body.list
      }, '正在获取信息')
    },
    failMatbook (_id) {
      weui.actionSheet([{
        label: '撤销申请',
        onClick: () => {
          api.handleApi(api.putMatbooks({ _id, cond: 3 }), res => {
            weui.toast('撤销成功', 1500)
            this.getMatbooks()
          }, '正在撤销')
        }
      }], [{
        label: '取消',
        onClick: () => {}
      }])
    },
    getMetbooks () {
      api.handleApi(api.getMetbooks({ user: this.userId }), res => {
        this.metbooks = res.body.list
      }, '正在获取信息')
    },
    failMetbook (_id) {
      weui.actionSheet([{
        label: '撤销申请',
        onClick: () => {
          api.handleApi(api.putMetbooks({ _id, cond: 3 }), res => {
            weui.toast('撤销成功', 1500)
            this.getMetbooks()
          }, '正在撤销')
        }
      }], [{
        label: '取消',
        onClick: () => {}
      }])
    }
  }
}
</script>
