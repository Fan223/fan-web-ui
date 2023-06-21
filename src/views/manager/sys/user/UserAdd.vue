<template>
  <el-dialog
    v-model="props.dialog.add"
    title="添加用户"
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
        label="用户名"
        prop="username"
      >
        <el-input
          v-model="addForm.username"
          placeholder="请输入用户名"
          clearable
        />
      </el-form-item>
      <el-form-item
        label="密码"
        prop="password"
      >
        <el-input
          v-model="addForm.password"
          placeholder="请输入密码"
          show-password
          clearable
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
          @click="addUser"
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
  name: 'UserAdd',
  props: ['dialog', 'pageUsers'],
  setup(props, context) {
    const axios = inject('axios')

    let addForm = reactive({
      flag: 'Y',
      password: '123456'
    })

    function addUser() {
      axios.post('/fan-web/sys/user/addUser', addForm).then(response => {
        if (response.data.code === 200) {
          ElMessage({
            message: response.data.message,
            type: 'success'
          })
          // eslint-disable-next-line vue/no-mutating-props
          props.dialog.add = false
          context.emit('pageUsers')
        } else {
          ElMessage({
            message: response.data.message,
            type: 'error'
          })
        }
      }).catch(() => { });
    }

    return {
      props, addForm, addUser
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