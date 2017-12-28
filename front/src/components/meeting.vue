<template>
  <div id="meeting">
    <div class="weui-cells__title">预约人信息填写</div>
    <div class="weui-cells weui-cells_form">
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <label class="weui-label">预约人</label>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" type="text" placeholder="请输入姓名" v-model="name">
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <label class="weui-label">联系方式</label>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" type="number" pattern="[0-9]*" placeholder="请输入手机号" v-model="phone">
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__hd"><label class="weui-label">会议名称</label></div>
        <div class="weui-cell__bd">
          <input class="weui-input" type="text" placeholder="请输入会议名称" v-model="activity">
        </div>
      </div>
    </div>
    <div class="weui-cells__title">借用时间预约选择</div>
    <div class="weui-cells">
      <a class="weui-cell weui-cell_access" @click="datePick">
        <div class="weui-cell__hd"><label class="weui-label">借用日期</label></div>
        <div class="weui-cell__bd">
          <p>{{ date }}</p>
        </div>
        <div class="weui-cell__ft"></div>
      </a>
      <a class="weui-cell weui-cell_access" @click="timePick">
        <div class="weui-cell__hd"><label class="weui-label">借用时间段</label></div>
        <div class="weui-cell__bd">
          <p>{{ time }}</p>
        </div>
        <div class="weui-cell__ft"></div>
      </a>
    </div>
    <div v-if="isProj" class="weui-cells__title">投影仪借用申请</div>
    <div v-else class="weui-cells__title">投影仪暂停借用</div>
    <div v-if="isProj" class="weui-cells weui-cells_checkbox">
      <label class="weui-cell weui-check__label" for="projection">
        <div class="weui-cell__hd">
          <input type="checkbox" class="weui-check" name="checkbox" id="projection" v-model="proj">
          <i class="weui-icon-checked"></i>
        </div>
        <div class="weui-cell__bd">
          <p>需要借用投影仪</p>
        </div>
      </label>
    </div>
    <div class="weui-cells__tips">说明：请准确填写预约人姓名、联系方式和借用时间，否则研会办公室将拒绝申请。只允许预约往后五天内（包括今天）的会议室，若某个借用时间没有出现在选择列表中，则表明该时间已被预约。对于特殊情况，请联系办公室物资管理人员进行协商。</div>
    <p class="weui-btn-area">
      <a @click="createMetbook"
        :class="{ 'weui-btn': true, 'weui-btn_primary': true, 'weui-btn_disabled': !isEnable }">
        {{ isEnable ? '提交申请' : '暂停申请' }}
      </a>
    </p>
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
      user: this.$store.state.user.id,
      name: '',
      phone: '',
      activity: '',
      date: '请选择日期',
      time: '请先选择借用日期',
      proj: false,
      isEnable: true,
      isProj: true,
      occupiedTime: {}
    }
  },
  activated () {
    api.handleApi(api.getMeetings({ settings: true }), res => {
      this.isEnable = res.body.enable
      this.isProj = res.body.proj
      if (!this.isProj) this.proj = false
    }, '正在获取状态')
  },
  methods: {
    createMetbook () {
      if (!this.isEnable) return
      if (this.name && this.phone && this.activity && this.date !== '请选择日期' &&
        this.time !== '请先选择借用日期' && this.time !== '请选择时间') {
        api.handleApi(api.postMetbooks({
          user: this.user,
          name: this.name,
          phone: this.phone,
          activity: this.activity,
          date: this.date,
          time: this.time,
          proj: this.proj
        }), res => {
          weui.toast('提交成功', 1500)
          this.name = ''
          this.phone = ''
          this.activity = ''
          this.date = '请选择日期'
          this.time = '请先选择借用日期'
          this.proj = false
        }, '正在提交')
      } else {
        weui.alert('请正确填写信息')
      }
    },
    datePick () {
      const now = new Date()
      const day = ['日', '一', '二', '三', '四', '五', '六']
      const end = new Date()
      const dateList = []
      for (let i = 0; i !== 5; ++i) {
        end.setTime(now.getTime() + 86400000 * i)
        dateList.push({
          label: `${end.getFullYear()}年${end.getMonth() + 1}月${end.getDate()}日（周${day[end.getDay()]}）`,
          value: i
        })
      }
      weui.picker(dateList, {
        onConfirm: (result) => {
          this.date = result[0].label
          this.time = '请选择时间'
        },
        id: 'date-picker'
      })
    },
    timePick () {
      if (this.time !== '请先选择借用日期') {
        api.handleApi(api.getMeetings({ settings: true }), res => {
          this.occupiedTime = res.body
          const options = []
          const times = [
            '8:00-9:00',
            '9:00-10:00',
            '10:00-11:00',
            '11:00-12:00',
            '12:00-13:00',
            '13:00-14:00',
            '14:00-15:00',
            '15:00-16:00',
            '16:00-17:00',
            '17:00-18:00',
            '18:00-19:00',
            '19:00-20:00',
            '20:00-21:00',
            '21:00-22:00'
          ]
          for (let index in times) {
            if (!this.occupiedTime[`${this.date}${times[index]}`]) {
              options.push({
                label: times[index],
                value: index
              })
            }
          }
          if (options.length === 0) {
            options.push({
              label: '该日所有时间段均被预约',
              value: -1
            })
          }
          weui.picker(options, {
            onConfirm: (result) => {
              if (result[0].value !== -1) {
                this.time = result[0].label
              }
            },
            id: 'time-picker'
          })
        }, '正在加载列表')
      }
    }
  }
}
</script>
