import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
import Layout from '../views/layout/Layout'
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },
  {
    path: '/',
    component: Layout,
    redirect: '/activity/activityManagement',
    name: 'activityManagement',
    hidden: true
  },
  {
    path: '/activity',
    component: Layout,
    redirect: '/activity/activityManagement',
    name: 'activity',
    meta: { title: '活动', icon: 'example' },
    children: [
      {
        path: 'activityManagement',
        name: 'activityManagement',
        component: () => import('@/views/activity/index'),
        meta: { title: '管理活动', icon: 'table' }
      },
      {
        path: 'addActivity',
        name: 'addActivity',
        component: () => import('@/views/activity/addActivity'),
        meta: { title: '添加活动', icon: 'tree' }
      }
    ]
  },

  {
    path: '/staff',
    component: Layout,
    children: [
      {
        path: 'staffManagement',
        name: 'staffManagement',
        component: () => import('@/views/staff/index'),
        meta: { title: '人员管理', icon: 'form' }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

