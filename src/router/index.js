import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: '',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: {title: '首页', icon: 'dashboard', permission: 'HomePage'}
    }]
  },

  {
    path: '/customer',
    component: Layout,
    redirect: '/customer',
    name: 'Customer',
    meta: {title: '客户管理', icon: 'el-icon-s-custom', roles: ['admin', 'sale'], permission: 'CustomerManager'},
    children: [
      {
        path: 'edit',
        name: 'Create',
        component: () => import('@/views/customer/edit'),
        meta: {title: '客户录入', icon: 'tree', roles: ['admin', 'sale'], permission: 'CustomerManager_create'}
      },
      {
        path: '',
        name: 'CustomerList',
        component: () => import('@/views/customer/list'),
        meta: {title: '客户列表', icon: 'table', roles: ['admin', 'sale'], permission: 'CustomerManager_list'}
      },
      {
        path: 'edit/:id',
        name: 'CustomerEditByID',
        component: () => import('@/views/customer/edit'),
        meta: {title: '客户编辑', icon: '', roles: ['admin', 'sale'], permission: 'CustomerManager_edit'},
        hidden: true
      },
      {
        path: ':id',
        name: 'CustomerInfoByID',
        component: () => import('@/views/customer/info'),
        meta: {title: '客户详情', icon: '', roles: ['admin', 'sale'], permission: 'CustomerManager_edit'},
        hidden: true
      }
    ]
  },
  {
    path: '/order',
    component: Layout,
    redirect: '/order',
    name: 'Order',
    meta: {title: '订单管理', icon: 'el-icon-finished', roles: ['admin', 'sale', 'experiment'], permission: 'OrderManager'},
    children: [
      {
        path: 'edit/:id',
        name: 'OrderEditByID',
        component: () => import('@/views/order/edit'),
        hidden: true,
        meta: {title: '客户订单', icon: 'el-icon-edit-outline', roles: ['admin', 'sale'], permission: 'OrderManager_edit'}
      },
      {
        path: '',
        name: 'OrderList',
        component: () => import('@/views/order/list'),
        meta: {title: '订单列表', icon: 'el-icon-s-unfold', roles: ['admin', 'sale'], permission: 'OrderManager_list'}
      },
      {
        path: 'process',
        name: 'OrderProcessList',
        component: () => import('@/views/order/process'),
        meta: {title: '订单处理', icon: 'el-icon-document', roles: ['admin', 'experiment'], permission: 'OrderManager_process'}
      },
      {
        path: ':code',
        name: 'OrderInfoByCode',
        component: () => import('@/views/order/info'),
        meta: {title: '订单详情', icon: '', roles: ['admin', 'sale'], permission: 'OrderManager_info'},
        hidden: true
      },
      {
        path: 'process/:code',
        name: 'OrderProcessInfoByCode',
        component: () => import('@/views/order/processDetail'),
        meta: {title: '处理详情', icon: '', roles: ['admin', 'experiment'], permission: 'OrderManager_processInfo'},
        hidden: true
      }
    ]
  },
  {
    path: '/user',
    component: Layout,
    redirect: '/user/info',
    name: 'User',
    meta: {
      title: '用户管理',
      icon: 'el-icon-user',
      permission: 'UserManager'
    },
    children: [
      {
        path: 'my',
        component: () => import('@/views/user/info'),
        name: 'MyUserInfo',
        meta: {title: '我的信息', icon: 'user', permission: 'UserManager_my'}
      },
      {
        path: ':id',
        component: () => import('@/views/user/info'),
        name: 'UserInfoById',
        hidden: true,
        meta: {title: '用户信息', icon: 'user', permission: 'UserManager_user'}
      },
      {
        path: '',
        component: () => import('@/views/user/list'),
        name: 'UserList',
        meta: {
          title: '用户列表',
          roles: ['admin'],
          icon: 'table',
          permission: 'UserManager_list'
        }
      }
    ]
  },
  {
    path: '/uop',
    component: Layout,
    redirect: '/uop/info',
    name: 'Uop',
    hidden: true,
    meta: {
      title: '组织权限',
      icon: 'el-icon-user',
      permission: 'UserManager'
    },
    children: [
      {
        path: 'info',
        component: () => import('@/views/user/info'),
        name: 'UopInfo',
        meta: {title: 'UOP信息', icon: 'user', permission: 'Uop_info'}
      }]
  },
  //
  // {
  //   path: 'external-link',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
  //       meta: { title: 'External Link', icon: 'link' }
  //     }
  //   ]
  // },

  // 404 page must be placed at the end !!!
  {path: '*', redirect: '/404', hidden: true}
]

const createRouter = () => new Router({
  mode: 'history', // require service support
  scrollBehavior: () => ({y: 0}),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
