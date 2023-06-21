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
        @keyup.enter="pageCategories"
      >
        <el-form-item
          label="分类名称"
          prop="name"
        >
          <el-input
            v-model="queryForm.name"
            clearable
            placeholder="请输入分类名称"
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
              pageCategories()
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
          @confirm="deleteCategory(multipleSelection.data)"
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
        :data="categories.data"
        @selection-change="handleSelectionChange"
        style="margin-top: 10px;"
        max-height="400px"
      >
        <el-table-column type="selection" />
        <el-table-column
          label="分类名称"
          prop="name"
          align="center"
          min-width="130px"
        />
        <el-table-column
          label="备注"
          prop="remark"
          align="center"
          min-width="220px"
        />
        <el-table-column
          label="排序"
          prop="orderNum"
          align="center"
          min-width="60px"
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
                updateCategory(scope.row)
                this.unFocus(event)
              }"
            >编 辑</el-button>

            <el-popconfirm
              title="确认删除吗？"
              confirm-button-text="确 认"
              cancel-button-text="取 消"
              cancel-button-type="info"
              @confirm="deleteCategory(scope.row.id)"
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

  <CategoryAdd
    :dialog="dialog"
    @pageCategories="pageCategories"
  />
  <CategoryUpdate
    :dialog="dialog"
    :updateRow="updateRow.data"
    @pageCategories="pageCategories"
  />
</template>

<script>
import { inject, reactive } from 'vue'
import qs from 'qs'
import { ElMessage } from 'element-plus'
import CategoryAdd from './CategoryAdd';
import CategoryUpdate from './CategoryUpdate';

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Category',
  setup() {
    const axios = inject('axios')

    let queryForm = reactive({
    })

    let pagination = reactive({
      currentPage: 1,
      pageSize: 10,
      total: 10
    })

    let categories = reactive({
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

    function pageCategories() {
      let params = qs.stringify({
        name: queryForm.name,
        flag: queryForm.flag,
        currentPage: pagination.currentPage,
        pageSize: pagination.pageSize
      }, { arrayFormat: 'repeat' })

      axios.get('/fan-web/blog/category/pageCategories?' + params).then(response => {
        let res = response.data.data

        categories.data = res.records
        pagination.currentPage = res.current
        pagination.pageSize = res.size
        pagination.total = res.total
      }).catch(() => { });
    }
    pageCategories()

    function deleteCategory(id) {
      axios.delete('/fan-web/blog/category/deleteCategory/' + id).then(response => {
        if (response.data.code === 200) {
          ElMessage({
            message: response.data.message,
            type: 'success'
          })

          pageCategories()
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

    function updateCategory(row) {
      dialog.update = true
      updateRow.data = row
    }

    function handleCurrentChange() {
      pageCategories()
    }

    function handleSizeChange() {
      pageCategories()
    }

    return {
      queryForm, dialog, categories, pagination, updateRow
      , pageCategories, deleteCategory, multipleSelection, handleSelectionChange, updateCategory
      , handleCurrentChange, handleSizeChange
    }
  },
  components: {
    CategoryAdd, CategoryUpdate
  }
}
</script>

<style scoped>
.el-form .el-input,
.el-form .el-select {
  width: 200px;
}
</style>