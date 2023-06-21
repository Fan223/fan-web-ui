<template>
  <el-dialog
    v-model="props.dialog.update"
    title="修改标签"
    width="60%"
    :close-on-click-modal="false"
    @open="updateForm.data = { ...props.updateRow }"
    @close="this.$refs.updateFormRef.resetFields()"
  >
    <el-form
      :model="updateForm.data"
      ref="updateFormRef"
      label-position="right"
      label-width="80px"
    >
      <el-form-item
        label="标签名称"
        prop="name"
      >
        <el-input
          v-model="updateForm.data.name"
          placeholder="请输入标签名称"
          clearable
        />
      </el-form-item>
      <el-form-item
        label="状态"
        prop="flag"
      >
        <el-radio-group v-model="updateForm.data.flag">
          <el-radio label='Y'>正常</el-radio>
          <el-radio label='N'>禁用</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>

    <template #footer>
      <span>
        <el-button
          type="info"
          @click="props.dialog.update = false"
        >取 消</el-button>
        <el-button
          type="primary"
          @click="updateTag"
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
  name: 'TagUpdate',
  props: ['dialog', 'updateRow', 'pageTags'],
  setup(props, context) {
    const axios = inject('axios')

    let updateForm = reactive({
      data: {}
    })

    function updateTag() {
      axios.put('/fan-web/blog/tag/updateTag', updateForm.data).then(response => {
        if (response.data.code === 200) {
          ElMessage({
            message: response.data.message,
            type: 'success'
          })
          // eslint-disable-next-line vue/no-mutating-props
          props.dialog.update = false
          context.emit('pageTags')
        } else {
          ElMessage({
            message: response.data.message,
            type: 'error'
          })
        }
      }).catch(() => { });
    }

    return {
      props, updateForm, updateTag
    }
  }
}
</script>

<style scoped>
.el-form {
  width: 80%;
  margin: 0 auto;
}
</style>