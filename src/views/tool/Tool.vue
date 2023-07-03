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
            <ul>
              <li> + </li>
              <li> - </li>
              <li> * </li>
              <li> / </li>
            </ul>
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

<style>
</style>