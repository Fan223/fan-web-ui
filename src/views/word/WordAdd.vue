<template>
  <el-dialog
    v-model="props.dialog.addDialogVisible"
    title="添加单词"
    draggable
    destroy-on-close
    width="60%"
    :close-on-click-modal="false"
    @close="this.$refs.addFormRef.resetFields()"
  >
    <el-form
      :model="addForm"
      ref="addFormRef"
      label-position="right"
      label-width="80px"
    >
      <el-form-item
        label="英文"
        prop="en"
      >
        <el-input
          v-model="addForm.en"
          placeholder="请输入英文"
          clearable
        />
      </el-form-item>
      <el-form-item
        label="音标"
        prop="pronunciation"
      >
        <el-input
          v-model="addForm.pronunciation"
          placeholder="请输入音标"
          clearable
        />
      </el-form-item>
      <el-form-item
        label="中文"
        prop="cn"
      >
        <el-input
          v-model="addForm.cn"
          placeholder="请输入中文"
          clearable
          type="textarea"
          autosize
        />
      </el-form-item>
      <el-form-item
        label="类型"
        prop="type"
      >
        <el-checkbox-group v-model="addForm.type">
          <el-checkbox label="日常单词" />
          <el-checkbox label="专业名词" />
          <el-checkbox label="短语" />
        </el-checkbox-group>
      </el-form-item>
      <el-form-item
        label="状态"
        prop="flag"
      >
        <el-radio-group v-model="addForm.flag">
          <el-radio label='0'>掌握</el-radio>
          <el-radio label='1'>熟悉</el-radio>
          <el-radio label='2'>模糊</el-radio>
          <el-radio label='3'>陌生</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>

    <template #footer>
      <span>
        <el-button
          type="info"
          @click="props.dialog.addDialogVisible = false"
        >取 消</el-button>
        <el-button
          type="primary"
          @click="addWord"
        >
          确 认
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { inject, reactive } from 'vue'
import { ElMessage } from 'element-plus'

export default {
  name: 'WordAdd',
  props: ['dialog', 'pageWords'],
  setup(props, context) {
    const axios = inject('axios')

    let addForm = reactive({
      type: ['日常单词'],
      flag: '0'
    })

    function addWord() {
      axios.post('/fan-web/word/addWord', addForm).then(response => {
        if (response.data.code === 200) {
          ElMessage({
            message: response.data.message,
            type: 'success'
          })
          // eslint-disable-next-line vue/no-mutating-props
          props.dialog.addDialogVisible = false
          context.emit('pageWords')
        } else {
          ElMessage({
            message: response.data.message,
            type: 'error'
          })
        }
      })
    }

    return {
      props, addForm, addWord
    }
  }
}
</script>

<style scoped>
.el-checkbox {
  margin-right: 20px;
}
</style>