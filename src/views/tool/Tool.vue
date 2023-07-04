<template>
  <div style="padding: 20px;">
    <el-row>
      <el-col :span="4">
        <el-card @click="openTool('/tool/calculate')">
          <template #header>
            <div class="card-header">
              <span> 简易计算器 </span>
            </div>
          </template>

          <div>
            简单的运算
          </div>
        </el-card>
      </el-col>

      <el-col
        :span="4"
        :offset="1"
      >
        <el-card @click="openTool('/tool/format')">
          <template #header>
            <div class="card-header">
              <span> Json 格式化 </span>
            </div>
          </template>

          <div>
            Json 格式化工具
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Tool',
  setup() {
    function openTool(path) {
      window.open(path, '_blank')
    }

    return {
      openTool
    }
  }
}
</script>

<style scoped>
</style>