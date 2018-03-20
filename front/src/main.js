// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import 'weui'
import {
   Button, Form, FormItem, Input, Row, Col, Cascader, Card, DatePicker, Tabs, TabPane, Tooltip, Modal, Message, Icon, Table} from 'iview'
import 'iview/dist/styles/iview.css'

Vue.config.productionTip = false
Vue.component('Button', Button)
Vue.component('Form', Form)
Vue.component('FormItem', FormItem)
Vue.component('Input', Input)
Vue.component('Row', Row)
Vue.component('Col', Col)
Vue.component('Cascader', Cascader)
Vue.component('Card', Card)
Vue.component('DatePicker', DatePicker)
Vue.component('Tabs', Tabs)
Vue.component('TabPane', TabPane)
Vue.component('Tooltip', Tooltip)
Vue.component('Modal', Modal)
Vue.component('Message', Message)
Vue.component('Icon', Icon)
Vue.component('Table', Table)
Vue.prototype.$Modal = Modal
Vue.prototype.$Message = Message

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
