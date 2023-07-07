<template>
  <el-container direction="vertical">
    <el-input
      v-model="current.value"
      @keyup.enter="calculate"
      placeholder="Please Input Your Equation..."
    />

    <div class="history">
      <div style="padding: 20px;"> {{ history.value }} </div>
    </div>
  </el-container>
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
            history.value += current.value + '\nresult: ' + response.data.data + '\n'
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
.el-container {
  height: 100%;
}
.el-input {
  height: 80px;
  font-size: 16px;
  border-bottom: 3px solid #0a0a0a;
}
:deep(.el-input__wrapper) {
  box-shadow: none;
}
.history {
  width: 100%;
  height: 100%;
  white-space: pre-wrap;
  font-size: 18px;
}
</style>