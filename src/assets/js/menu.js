import router from "@/router";

// 递归添加路由
export function addRoute(menu) {
  if (menu.children && menu.children.length > 0) {
    menu.children.forEach(child => {
      addRoute(child)
    })
  }

  let route = menuToRoute(menu)
  if (route && 'top' === route.meta.position) {
    router.addRoute('LAYOUT', route)
  } else if (route && 'left' === route.meta.position) {
    router.addRoute('LAYOUT_CONTENT', route)
  }
}

// 将菜单转为路由
function menuToRoute(menu) {
  if (!menu.component) {
    return null;
  } else {
    return {
      name: menu.id,
      path: menu.path,
      component: () => import('@/views' + menu.component + '.vue'),
      meta: {
        id: menu.id,
        title: menu.name,
        position: menu.position,
        type: menu.type
      }
    }
  }
}