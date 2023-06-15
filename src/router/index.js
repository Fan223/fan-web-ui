import store from '@/store'
import axios from '@/axios'
import { ElMessage } from 'element-plus'
import { createRouter, createWebHistory } from 'vue-router'
import { dynamicRoute } from '@/assets/js/menu'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'INDEX',
      component: () => import('@/views/Index.vue')
    },
    {
      path: '/layout',
      name: 'LAYOUT',
      component: () => import('@/layout/MainLayout.vue'),
      redirect: '/layout/content',
      children: [
        {
          path: '/layout/content',
          name: 'LAYOUT_CONTENT',
          component: () => import('@/layout/LayoutContent.vue'),
          redirect: '/blog',
          children: []
        }
      ]
    },
    {
      path: '/login',
      name: 'LOGIN',
      component: () => import('@/views/Login.vue')
    },
    // 404 路由
    {
      path: '/:pathMatch(.*)',
      name: '404',
      component: () => import('@/views/404.vue')
    },
    {
      path: '/article/add',
      name: 'ARTICLE_ADD',
      component: () => import('@/views/manager/blog/article/ArticleAdd.vue')
    },
    {
      path: '/article/update/:id',
      name: 'ARTICLE_Edit',
      component: () => import('@/views/manager/blog/article/ArticleEdit.vue')
    },
    {
      path: '/article/preview/:id',
      name: 'ARTICLE_PREVIEW',
      component: () => import('@/components/Preview.vue')
    },
  ],
})

// 全局前置路由守卫
router.beforeEach((to, from, next) => {
  let isRoute = store.state.navMenus.isRoute

  if (to.path === '/login' || to.path.startsWith('/article/preview')) {
    next()
  } else if (!localStorage.getItem('JWT')) {
    ElMessage({
      message: '请先登录',
      type: 'error'
    })
    next('/login')
  } else if (!isRoute) {
    console.log('动态绑定路由');
    axios.get('/fan-web/sys/menu/listNavMenus').then(response => {
      let menus = response.data.data
      store.commit('SET_TOP_MENUS', menus.top)

      // 动态绑定路由
      if (menus.all) {
        dynamicRoute(menus.all)
        store.state.navMenus.isRoute = true
      }

      // 重定向, 让 route 渲染完成
      next(to.path)
    })

    router.isReady().then(() => {
      let currentRoute = router.currentRoute.value

      if ('left' === currentRoute.meta.position) {
        console.log('通过子菜单获取顶层父菜单及其子菜单');
        axios.get('/fan-web/sys/menu/listTopChildMenus/' + currentRoute.meta.id).then(response => {
          let res = response.data.data
          store.state.navMenus.active.top = res.topMenuId
          store.state.tabs.home.name = res.topMenuId
          store.commit('SET_ASIDE_MENUS', res.childMenus)

          let addTab = {
            id: currentRoute.meta.id,
            name: currentRoute.meta.title
          }
          store.commit('ADD_TAB', addTab)
        })
      }
    })
  } else {
    console.log('正常访问路由');
    router.isReady().then(() => {
      if ('top' === to.meta.position && store.state.navMenus.active.top !== to.meta.id) {
        console.log('切换顶层父菜单重新获取其子菜单');
        axios.get('/fan-web/sys/menu/listChildMenus/' + to.meta.id).then(response => {
          store.commit('SET_ASIDE_MENUS', response.data.data)
        })

        store.state.tabs.data = []
        store.state.navMenus.active.top = to.meta.id
        store.state.tabs.home.name = to.meta.id
        store.state.tabs.activeName = to.meta.id
        store.state.navMenus.active.aside = ''
      }
    })

    next()
  }
})

export default router