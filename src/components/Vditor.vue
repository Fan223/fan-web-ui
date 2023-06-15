<template>
  <div id="vditor" />
</template>

<script>
import Vditor from 'vditor';
import 'vditor/dist/index.css';
import { inject, onMounted, ref } from 'vue'
import { ElMessage } from 'element-plus';
import { useStore } from 'vuex';

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Index',
  props: ['form'],
  setup(props) {
    const axios = inject('axios')
    const store = useStore()
    const vditor = ref('')

    onMounted(() => {
      vditor.value = new Vditor('vditor', {
        height: '90%',
        placeholder: '请输入内容',
        tab: '    ',
        theme: 'dark',
        toolbar: [
          'emoji', 'headings', 'bold', 'italic', 'strike', '|',
          'line', 'quote', 'list', 'ordered-list', 'check', 'outdent', 'indent', 'code',
          'inline-code', 'insert-after', 'insert-before', 'upload', 'link',
          'table', 'record', 'edit-mode', 'both', 'preview', 'fullscreen', 'outline',
          'code-theme', "content-theme", 'export',
          {
            name: 'save',
            icon: '<svg width="1.2em" height="1.2em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 1536 1536"><path fill="currentColor" d="M384 1408h768v-384H384v384zm896 0h128V512q0-14-10-38.5t-20-34.5l-281-281q-10-10-34-20t-39-10v416q0 40-28 68t-68 28H352q-40 0-68-28t-28-68V128H128v1280h128V992q0-40 28-68t68-28h832q40 0 68 28t28 68v416zM896 480V160q0-13-9.5-22.5T864 128H672q-13 0-22.5 9.5T640 160v320q0 13 9.5 22.5T672 512h192q13 0 22.5-9.5T896 480zm640 32v928q0 40-28 68t-68 28H96q-40 0-68-28t-28-68V96q0-40 28-68T96 0h928q40 0 88 20t76 48l280 280q28 28 48 76t20 88z"></path></svg>',
            tip: '保存',
            tipPosition: 'n',
            hotkey: '⌘s',
            click() {
              // eslint-disable-next-line vue/no-mutating-props
              props.form.content = vditor.value.getValue()

              axios.post('/fan-web/blog/article/addArticle', props.form).then(response => {
                if (response.data.code === 200) {
                  ElMessage({
                    message: '保存成功',
                    type: 'success'
                  })
                  // eslint-disable-next-line vue/no-mutating-props
                  props.form.id = response.data.data
                } else {
                  ElMessage({
                    message: response.data.message,
                    type: 'error'
                  })
                }
              })
            }
          },
          {
            name: 'Fold',
            icon: '<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-ea893728=""><path fill="currentColor" d="M104.704 685.248a64 64 0 0 0 90.496 0l316.8-316.8 316.8 316.8a64 64 0 0 0 90.496-90.496L557.248 232.704a64 64 0 0 0-90.496 0L104.704 594.752a64 64 0 0 0 0 90.496z"></path></svg>',
            tip: '收起',
            tipPosition: 'n',
            click() {
              store.state.collapse.blogHeader = !store.state.collapse.blogHeader
            }
          },
          {
            name: 'Expand',
            icon: '<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-ea893728=""><path fill="currentColor" d="M104.704 338.752a64 64 0 0 1 90.496 0l316.8 316.8 316.8-316.8a64 64 0 0 1 90.496 90.496L557.248 791.296a64 64 0 0 1-90.496 0L104.704 429.248a64 64 0 0 1 0-90.496z"></path></svg>',
            tip: '展开',
            tipPosition: 'n',
            click() {
              store.state.collapse.blogHeader = !store.state.collapse.blogHeader
            }
          },
          {
            name: "more",
            toolbar: [
              "undo",
              "redo",
              "devtools",
              "info",
              "help",
            ],
          },
        ],
        counter: {
          enable: true,
        },
        cache: {
          enable: false
        },
        preview: {
          actions: [],
          hljs: {
            lineNumber: true,
            style: 'dracula'
          },
          markdown: {
            autoSpace: true,
            fixTermTypo: true,
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
        after: () => {
          if (props.form.content) {
            vditor.value.setValue(props.form.content)
          }
        }
      })
    })

    return {
      vditor
    }
  },
}
</script>

<style scoped>
</style>