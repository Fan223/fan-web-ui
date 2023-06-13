<template>
  <div>Home</div>
</template>

<script>
import { inject } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Index',
  setup() {
    const axios = inject('axios')
    const router = useRouter()
    const store = useStore()

    router.isReady().then(() => {


      axios.get('/fan-web/sys/menu/listChildMenus/' + router.currentRoute.value.meta.id).then(response => {

        store.commit('SET_ASIDE_MENUS', response.data.data)
        console.log(11);
        console.log(store.state.navMenus.aside);
      })
    })
  }
}
</script>

<style>
</style>