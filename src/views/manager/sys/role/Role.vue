<template>
  <!-- 查询表单 -->
  <el-row>
    <el-col>
      <el-form
        :model="queryForm"
        ref="queryFormRef"
        inline
        label-position="right"
        label-width="70px"
        @keyup.enter="pageRoles"
      >
        <el-form-item
          label="角色名称"
          prop="name"
        >
          <el-input
            v-model="queryForm.name"
            clearable
            placeholder="请输入角色名"
          />
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
              pageRoles()
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

  <!-- 结果头部 -->
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
            dialog.add = true
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
          @confirm="deleteRole(multipleSelection.data)"
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

  <!-- 结果主体 -->
  <el-row>
    <el-col>
      <el-table
        :data="roles.data"
        @selection-change="handleSelectionChange"
        style="margin-top: 10px;"
        max-height="400px"
      >
        <el-table-column type="selection" />
        <el-table-column
          label="编码"
          prop="code"
          align="center"
          min-width="100px"
        />
        <el-table-column
          label="角色名"
          prop="name"
          align="center"
          min-width="120px"
        />
        <el-table-column
          label="备注"
          prop="remark"
          align="center"
          min-width="200px"
          show-overflow-tooltip
        />

        <el-table-column
          label="状态"
          prop="flag"
          align="center"
          min-width="70px"
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
          min-width="150px"
        >
          <template #default="scope">
            <el-button
              type="primary"
              size="small"
              @click="(event) => {
                updateRole(scope.row)
                this.unFocus(event)
              }"
            >编 辑</el-button>

            <el-popconfirm
              title="确认删除吗？"
              confirm-button-text="确 认"
              cancel-button-text="取 消"
              cancel-button-type="info"
              @confirm="deleteRole(scope.row.id)"
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

      <el-pagination
        v-model:current-page="pagination.currentPage"
        v-model:page-size="pagination.pageSize"
        :total="pagination.total"
        :page-sizes="[10, 20, 50, 100]"
        background
        small
        layout="total, sizes, prev, pager, next, jumper"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
        style="margin-top: 20px;"
      />
    </el-col>
  </el-row>

  <RoleAdd
    :dialog="dialog"
    @pageRoles="pageRoles"
  />
  <RoleUpdate
    :dialog="dialog"
    :updateRow="updateRow.data"
    @pageRoles="pageRoles"
  />
</template>

<script>
import { inject, reactive } from 'vue'
import qs from 'qs'
import { ElMessage } from 'element-plus'
import RoleAdd from './RoleAdd';
import RoleUpdate from './RoleUpdate';

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Role',
  setup() {
    const axios = inject('axios')

    let queryForm = reactive({
    })

    let pagination = reactive({
      currentPage: 1,
      pageSize: 10,
      total: 10
    })

    let roles = reactive({
      data: []
    })

    let dialog = reactive({
      add: false,
      update: false
    })

    let multipleSelection = reactive({
      data: []
    })

    let updateRow = reactive({
      data: {}
    })

    function pageRoles() {
      let params = qs.stringify({
        name: queryForm.name,
        flag: queryForm.flag,
        currentPage: pagination.currentPage,
        pageSize: pagination.pageSize
      }, { arrayFormat: 'repeat' })

      axios.get('/fan-web/sys/role/pageRoles?' + params).then(response => {
        let res = response.data.data

        roles.data = res.records
        pagination.currentPage = res.current
        pagination.pageSize = res.size
        pagination.total = res.total
      }).catch(() => { });
    }
    pageRoles()

    function deleteRole(id) {
      axios.delete('/fan-web/sys/role/deleteRole/' + id).then(response => {
        if (response.data.code === 200) {
          ElMessage({
            message: response.data.message,
            type: 'success'
          })

          pageRoles()
        } else {
          ElMessage({
            message: response.data.message,
            type: 'error'
          })
        }
      }).catch(() => { });
    }

    function handleSelectionChange(selection) {
      multipleSelection.data = selection.map(select => select.id)
    }

    function updateRole(row) {
      dialog.update = true
      updateRow.data = row
    }

    function handleCurrentChange() {
      pageRoles()
    }

    function handleSizeChange() {
      pageRoles()
    }

    return {
      queryForm, dialog, roles, pagination, updateRow
      , pageRoles, deleteRole, multipleSelection, handleSelectionChange, updateRole
      , handleCurrentChange, handleSizeChange
    }
  },
  components: {
    RoleAdd, RoleUpdate
  }
}
</script>

<style scoped>
.el-form .el-input,
.el-form .el-select {
  width: 200px;
}
</style>