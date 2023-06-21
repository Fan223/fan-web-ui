<template>
  <el-dialog
    v-model="props.dialog.add"
    title="添加角色"
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
        label="角色编码"
        prop="code"
      >
        <el-input
          v-model="addForm.code"
          placeholder="请输入角色编码"
          clearable
        />
      </el-form-item>
      <el-form-item
        label="角色名称"
        prop="name"
      >
        <el-input
          v-model="addForm.name"
          placeholder="请输入角色名称"
          clearable
        />
      </el-form-item>
      <el-form-item
        label="备注"
        prop="reamrk"
      >
        <el-input
          v-model="addForm.reamrk"
          placeholder="请输入备注"
          type="textarea"
          autosize
        />
      </el-form-item>
      <el-form-item
        label="状态"
        prop="flag"
      >
        <el-radio-group v-model="addForm.flag">
          <el-radio label='Y'>正常</el-radio>
          <el-radio label='N'>禁用</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>

    <template #footer>
      <span>
        <el-button
          type="info"
          @click="props.dialog.add = false"
        >取 消</el-button>
        <el-button
          type="primary"
          @click="addRole"
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
  name: 'RoleAdd',
  props: ['dialog', 'pageRoles'],
  setup(props, context) {
    const axios = inject('axios')

    let addForm = reactive({
      flag: 'Y'
    })

    function addRole() {
      axios.post('/fan-web/sys/role/addRole', addForm).then(response => {
        if (response.data.code === 200) {
          ElMessage({
            message: response.data.message,
            type: 'success'
          })
          // eslint-disable-next-line vue/no-mutating-props
          props.dialog.add = false
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
      props, addForm, addRole
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