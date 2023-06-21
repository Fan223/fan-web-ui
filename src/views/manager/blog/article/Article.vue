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
        @keyup.enter="pageArticles"
      >
        <el-form-item
          label="文章标题"
          prop="title"
        >
          <el-input
            v-model="queryForm.title"
            clearable
            placeholder="请输入文章标题"
          />
        </el-form-item>
        <el-form-item
          label="文章分类"
          prop="categoryId"
        >
          <el-select
            v-model="queryForm.categoryId"
            clearable
            placeholder="请选择文章分类"
          >
            <el-option
              v-for="category in categories.data"
              :key="category.id"
              :label="category.name"
              :value="category.id"
            />
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button
            type="primary"
            size="small"
            @click="(event) => {
              pageArticles()
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
            $router.push('/article/add')
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
          @confirm="deleteArticle(multipleSelection.data)"
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
        :data="articles.data"
        @selection-change="handleSelectionChange"
        style="margin-top: 10px;"
        max-height="400px"
      >
        <el-table-column type="selection" />
        <el-table-column
          label="标题"
          prop="title"
          align="center"
          min-width="350px"
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
          min-width="210px"
        >
          <template #default="scope">
            <el-button
              type="primary"
              size="small"
              @click="(event) => {
                updateArticle(scope.row.id)
                this.unFocus(event)
              }"
            >编 辑</el-button>

            <el-popconfirm
              title="确认删除吗？"
              confirm-button-text="确 认"
              cancel-button-text="取 消"
              cancel-button-type="info"
              @confirm="deleteArticle(scope.row.id)"
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

            <el-button
              type="primary"
              size="small"
              @click="(event) => {
                previewArticle(scope.row.id)
                this.unFocus(event)
              }"
            >预 览</el-button>
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
</template>

<script>
import { inject, reactive } from 'vue'
import qs from 'qs'
import { ElMessage } from 'element-plus'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Article',
  setup() {
    const axios = inject('axios')

    let queryForm = reactive({
    })

    let categories = reactive({
      data: []
    })

    let pagination = reactive({
      currentPage: 1,
      pageSize: 10,
      total: 10
    })

    let articles = reactive({
      data: []
    })

    let multipleSelection = reactive({
      data: []
    })

    function listCategories() {
      axios.get('/fan-web/blog/category/listCategories').then(response => {
        categories.data = response.data.data
      })
    }
    listCategories()

    function pageArticles() {
      let params = qs.stringify({
        title: queryForm.title,
        categoryId: queryForm.categoryId,
        currentPage: pagination.currentPage,
        pageSize: pagination.pageSize
      }, { arrayFormat: 'repeat' })

      axios.get('/fan-web/blog/article/pageArticles?' + params).then(response => {
        let res = response.data.data

        articles.data = res.records
        pagination.currentPage = res.current
        pagination.pageSize = res.size
        pagination.total = res.total
      }).catch(() => { });
    }
    pageArticles()

    function deleteArticle(id) {
      axios.delete('/fan-web/blog/article/deleteArticle/' + id).then(response => {
        if (response.data.code === 200) {
          ElMessage({
            message: response.data.message,
            type: 'success'
          })

          pageArticles()
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

    function updateArticle(id) {
      window.open('/article/update/' + id, '_blank')
    }

    function previewArticle(id) {
      window.open('/article/preview/' + id, '_blank')
    }

    function handleCurrentChange() {
      pageArticles()
    }

    function handleSizeChange() {
      pageArticles()
    }

    return {
      queryForm, categories, articles, pagination, pageArticles, deleteArticle
      , multipleSelection, handleSelectionChange, updateArticle
      , previewArticle, handleCurrentChange, handleSizeChange
    }
  },
}
</script>

<style scoped>
.el-form .el-input,
.el-form .el-select {
  width: 200px;
}
</style>