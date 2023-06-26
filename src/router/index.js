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
        },
        {
          path: '/user/center',
          name: 'USER_CENTER',
          component: () => import('@/views/UserCenter.vue'),
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
      name: 'ARTICLE_UPDATE',
      component: () => import('@/views/manager/blog/article/ArticleUpdate.vue')
    },
    {
      path: '/article/preview/:id',
      name: 'ARTICLE_PREVIEW',
      component: () => import('@/components/Preview.vue')
    },
    {
      path: '/article/render',
      name: 'ARTICLE_RENDER',
      component: () => import('@/components/Render.vue')
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
    }).catch(() => { })

    // 当前菜单为侧栏子菜单时获取其顶层父菜单及其后代菜单
    router.isReady().then(() => {
      let currentRoute = router.currentRoute.value
      let flag = 'ARTICLE_ADD' === currentRoute.name || 'ARTICLE_UPDATE' === currentRoute.name;

      if ('aside' === currentRoute.meta.position || flag) {
        let id = flag ? '10138300571021312' : currentRoute.meta.id

        axios.get('/fan-web/sys/menu/listTopChildMenus/' + id).then(response => {
          let res = response.data.data
          store.state.navMenus.active.top = res.topMenuId
          store.state.tabs.home.name = res.topMenuId
          store.commit('SET_ASIDE_MENUS', res.childMenus)

          if (!flag) {
            let addTab = {
              id: currentRoute.meta.id,
              name: currentRoute.meta.title
            }
            store.commit('ADD_TAB', addTab)
          }
        }).catch(() => { })
      }
    })
  } else {
    // 切换顶层父菜单时重新获取其子菜单
    router.isReady().then(() => {
      if ('top' === to.meta.position && store.state.navMenus.active.top !== to.meta.id) {
        axios.get('/fan-web/sys/menu/listChildMenus/' + to.meta.id).then(response => {
          store.commit('SET_ASIDE_MENUS', response.data.data)
        }).catch(() => { })

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
