import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
import main from '@/components/main'
import notification from '@/components/notification'
import material from '@/components/material'
import meeting from '@/components/meeting'
import account from '@/components/account'
import log from '@/components/log'
import logmsg from '@/components/logmsg'
import authmsg from '@/components/authmsg'
import notmainmsg from '@/components/notmainmsg'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'main',
      component: main,
      children: [
        {
          path: '',
          name: 'notification',
          component: notification
        },
        {
          path: '/material',
          name: 'material',
          component: material
        },
        {
          path: '/meeting',
          name: 'meeting',
          component: meeting
        },
        {
          path: '/account',
          name: 'account',
          component: account
        },
        {
          path: '/logmsg',
          name: 'logmsg',
          component: logmsg
        },
        {
          path: '/authmsg',
          name: 'authmsg',
          component: authmsg
        },
        {
          path: '/notmainmsg',
          name: 'notmainmsg',
          component: notmainmsg
        }
      ]
    },
    {
      path: '/log',
      name: 'log',
      component: log
    }
  ]
})

router.beforeEach(({ path }, from, next) => {
  const level = store.state.user ? store.state.user.level : undefined
  if (typeof level === 'undefined' && path !== '/logmsg' && path !== '/log' && path !== '/') {
    next('/logmsg')
  } else if (typeof level === 'number' && level < 1 && (path === '/material' || path === '/meeting')) {
    next('/authmsg')
  } else if (typeof level === 'number' && level < 2 && path === '/meeting') {
    next('/notmainmsg')
  } else if (typeof level === 'number' && (path === '/logmsg' || path === '/log')) {
    next('/account')
  } else {
    next()
  }
})

export default router
