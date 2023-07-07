<template>
  <el-container style="height: 100%;">
    <el-container
      direction="vertical"
      v-if="collapse.value"
      style="width: 100%; height: 100%;"
      class="alignEndStyle"
    >
      <el-input
        v-model="json.value"
        autosize
        type="textarea"
        resize="none"
        placeholder="Please Input Your Json..."
      />

      <el-button
        dark
        text
        @click="(evnet) => {
          formatJson()
          this.unFocus(evnet)
        }"
        class="format-btn"
      >
        <b> Format </b>
      </el-button>
    </el-container>

    <el-button
      dark
      text
      v-if="collapse.value"
      @click="collapse.value = !collapse.value"
      class="collapse"
    >
      <el-icon>
        <ArrowLeftBold />
      </el-icon>
    </el-button>
    <el-button
      dark
      text
      v-if="!collapse.value"
      @click="collapse.value = !collapse.value"
      class="collapse"
    >
      <el-icon>
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
    let collapse = reactive({
      value: true
    });

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
      json, format, collapse, formatJson
    }
  }
}
</script>

<style scoped>
:deep(.el-textarea__inner) {
  box-shadow: none;
  height: 93vh !important;
  font-size: 16px;
}
.format-btn {
  height: 50px;
  border: none;
  border-top: 3px solid #0a0a0a;
}
.format-btn:hover {
  background-color: #1d2025 !important;
}
.collapse {
  width: 50px;
  height: 100%;
  border: none;
  border-left: 3px solid #0a0a0a;
  border-right: 3px solid #0a0a0a;
}
.collapse:hover {
  background-color: #1d2025 !important;
}
.format {
  height: 100%;
  width: 100%;
  white-space: pre-wrap;
  overflow: auto;
  font-size: 16px;
}
</style>