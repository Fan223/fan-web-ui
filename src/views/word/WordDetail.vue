<template>
  <el-dialog
    v-model="props.dialog.detailDialogVisible"
    title="单词详情"
    draggable
    destroy-on-close
    width="60%"
    :close-on-click-modal="false"
  >
    <el-form
      :model="props.detailRow"
      disabled
      label-position="right"
      label-width="80px"
    >
      <el-form-item
        label="英文"
        prop="en"
      >
        <el-input
          v-model="props.detailRow.en"
          placeholder="请输入英文"
          clearable
        />
      </el-form-item>
      <el-form-item
        label="音标"
        prop="pronunciation"
      >
        <el-input
          v-model="props.detailRow.pronunciation"
          placeholder="请输入音标"
          clearable
        />
      </el-form-item>
      <el-form-item
        label="中文"
        prop="cn"
      >
        <el-input
          v-model="props.detailRow.cn"
          placeholder="请输入中文"
          clearable
          type="textarea"
          autosize=""
        />
      </el-form-item>
      <el-form-item
        label="类型"
        prop="type"
      >
        <el-checkbox-group v-model="props.detailRow.type">
          <el-checkbox label="日常单词" />
          <el-checkbox label="专业名词" />
          <el-checkbox label="短语" />
        </el-checkbox-group>
      </el-form-item>
      <el-form-item
        label="状态"
        prop="flag"
      >
        <el-radio-group v-model="props.detailRow.flag">
          <el-radio label='0'>掌握</el-radio>
          <el-radio label='1'>熟悉</el-radio>
          <el-radio label='2'>模糊</el-radio>
          <el-radio label='3'>陌生</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
export default {
  name: 'WordDetail',
  props: ['dialog', 'detailRow'],
  setup(props) {
    return {
      props
    }
  }
}
</script>

<style>
</style>