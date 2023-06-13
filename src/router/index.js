import store from '@/store'
import axios from '@/axios'
import { ElMessage } from 'element-plus'
import { createRouter, createWebHistory } from 'vue-router'
import { addRoute } from '@/assets/js/menu'

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
router.beforeEach((to, form, next) => {
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
    axios.get('/fan-web/sys/menu/listNavMenus', {
      params: {
        position: 'top'
      }
    }).then(response => {
      store.commit('SET_TOP_MENUS', response.data.data)

      axios.get('/fan-web/sys/menu/listNavMenus').then(response => {
        let menus = response.data.data

        if (menus) {
          // 动态绑定路由
          menus.forEach(menu => {
            addRoute(menu)
          })
          store.state.navMenus.isRoute = true
        }

        // 重定向, 让 route 渲染完成
        next(to.path)
      })
    })
  } else {
    next()
  }
})

export default router