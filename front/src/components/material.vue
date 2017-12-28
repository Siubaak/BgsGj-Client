<template>
  <div id="material">
    <div class="weui-cells__title">预约人及活动信息填写</div>
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
        <div class="weui-cell__hd"><label class="weui-label">活动名称</label></div>
        <div class="weui-cell__bd">
          <input class="weui-input" type="text" placeholder="请输入活动名称" v-model="activity">
        </div>
      </div>
    </div>
    <div class="weui-cells__title">领取时间及归还时间预约选择</div>
    <div class="weui-cells">
      <a class="weui-cell weui-cell_access" @click="pickTakeData">
        <div class="weui-cell__hd"><label class="weui-label">领取日期</label></div>
        <div class="weui-cell__bd">
          <p>{{ takeDate }}</p>
        </div>
        <div class="weui-cell__ft"></div>
      </a>
      <a class="weui-cell weui-cell_access" @click="pickReturnDate">
        <div class="weui-cell__hd"><label class="weui-label">归还日期</label></div>
        <div class="weui-cell__bd">
          <p>{{ returnDate }}</p>
        </div>
        <div class="weui-cell__ft"></div>
      </a>
    </div>
    <div class="weui-cells__title">物资列表填写</div>
    <div class="weui-cells">
      <a class="weui-cell weui-cell_access"
        @click="pickNumber(index, materialBookItem, materials[materialBookItem.index].left)"
        v-for="(materialBookItem, index) in materialBookItems"
        :key="index"
      >
        <div class="weui-cell__hd"><label class="weui-label">{{ materials[materialBookItem.index].name }}</label></div>
        <div class="weui-cell__bd">
          <p v-show="!materialBookItem.book">请选择数量，剩余{{ materials[materialBookItem.index].left }}{{ materials[materialBookItem.index].unit }}</p>
          <p v-show="materialBookItem.book">{{ materialBookItem.book }}{{ materials[materialBookItem.index].unit }}</p>
        </div>
        <div class="weui-cell__ft"></div>
      </a>
      <a class="weui-cell weui-cell_access" @click="pickMaterial">
        <div class="weui-cell__bd">
          <p>添加</p>
        </div>
        <div class="weui-cell__ft"></div>
      </a>
    </div>
    <div class="weui-cells__tips">说明：请准确填写预约人姓名、联系方式、活动名称、领取时间、归还时间和物资借用列表，否则研会办公室将拒绝申请。只允许预约往后五天内（包括今天）的物资借用，并在领取后五天（包括领取当天）内归还，若某类物资没有出现在添加列表中，则表明该物资已全部被预约或借用。物资领取时间及归还时间均为办公室值班时间，即每周一、三、五下午17:30-18:00。对于特殊情况，请联系办公室物资管理人员进行协商。</div>
    <p class="weui-btn-area">
      <a @click="createMatbook" class="weui-btn weui-btn_primary">提交申请</a>
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
      takeDate: '请选择日期',
      returnDate: '请先选择领取日期',
      materialBookItems: [],
      materials: []
    }
  },
  methods: {
    createMatbook () {
      if (this.name && this.phone && this.activity &&
        this.takeDate !== '请选择日期' && this.returnDate !== '请先选择领取日期' &&
        this.returnDate !== '请选择日期' && this.materialBookItems.length) {
        api.handleApi(api.postMatbooks({
          user: this.user,
          name: this.name,
          phone: this.phone,
          activity: this.activity,
          takeDate: this.takeDate,
          returnDate: this.returnDate,
          materials: this.materialBookItems
        }), res => {
          weui.toast('提交成功', 1500)
          this.name = ''
          this.phone = ''
          this.activity = ''
          this.takeDate = '请选择日期'
          this.returnDate = '请先选择领取日期'
          this.materialBookItems = []
        }, '正在提交')
      } else {
        weui.alert('请正确填写信息')
      }
    },
    pickTakeData () {
      const now = new Date()
      const day = ['日', '一', '二', '三', '四', '五', '六']
      const end = new Date()
      const dateList = []
      for (let i = 0; i !== 5; ++i) {
        end.setTime(now.getTime() + 86400000 * i)
        if (end.getDay() === 1 || end.getDay() === 3 || end.getDay() === 5) {
          dateList.push({
            label: `${end.getFullYear()}年${end.getMonth() + 1}月${end.getDate()}日（周${day[end.getDay()]}）`,
            value: i
          })
        }
      }
      weui.picker(dateList, {
        onConfirm: (result) => {
          this.takeDate = result[0].label
          this.returnDate = '请选择日期'
        },
        id: 'take-date-picker'
      })
    },
    pickReturnDate () {
      if (this.returnDate !== '请先选择领取日期') {
        const day = ['日', '一', '二', '三', '四', '五', '六']
        const yearIndex = this.takeDate.indexOf('年')
        const monthIndex = this.takeDate.indexOf('月')
        const dateIndex = this.takeDate.indexOf('日')
        const startDate = new Date()
        startDate.setFullYear(
          parseInt(this.takeDate.slice(0, yearIndex)),
          parseInt(this.takeDate.slice(yearIndex + 1, monthIndex) - 1),
          parseInt(this.takeDate.slice(monthIndex + 1, dateIndex)))
        const end = new Date()
        const dateList = []
        for (let i = 0; i !== 5; ++i) {
          end.setTime(startDate.getTime() + 86400000 * i)
          if (end.getDay() === 1 || end.getDay() === 3 || end.getDay() === 5) {
            dateList.push({
              label: `${end.getFullYear()}年${end.getMonth() + 1}月${end.getDate()}日（周${day[end.getDay()]}）`,
              value: i
            })
          }
        }
        weui.picker(dateList, {
          onConfirm: (result) => {
            this.returnDate = result[0].label
          },
          id: 'return-date-picker'
        })
      }
    },
    pickNumber (index, materialBookItem, n) {
      const options = []
      options.push({
        label: '删除',
        value: 0
      })
      for (let i = 1; i <= n; ++i) {
        options.push({
          label: i,
          value: i
        })
      }
      weui.picker(options, {
        defaultValue: [1],
        onConfirm: (result) => {
          if (result[0].value) {
            materialBookItem.book = result[0].value
          } else {
            this.materialBookItems.splice(index, 1)
          }
        },
        id: 'number-picker'
      })
    },
    pickMaterial () {
      api.handleApi(api.getMaterials(), res => {
        this.materials = res.body.list
        this.materials.push({})
        const options = []
        let children = []
        for (let i = 0; i < this.materials.length - 1; ++i) {
          let isSelected = false
          for (const materialBookItem of this.materialBookItems) {
            if (materialBookItem.index === i) {
              isSelected = true
              break
            }
          }
          if (!isSelected) {
            children.push({
              label: this.materials[i].name,
              value: i
            })
          }
          if (this.materials[i + 1].type !== this.materials[i].type) {
            if (children.length) {
              options.push({
                label: this.materials[i].type,
                children
              })
              children = []
            } else {
              options.push({
                label: this.materials[i].type,
                children: [{
                  label: '无',
                  value: -1
                }]
              })
            }
          }
        }
        if (options.length === 0) {
          options.push({ label: '无', value: -1 })
        }
        weui.picker(options, {
          onConfirm: result => {
            if (result[1] && result[1].value !== -1) {
              this.materialBookItems.push({
                index: result[1].value,
                material: this.materials[result[1].value]._id,
                book: 0
              })
            }
          },
          id: 'material-picker'
        })
      }, '正在加载列表')
    }
  }
}
</script>
