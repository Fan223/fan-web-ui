<template>
  <div id="vditor" />
</template>

<script>
import Vditor from 'vditor';
import 'vditor/dist/index.css';
import { inject, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Preview',
  setup() {
    const vditor = ref('')
    const axios = inject('axios')
    const router = useRouter()

    onMounted(() => {
      vditor.value = new Vditor('vditor', {
        height: '100%',
        width: '100%',
        placeholder: '加载中...',
        theme: 'dark',
        cache: {
          enable: false
        },
        toolbarConfig: {
          hide: true
        },
        preview: {
          actions: [],
          hljs: {
            lineNumber: true,
            style: 'dracula'
          },
          theme: {
            current: 'dark'
          },
          math: {
            inlineDigit: true,
            engine: 'MathJax'
          }
        },
        outline: {
          enable: true,
          position: 'right'
        },
      })

      router.isReady().then(() => {
        axios.get('/fan-web/blog/article/getArticle/' + router.currentRoute.value.params.id).then(response => {
          vditor.value.setValue(response.data.data.content)
          vditor.value.vditor.toolbar.elements.preview.firstElementChild.dispatchEvent(new CustomEvent("click"))
        })
      })
    })

    return {
      vditor
    }
  }
}
</script>

<style scoped>
</style>