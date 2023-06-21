<template>
  <el-dialog
    v-model="props.dialog.add"
    title="添加分类"
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
        label="分类名称"
        prop="name"
      >
        <el-input
          v-model="addForm.name"
          placeholder="请输入分类名称"
          clearable
        />
      </el-form-item>
      <el-form-item
        label="备注"
        prop="remark"
      >
        <el-input
          v-model="addForm.remark"
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
      <el-form-item
        label="排序号"
        prop="orderNum"
      >
        <el-input-number
          v-model="addForm.orderNum"
          :min="1"
          label="排序号"
        ></el-input-number>
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
          @click="addCategory"
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
  name: 'CategoryAdd',
  props: ['dialog', 'pageCategories'],
  setup(props, context) {
    const axios = inject('axios')

    let addForm = reactive({
      flag: 'Y',
      orderNum: 1
    })

    function addCategory() {
      axios.post('/fan-web/blog/category/addCategory', addForm).then(response => {
        if (response.data.code === 200) {
          ElMessage({
            message: response.data.message,
            type: 'success'
          })
          // eslint-disable-next-line vue/no-mutating-props
          props.dialog.add = false
          context.emit('pageCategories')
        } else {
          ElMessage({
            message: response.data.message,
            type: 'error'
          })
        }
      }).catch(() => { });
    }

    return {
      props, addForm, addCategory
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