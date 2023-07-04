<template>
  <el-container>
    <el-input
      v-model="json.value"
      autosize
      type="textarea"
      resize="none"
    />

    <el-button
      text
      dark
      @click="(evnet) => {
        formatJson()
        this.unFocus(evnet)
      }"
    >
      <el-icon size="25">
        <ArrowLeftBold />
        <ArrowRightBold />
      </el-icon>
    </el-button>

    <div class="format">
      {{ format.value }}
    </div>
  </el-container>
</template>

<script>
import { inject, reactive } from 'vue'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Format',
  setup() {
    const axios = inject('axios')

    let json = reactive({
      value: ''
    })

    let format = reactive({
      value: ''
    })

    function formatJson() {
      axios.post('/fan-web/tool/format', json.value).then(response => {
        format.value = response.data.data
      }).catch(() => { });
    }

    return {
      json, format, formatJson
    }
  }
}
</script>

<style scoped>
.el-container {
  height: 100%;
}
:deep(.el-textarea__inner) {
  height: 100% !important;
  box-shadow: none;
}
.format {
  height: 100%;
  width: 100%;
  white-space: pre-wrap;
  color: #ddd;
  overflow: auto;
}
.el-button {
  width: 50px;
  height: 100%;
  border: none;
  border-left: 1px solid #0a0a0a;
  border-right: 1px solid #0a0a0a;
}
.el-button:hover {
  background-color: #1d2025 !important;
}
</style>