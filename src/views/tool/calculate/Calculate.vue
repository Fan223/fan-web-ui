<template>
  <div class="history">
    <div style="padding: 20px;"> {{ history.value }} </div>
  </div>

  <el-input
    v-model="current.value"
    :autosize="{ minRows: 2, maxRows: 4 }"
    type="textarea"
    resize="none"
    @keyup.enter="calculate"
  />
</template>

<script>
import { inject, reactive } from 'vue'
import { ElMessage } from 'element-plus'
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Calculate',
  setup() {
    const axios = inject('axios')

    let history = reactive({
      value: ''
    })

    let current = reactive({
      value: ''
    })

    function setHistory() {

    }

    function calculate() {
      if (current.value) {
        axios.get('/fan-web/tool/calculate', {
          params: {
            expression: current.value
          }
        }).then(response => {
          if (response.data.code === 200) {
            history.value += current.value + response.data.data + '\n'
            current.value = ''
          } else {
            ElMessage({
              message: response.data.message,
              type: 'error'
            })
          }
        }).catch(() => { });
      }
    }

    return {
      history, current, setHistory, calculate
    }
  }
}
</script>

<style scoped>
.history {
  width: 100%;
  height: 400px;
  box-shadow: 0 0 0 3px #0a0a0a;
  white-space: pre-wrap;
}
.el-textarea {
  margin-top: 20px;
}
</style>