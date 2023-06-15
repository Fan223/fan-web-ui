<template>
  <!-- 查询表单 -->
  <el-row>
    <el-col>
      <el-form
        :model="queryForm"
        :inline="true"
        ref="queryFormRef"
        label-position="right"
        label-width="70px"
        @keyup.enter="listMenus"
      >
        <el-form-item
          label="菜单名称"
          prop="name"
        >
          <el-input
            v-model="queryForm.name"
            clearable
            placeholder="请输入菜单名称"
          />
        </el-form-item>
        <el-form-item
          label="菜单类型"
          prop="type"
        >
          <el-select
            v-model="queryForm.type"
            multiple
            clearable
            placeholder="请选择菜单类型"
          >
            <el-option
              label="目录"
              value="1"
            />
            <el-option
              label="菜单"
              value="2"
            />
            <el-option
              label="按钮"
              value="3"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="状态"
          prop="flag"
        >
          <el-select
            v-model="queryForm.flag"
            clearable
            placeholder="请选择状态"
          >
            <el-option
              label="正常"
              value="Y"
            />
            <el-option
              label="禁用"
              value="N"
            />
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button
            type="primary"
            size="small"
            @click="(event) => {
              listMenus()
              this.unFocus(event)
            }"
          >查 询</el-button>
          <el-button
            type="info"
            size="small"
            @click="(event) => {
              this.$refs.queryFormRef.resetFields()
              this.unFocus(event)
            }"
          >重 置</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>

  <!-- 数据结果头部 -->
  <el-row>
    <el-col :span="12">
      <b style="margin-left: -20px;">查询结果</b>
    </el-col>
    <el-col :span="12">
      <div style="float: right;">
        <el-button
          type="primary"
          size="small"
          @click="(event) => { 
            dialog.addDialogVisible = true
            this.unFocus(event)
          }"
        >
          新 增
        </el-button>
        <el-popconfirm
          v-if="multipleSelection.data.length > 0"
          title="确认删除吗？"
          confirm-button-text="确 认"
          cancel-button-text="取 消"
          cancel-button-type="info"
          @confirm="deleteMenu(multipleSelection.data)"
        >
          <template #reference>
            <el-button
              type="danger"
              size="small"
              @click="(event) => {
                this.unFocus(event)
              }"
            >批量删除</el-button>
          </template>
        </el-popconfirm>
      </div>
    </el-col>
  </el-row>

  <!-- 数据结果主体 -->
  <el-row>
    <el-col>
      <el-table
        :data="menus.data"
        max-height="430px"
        row-key="id"
        @selection-change="handleSelectionChange"
        style="margin-top: 10px;"
      >
        <el-table-column type="selection" />
        <el-table-column
          label="名称"
          prop="name"
          min-width="150px"
        />
        <el-table-column
          label="路径"
          prop="path"
          align="center"
          min-width="130px"
        />
        <el-table-column
          label="权限编码"
          prop="permission"
          align="center"
          min-width="170px"
        />
        <el-table-column
          label="组件"
          prop="component"
          align="center"
          min-width="200px"
        />
        <el-table-column
          label="类型"
          prop="type"
          align="center"
          width="70px"
        >
          <template #default="scope">
            <el-tag
              v-if="scope.row.type === 1"
              size="small"
            >目录</el-tag>
            <el-tag
              v-else-if="scope.row.type === 2"
              size="small"
              type="success"
            >菜单</el-tag>
            <el-tag
              v-else-if="scope.row.type === 3"
              size="small"
              type="info"
            >按钮</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          label="图标"
          prop="icon"
          align="center"
          width="60px"
        >
          <template #default="scope">
            <el-icon>
              <component :is="scope.row.icon" />
            </el-icon>
          </template>
        </el-table-column>
        <el-table-column
          label="排序"
          prop="orderNum"
          align="center"
          width="60px"
        />
        <el-table-column
          label="状态"
          prop="flag"
          align="center"
          width="70px"
        >
          <template #default="scope">
            <el-tag
              v-if="scope.row.flag === 'Y'"
              size="small"
              type="success"
            >正常</el-tag>
            <el-tag
              v-else-if="scope.row.flag === 'N'"
              size="small"
              type="danger"
            >禁用</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          label="创建时间"
          prop="createTime"
          align="center"
          min-width="170px"
        />
        <el-table-column
          label="操作"
          align="center"
          fixed="right"
          min-width="160px"
        >
          <template #default="scope">
            <el-button
              type="primary"
              size="small"
              @click="(event) => {
                updateMenu(scope.row)
                this.unFocus(event)
              }"
            >编 辑</el-button>
            <el-popconfirm
              title="确认删除吗？"
              confirm-button-text="确 认"
              cancel-button-text="取 消"
              cancel-button-type="info"
              @confirm="deleteMenu(scope.row.id)"
            >
              <template #reference>
                <el-button
                  type="danger"
                  size="small"
                  @click="(event) => {
                    this.unFocus(event)
                  }"
                >删 除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </el-col>
  </el-row>

  <MenuAdd
    :menus="menus.data"
    :dialog="dialog"
    @listMenus="listMenus"
  />
  <MenuEdit
    :menus="menus.data"
    :dialog="dialog"
    :updateRow="updateRow.data"
    @listMenus="listMenus"
  />
</template>

<script>
import { getCurrentInstance, inject, reactive } from 'vue'
import qs from 'qs'
import { ElMessage } from 'element-plus'
import MenuAdd from './MenuAdd.vue'
import MenuEdit from './MenuEdit.vue'
import { useStore } from 'vuex'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Menu',
  setup() {
    const axios = inject('axios')
    const store = useStore()
    const { proxy } = getCurrentInstance()

    let queryForm = reactive({
    })

    let dialog = reactive({
      addDialogVisible: false,
      editDialogVisible: false
    })

    let multipleSelection = reactive({
      data: []
    })

    let menus = reactive({
      data: []
    })

    let updateRow = reactive({
      data: {}
    })

    function listMenus() {
      let params = qs.stringify({
        name: queryForm.name,
        type: queryForm.type,
        flag: queryForm.flag
      }, { arrayFormat: 'repeat' })

      axios.get('/fan-web/sys/menu/listMenus?' + params).then(response => {
        menus.data = response.data.data.all
      })
    }
    listMenus()

    function deleteMenu(id) {
      axios.delete('/fan-web/sys/menu/deleteMenu/' + id).then(response => {
        if (response.data.code === 200) {
          ElMessage({
            message: response.data.message,
            type: 'success'
          })
          listMenus()
          proxy.refreshNavMenus()
          store.state.tabs.data = store.state.tabs.data.filter(tab => tab.name !== id)
        } else {
          ElMessage({
            message: response.data.message,
            type: 'error'
          })
        }
      })
    }

    function handleSelectionChange(selection) {
      multipleSelection.data = selection.map(select => select.id)
    }

    function updateMenu(row) {
      updateRow.data = row
      dialog.editDialogVisible = true
    }

    return {
      queryForm, dialog, multipleSelection, menus, updateRow
      , listMenus, deleteMenu, handleSelectionChange, updateMenu
    }
  },
  components: {
    MenuAdd, MenuEdit
  }
}
</script>

<style scoped>
.el-form .el-input,
.el-form .el-select {
  width: 200px;
}
</style>