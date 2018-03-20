<style scoped>
.standard{
    margin-top:20px;
    margin-bottom: 20px;
    margin-left:80px;
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
}
li,p{
  margin-top:2px;
  margin-left:20px;
  margin-right: 10px;
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  font-size: 12px;  
}
h3{
  margin-top: 10px;
  margin-left: 15px;
}
.table{
  margin-left:20px;
  margin-top: 10px; 
}
.cancel{
  float: right;
  margin-right:10px;
}
.met-head{
  font-weight: bold;
  color: cornflowerblue;
}
.information-space{
  padding: 5px;
}
.information-text{
  margin-left: 30px;
}
.distance{
  margin-top: 15px;
}
.icon{
  opacity: 0.6;
}
.icon:hover{
  opacity: 1.0;
}
.cond{
  width: 50px;
  heigth:50px;
  float: right;
}
.table{
  margin: 10px;
}
.gray{
  background: #eee;
  margin-top: 15px;
}
</style>
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
      <div> 
        <h3>部门信息
            <Button class="cancel" type="error" size="small"  @click="logout">注销</Button>
        </h3>
        <card class="distance" dis-hover :bordered="false"> 
          <div class="information-space"><label>部门</label><label class="information-text">{{user.account}}</label></div>
          <div class="information-space"><label>部长</label><label class="information-text">{{user.name ? user.name : '请完善信息'}}</label></div>
          <div class="information-space"><label>手机</label><label class="information-text">{{user.phone ? user.phone : '请完善信息'}}</label></div>
          <div class="information-space"><label>钱包</label><label class="information-text">{{user.wallet + '￥'}}</label></div>
          <div>
            <Tooltip content="编辑信息"><Button type="primary" shape="circle" icon="edit" @click="clickInfoEdit"></Button></Tooltip>
            <Tooltip content="修改密码"><Button type="primary" shape="circle" icon="ios-gear" @click="clickPassEdit"></Button></Tooltip>
          </div>
        </card>
        <card class="gray" >
          <Tabs size="small">
            <TabPane label="物资借用">
              <card v-for="(matbook,index) of matbooks" class="distance">
                  <p slot="title">
                    {{matbook.activity}}
                    <Button v-show="matbook.cond === 0" class="cancel" type="error" size="small"  @click="cancelMatbook(matbook._id)">撤销</Button>
                  </p>
                  <p>{{matbook.name}} <a :href="'tel:' + matbook.phone">{{matbook.phone}}</a>
                  <img v-show="matbook.cond === 0" class="cond" src="../assets/img/book.png">
                  <img v-show="matbook.cond === 1" class="cond" src="../assets/img/lent.png"></p>
                  <p>{{ matbook.takeDate }}借用</p>
                  <p>{{ matbook.returnDate }}将归还</p>
                  <Table class="table" size="small" stripe :columns="columns1" :data="data1[index]"></Table>
                  <Button v-show="matbook.cond !== 1" size="small" @click="lentMatbook(matbook._id)">借出</Button>
                  <Button size="small" disabled>转交</Button>
              </card>
            </TabPane>
            <TabPane label="会议预约">
              <card v-for="metbook in metbooks">
                  <span class="met-head">会议：{{ metbook.activity }}</span><Button class="cancel"  size="small" icon="log-out" shape="circle" @click="cancelMetbook(metbook._id)"></Button><br>
                  预约人：{{ metbook.name }} ({{ metbook.phone }})<br>
                  预约日期：{{ metbook.date }}<br>
                  预约时间：{{ metbook.time }}<br>
              </card>
            </TabPane>
          </Tabs> 
        </card>
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
      cond: [ '预约', '借出', '归还', '作废' ],
      columns1: [
        {
          title: '名称',
          key: 'name'
        },
        {
          title: '数量',
          key: 'book'
        },
        {
          title: '单位',
          key: 'material'
        }
      ],
      data1: [],
      data2: this.getMockData(),
      targetKeys1: this.getTargetKeys()
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
        this.matbooks.forEach((value, i) => {
          this.data1[i] = []
          for (let j = 0; j < value.materials.length; ++j) {
            this.data1[i].push({
              key: (j + 1).toString(),
              name: value.materials[j].material.name,
              book: value.materials[j].book
            })
          }
        })
      }, '正在获取信息')
    },
    lentMatbook (_id) {
      this.$Modal.confirm({
        content: '<p>是否验收无误，并确认借出物资？</p>',
        onOk: () => {
          api.handleApi(api.putMatbooks({
            _id, cond: 1}), res => {
            this.$Message.info('已借出')
            this.getMatbooks()
          }, '正在借出')
        },
        onCancel: () => {}
      })
    },
    getMetbooks () {
      api.handleApi(api.getMetbooks({ user: this.userId }), res => {
        this.metbooks = res.body.list
      }, '正在获取信息')
    },
    cancelMatbook (_id) {
      this.$Modal.confirm({
        content: '<p>是否撤销该项申请？</p>',
        onOk: () => {
          api.handleApi(api.putMatbooks({ _id, cond: 3 }), res => {
            this.$Message.info('撤销成功')
            this.getMatbooks()
          }, '正在撤销')
        },
        onCancel: () => {}
      })
    },
    cancelMetbook (_id) {
      this.$Modal.confirm({
        content: '<p>是否取消会议预约？</p>',
        onOk: () => {
          api.handleApi(api.putMetbooks({ _id, cond: 3 }), res => {
            weui.toast('取消成功', 1500)
            this.getMetbooks()
          }, '正在取消')
        },
        onCancel: () => {}
      })
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
    },
    getMockData () {
      let mockData = []
      for (let i = 1; i <= 5; i++) {
        mockData.push({
          key: i.toString(),
          name: 'Content ' + i,
          description: 'The desc of content  ' + i
        })
      }
      return mockData
    },
    getTargetKeys () {},
    render1 (item) {
      return item.name
    },
    handleChange1 (newTargetKeys, direction, moveKeys) {
      console.log(newTargetKeys)
      console.log(direction)
      console.log(moveKeys)
      this.targetKeys1 = newTargetKeys
    },
    ok () {
      this.$Message.info('Clicked ok')
    },
    cancel () {
      this.$Message.info('Clicked cancel')
    }
  }
}
</script>
