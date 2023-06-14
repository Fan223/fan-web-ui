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
      redirect: '/layout/content',
      component: () => import('@/layout/MainLayout.vue'),
      children: [
        {
          path: '/layout/content',
          name: 'LAYOUT_CONTENT',
          redirect: '/blog',
          component: () => import('@/layout/LayoutContent.vue'),
          children: []
        }
      ]
    },
    // 404 路由
    {
      path: '/:pathMatch(.*)',
      name: '404',
      component: () => import('@/views/404.vue')
    }
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
    console.log(22);
    router.isReady().then(() => {
      let currentRoute = router.currentRoute.value

      if ('left' === currentRoute.meta.position) {
        console.log('22-2');
        axios.get('/fan-web/sys/menu/listTopChildMenus/' + currentRoute.meta.id).then(response => {
          let res = response.data.data
          store.state.navMenus.active.top = res.topMenuId
          store.commit('SET_ASIDE_MENUS', res.childMenus)
        })
      }

      store.state.navMenus.active.aside = currentRoute.meta.id
    })
    axios.get('/fan-web/sys/menu/listNavMenus').then(response => {
      let menus = response.data.data
      store.commit('SET_TOP_MENUS', menus.top)

      // 动态绑定路由
      if (menus.aside) {
        dynamicRoute(menus.aside)
        store.state.navMenus.isRoute = true
      }

      // 重定向, 让 route 渲染完成
      next(to.path)
    })
  } else {
    console.log(11);
    router.isReady().then(() => {
      if ('top' === to.meta.position) {
        console.log('11-11');
        axios.get('/fan-web/sys/menu/listChildMenus/' + to.meta.id).then(response => {
          console.log(response.data.data);
          store.commit('SET_ASIDE_MENUS', response.data.data)
        })
      }
    })

    next()
  }
})

export default router