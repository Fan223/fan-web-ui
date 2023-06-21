import router from "@/router";

// 动态绑定路由
export function dynamicRoute(menus) {
  menus.forEach(menu => {
    bindRoute(menu)
  })
}

// 递归添加路由
function bindRoute(menu) {
  let route = menuToRoute(menu)

  if (route && 'top' === route.meta.position) {
    if (checkAsideChild(menu)) {
      router.addRoute('LAYOUT_CONTENT', route)
    } else {
      router.addRoute('LAYOUT', route)
    }
  } else if (route && 'aside' === route.meta.position) {
    router.addRoute('LAYOUT_CONTENT', route)
  }

  if (menu.children && menu.children.length > 0) {
    menu.children.forEach(child => {
      bindRoute(child)
    })
  }
}

// 将菜单转为路由
function menuToRoute(menu) {
  if (!menu.component) {
    return null;
  } else {
    let arr = menu.component.split('/')
    let folderName = arr[arr.length - 1]
    let fileName = folderName.slice(0, 1).toUpperCase() + folderName.slice(1).toLowerCase()

    return {
      name: menu.id,
      path: menu.path,
      component: () => import('@/views' + menu.component + '/' + fileName + '.vue'),
      meta: {
        id: menu.id,
        title: menu.name,
        position: menu.position,
        type: menu.type
      }
    }
  }
}

// 检查菜单及其子菜单是否存在侧栏菜单
function checkAsideChild(menu) {
  if ('aside' === menu.position) {
    return true;
  }

  if (menu.children && menu.children.length > 0) {
    for (let i = 0; i < menu.children.length; i++) {
      return checkAsideChild(menu.children[i]);
    }
  }
}