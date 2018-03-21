<style scoped>
.standard{
    margin-top:20px;
    margin-bottom: 20px;
    margin-left:80px;
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
}
li,p{
  margin-top:8px;
  margin-left:20px;
  margin-right: 10px;
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  font-size: 12px;  
}
h3{
  margin-top: 10px;
  margin-left: 15px;
}
.blank{
  padding: 100px;
}
.icon{
  opacity: 0.5;
}
.icon:hover{
  opacity: 1.0;
}
.float-left{
  float: left;
}
.matBookItem{
  margin-left:60px;
  margin-top:28px;
}
.deleteIcon{
  margin-left:10px;
}
.input{
  width: 200px;
}
.center{
  margin-top: 50px;
  text-align:center; 
  width:100%;
  height:100%;
  margin:0px;
}
.gold{
  width: 12px;
  height: 12px;
  top:1px;
  position: relative;
}
.emphasize{
  font-weight: bold;
  color:#FF9900;
  }
</style>
<template>
  <div id="material">
    <h3>负责人及活动信息</h3>
    <p></p>
      <Form :model="formRight" label-position="right" :label-width="80">
        <FormItem label="负责人">
            <Input class="input" v-model="name" placeholder="请输入姓名"></Input>
        </FormItem>
        <FormItem label="手机">
            <Input class="input" v-model="phone"  pattern="[0-9]*" placeholder="请输入手机号"></Input>
        </FormItem>
        <FormItem label="活动名称">
            <Input class="input" v-model="activity"   placeholder="请输入用于的活动"></Input>
        </FormItem>
        </Form>
        <div>
        <p class="float-left">归还时间</p>
         <Row  class="standard">
        <Col span="12">
            <DatePicker type="date" :options="options1" placeholder="请选择归还时间" :editable=false style="width: 200px" v-model="returnDate1"></DatePicker>
        </Col>
        </Row>
      </div>

        <p class="float-left">物资借用</p>
        <ol class="matBookItem">
          <li v-for="matbookItem in matbookItems"><span style="color:#FF9900">●</span> {{matbookItem.label}}
            <a @click="delItem(matbookItem)" class="deleteIcon"><Icon class="icon" type="minus-circled"  color="red" /> </a>
            &nbsp&nbsp <img src="../assets/img/gold.png" class="gold"> {{ materials[matbookItem.index].price }}
          </li>
        </ol>
       <Cascader style="width:150px" class="standard" v-model="value1" :data="item1" placeholder="请选择物资" :render-format="format"  @on-change="handleChange"> 
       </Cascader>
       <p v-show=" matbookItems">合计： &nbsp<img src="../assets/img/gold.png" class="gold"> <span style="font-weight:bold">{{ total }}</span></p>
        <div  style="padding:20px;text-align:left">
        <Card dis-hover>
            <p>- 物资借用<span class="emphasize">不能再进行预约</span>，借用后即从库存中扣除，所以请勿提前借用。如出现数量不足，请联系办公室补充采购，通过提升库存量解决多部门使用的问题；</p>
            <p>- 物资系统<span class="emphasize">只管理大件物资租借</span>，没有出现在系统上的物资，在物资室有的可自行借用，用完有剩余的放回物资室，以供后用；</p>
            <p>- 归还物资时请将物资<span class="emphasize">有序放回原位</span>，保持物资室的整齐，不按要求的部门将扣除一定量金币；</p>
            <p>- 金币用于兑换或使用特殊物资，如蓝牙音箱，华工羊城通，矿泉水等。</p>
        </Card>
        </div>    
        <div  class="center">
        <Button type="success" :disabled="!isEnable" @click="createMatbook"> {{ isEnable ? '提交申请' : '暂停申请' }}</Button>
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
      user: this.$store.state.user.id,
      name: '',
      phone: '',
      activity: '',
      takeDate: '',
      returnDate: '',
      matbookItems: [],           // 已选物资
      materials: [],              // 默认物资列表
      isEnable: false,
      options1: {
        disabledDate (date) {
          const disabledDay = date.getDay()
          return date && (date.valueOf() < Date.now() - 86400000) || (disabledDay === 4) // const disabledDay = date.getDay();   //用一个变量获取这个日期是星期几
                       // return disabledDay === 4;           //把星期四的全部禁用
        }
      },
      item1: [],                        // 级联选择器数组
      value1: [],                       // 存储级联选择器的值
      returnDate1: '',
      total: 0
    }
  },
  activated () {
    api.handleApi(api.getMaterials({ settings: true }), res => {
      this.isEnable = res.body.enable
    }, '正在获取状态')
  },
  created () {
    this.pickMaterial2()
  },
  methods: {
    format (labels, selectedData) {
      if (selectedData[1]) {
        return '继续选择'
      }
    },
    handleChange (labels, selectedData) {
      let isSelected = false                                             // 判断是否已选
      let val1 = selectedData[1].value
      let n = 0
      for (let i = 0; i < this.matbookItems.length; ++i) {
        if (this.matbookItems[i].index === val1) {
          isSelected = true
          n = i
          break
        }
      }
      if (!isSelected) {
        this.matbookItems.push({
          index: selectedData[1].value,
          label: selectedData[1].label + ' x ' + selectedData[2].label,
          material: this.materials[selectedData[1].value]._id,
          book: selectedData[2].value
        })
      } else {
        this.matbookItems[n].label = selectedData[1].label + ' x ' + selectedData[2].label
        this.matbookItems[n].book = selectedData[2].value
      }
      this.$options.methods.calculate.bind(this)()  // 刷新价格
    },
    delItem (matbookItem) {
      let index = this.matbookItems.indexOf(matbookItem)
      this.matbookItems.splice(index, 1)
      this.$options.methods.calculate.bind(this)()  // 刷新价格
    },
    calculate () {
      this.total = 0
      for (let i = 0; i < this.matbookItems.length; ++i) {
        this.total += this.materials[this.matbookItems[i].index].price * this.matbookItems[i].book
      }
    },
    createMatbook () {    // 提交表单
      if (this.returnDate1) {           // 格式化日期
        const end1 = new Date()
        const end2 = this.returnDate1
        const days = ['日', '一', '二', '三', '四', '五', '六']
        this.takeDate = `${end1.getFullYear()}年${end1.getMonth() + 1}月${end1.getDate()}日（周${days[end1.getDay()]}）`
        this.returnDate = `${end2.getFullYear()}年${end2.getMonth() + 1}月${end2.getDate()}日（周${days[end2.getDay()]}）`
      }
      if (!this.isEnable) return
      if (this.name && this.phone && this.activity &&
        this.takeDate && this.returnDate && this.matbookItems.length) {    // 选了日期且已选物资的长度不等于0
        api.handleApi(api.postMatbooks({
          user: this.user,
          name: this.name,
          phone: this.phone,
          activity: this.activity,
          takeDate: this.takeDate,
          returnDate: this.returnDate,
          materials: this.matbookItems
        }), res => {
          weui.toast('提交成功', 1500)
          this.name = ''
          this.phone = ''
          this.activity = ''
          this.takeDate = '请选择日期'
          this.returnDate = '请先选择领取日期'
          this.matbookItems = []
        }, '正在提交')
      } else {
        weui.alert('请正确填写信息')
      }
    },
    pickMaterial2 () {                 // 选择物资
      api.handleApi(api.getMaterials(), res => {  // 用api.getmaterials通信
        this.materials = res.body.list
        this.materials.push({})
        this.item1 = []
        let children = []
        for (let i = 0; i < this.materials.length - 1; ++i) {    // 显示物资
          let grandson = [ ]
          for (let j = 1; j < this.materials[i].left + 1; ++j) {
            grandson.push({
              label: j + this.materials[i].unit,
              value: j
            })
          } if (grandson.length === 0) {
            grandson.push({
              label: '已借空',
              value: 0,
              disabled: true
            })
          }
          children.push({
            label: this.materials[i].name,    // this.materials[i].left+this.materials[i].unit,
            value: i,
            children: grandson
          })
          if (this.materials[i + 1].type !== this.materials[i].type) {
            if (children.length) {
              this.item1.push({
                label: this.materials[i].type,
                value: i,
                children
              })
            }children = []
          }
        }
      }, '正在加载列表')
    },
    pickMaterial () {                 // 选择物资
      api.handleApi(api.getMaterials(), res => {  // 通信
        this.materials = res.body.list
        this.materials.push({})
        const options = []
        let children = []
        for (let i = 0; i < this.materials.length - 1; ++i) {   // 显示i项物资
          let isSelected = false                // 已选物资不显示
          for (const materialBookItem of this.matbookItems) {
            if (materialBookItem.index === i) {
              isSelected = true
              break
            }
          }
          if (!isSelected) {
            children.push({                                 // 如果没被选的,json推入children数组
              label: this.materials[i].name,
              value: i
            })
          }
          if (this.materials[i + 1].type !== this.materials[i].type) {  // 如果第i+1项的类型和第i项的类型不一样
            if (children.length) {
              options.push({                                          // 选择器中推入类别和该类别下的物资
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
              this.matbookItems.push({
                index: result[1].value,        // 物资编号
                material: this.materials[result[1].value]._id,
                book: 0                        // 已选数目
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
