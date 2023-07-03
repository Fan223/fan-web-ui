<template>
  <el-input
    v-model="json.value"
    autosize
    type="textarea"
    resize="none"
    @keyup.enter="format"
  />
</template>

<script>
import { reactive } from 'vue'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Format',
  setup() {
    let json = reactive({
      value: ''
    })

    function format() {
      for (let i = 0; i < json.value.length; i++) {
        let arr = json.value.split('')
        arr.splice(1, 0, '\n')
        json.value = arr.join('')
      }
    }

    return {
      json, format
    }
  }
}
</script>

<style scoped>
:deep(.el-textarea__inner) {
  height: 100vh !important;
  box-shadow: none;
  white-space: pre-wrap;
}
</style>