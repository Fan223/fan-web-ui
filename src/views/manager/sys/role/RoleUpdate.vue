<template>
  <el-dialog
    v-model="props.dialog.update"
    title="修改用户"
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
        label="编码"
        prop="code"
      >
        <el-input
          v-model="updateForm.data.code"
          placeholder="请输入编码"
          clearable
        />
      </el-form-item>
      <el-form-item
        label="用户名"
        prop="name"
      >
        <el-input
          v-model="updateForm.data.name"
          placeholder="请输入角色名"
          clearable
        />
      </el-form-item>
      <el-form-item
        label="备注"
        prop="reamrk"
      >
        <el-input
          v-model="updateForm.data.reamrk"
          placeholder="请输入备注"
          type="textarea"
          autosize
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
          @click="updateRole"
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
  name: 'RoleUpdate',
  props: ['dialog', 'updateRow', 'pageRoles'],
  setup(props, context) {
    const axios = inject('axios')

    let updateForm = reactive({
      data: {}
    })

    function updateRole() {
      axios.put('/fan-web/sys/role/updateRole', updateForm.data).then(response => {
        if (response.data.code === 200) {
          ElMessage({
            message: response.data.message,
            type: 'success'
          })
          // eslint-disable-next-line vue/no-mutating-props
          props.dialog.update = false
          context.emit('pageRoles')
        } else {
          ElMessage({
            message: response.data.message,
            type: 'error'
          })
        }
      }).catch(() => { });
    }

    return {
      props, updateForm, updateRole
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