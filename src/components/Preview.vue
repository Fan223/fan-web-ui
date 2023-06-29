<template>
  <el-container>
    <div id="vditor" />

    <el-affix>
      <div class="vditor-outline__title"> 大纲 </div>
      <el-divider />
      <div id="outline" />
    </el-affix>
  </el-container>
</template>

<script>
import { inject, onMounted } from 'vue'
import Vditor from 'vditor';
import 'vditor/dist/index.css';
import { useRouter } from 'vue-router';

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Preview',
  setup() {
    const axios = inject('axios')
    const router = useRouter()

    onMounted(() => {
      // eslint-disable-next-line no-unused-vars
      const initOutline = () => {
        const headingElements = []
        Array.from(document.getElementById('vditor').children).forEach((item) => {
          if (item.tagName.length === 2 && item.tagName !== 'HR' && item.tagName.indexOf('H') === 0) {
            headingElements.push(item)
          }
        })

        let toc = []
        window.addEventListener('scroll', () => {
          const scrollTop = window.scrollY
          toc = []
          headingElements.forEach((item) => {
            toc.push({
              id: item.id,
              offsetTop: item.offsetTop,
            })
          })

          const currentElement = document.querySelector('.vditor-outline__item--current')
          for (let i = 0, iMax = toc.length; i < iMax; i++) {
            if (scrollTop < toc[i].offsetTop - 30) {
              if (currentElement) {
                currentElement.classList.remove('vditor-outline__item--current')
              }
              let index = i > 0 ? i - 1 : 0
              document.querySelector('span[data-target-id="' + toc[index].id + '"]').classList.add('vditor-outline__item--current')
              break
            }
          }
        })
      }

      axios.get('/fan-web/blog/article/getArticle/' + router.currentRoute.value.params.id).then(response => {
        Vditor.preview(document.getElementById('vditor'), response.data.data.content, {
          mode: 'dark',
          anchor: 2,
          hljs: {
            lineNumber: true,
            style: 'dracula'
          },
          speech: {
            enable: true,
          },
          math: {
            inlineDigit: true,
            engine: 'MathJax'
          },
          markdown: {
            autoSpace: true,
            fixTermTypo: true,
          },
          theme: {
            current: 'dark'
          },
          after: () => {
            router.isReady().then(() => {
              if (window.innerWidth <= 768) {
                return
              }

              const outlineElement = document.getElementById('outline')
              Vditor.outlineRender(document.getElementById('vditor'), outlineElement)
              if (outlineElement.innerText.trim() !== '') {
                outlineElement.style.display = 'block'
                initOutline()
              }
            })
          },
        })
      }).catch(() => { })
    })
  }
}
</script>

<style scoped>
.el-container {
  background-color: #2f363d;
}
#vditor {
  width: 60%;
  margin: 0 auto;
}
.el-affix {
  width: 250px;
  background-color: #24292e;
}
.el-divider {
  margin: 0;
}
#outline {
  height: 100vh;
  margin-left: -15px;
}
</style>