<template>
  <div style="padding: 20px">
    <!-- 查询表单 -->
    <el-row>
      <el-col>
        <el-form
          :model="queryForm"
          :inline="true"
          ref="queryFormRef"
          label-position="right"
          label-width="40px"
          @keyup.enter="pageWords"
        >
          <el-form-item
            label="英文"
            prop="en"
          >
            <el-autocomplete
              v-model="queryForm.en"
              value-key="en"
              :fetch-suggestions="queryEn"
              :trigger-on-focus="false"
              :debounce="0"
              clearable
              placeholder="请输入英文"
            />
          </el-form-item>
          <el-form-item
            label="中文"
            prop="cn"
          >
            <el-input
              v-model="queryForm.cn"
              clearable
              placeholder="请输入中文"
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
                label="掌握"
                value="0"
              />
              <el-option
                label="熟悉"
                value="1"
              />
              <el-option
                label="模糊"
                value="2"
              />
              <el-option
                label="陌生"
                value="3"
              />
            </el-select>
          </el-form-item>

          <el-form-item>
            <el-button
              type="primary"
              size="small"
              @click="(event) => {
              pageWords()
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
            @confirm="deleteWord(multipleSelection.data)"
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
          :data="words.data"
          max-height="390px"
          @selection-change="handleSelectionChange"
          style="margin-top: 10px;"
        >
          <el-table-column type="selection" />
          <el-table-column
            label="英文"
            prop="en"
            align="center"
            min-width="150px"
          />
          <el-table-column
            label="音标"
            prop="pronunciation"
            align="center"
            min-width="180px"
          >
            <template #default="scope">
              <el-tag size="large">
                {{ scope.row.pronunciation }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column
            label="中文"
            prop="cn"
            align="center"
            min-width="521px"
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
                v-if="scope.row.flag === '0'"
                size="small"
                type="success"
              >掌握</el-tag>
              <el-tag
                v-else-if="scope.row.flag === '1'"
                size="small"
                type="warning"
              >熟悉</el-tag>
              <el-tag
                v-else-if="scope.row.flag === '2'"
                size="small"
                type="info"
              >模糊</el-tag>
              <el-tag
                v-else-if="scope.row.flag === '3'"
                size="small"
                type="danger"
              >陌生</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            align="center"
            min-width="220px"
            fixed="right"
          >
            <template #default="scope">
              <el-button
                type="primary"
                size="small"
                @click="(event) => {
                updateWord(scope.row)
                this.unFocus(event)
              }"
              >编 辑</el-button>
              <el-popconfirm
                title="确认删除吗？"
                confirm-button-text="确 认"
                cancel-button-text="取 消"
                cancel-button-type="info"
                @confirm="deleteWord(scope.row.id)"
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
                type="info"
                size="small"
                @click="(event) => {
                detailWord(scope.row)
                this.unFocus(event)
              }"
              >详 情</el-button>
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
  </div>

  <WordAdd
    :dialog="dialog"
    @pageWords="pageWords"
  />
  <WordEdit
    :dialog="dialog"
    :updateRow="updateRow.data"
    @pageWords="pageWords"
  />
  <WordDetail
    :dialog="dialog"
    :detailRow="detailRow.data"
  />
</template>

<script>
import { inject, reactive } from 'vue'
import qs from 'qs'
import WordAdd from './WordAdd.vue'
import WordEdit from './WordEdit.vue'
import WordDetail from './WordDetail.vue'
import { ElMessage } from 'element-plus'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Word',
  setup() {
    const axios = inject('axios')

    let queryForm = reactive({
    })

    let words = reactive({
      data: []
    })

    let pagination = reactive({
      currentPage: 1,
      pageSize: 10,
      total: 10
    })

    let multipleSelection = reactive({
      data: []
    })

    let dialog = reactive({
      addDialogVisible: false,
      editDialogVisible: false,
      detailDialogVisible: false
    })

    let updateRow = reactive({
      data: {}
    })

    let detailRow = reactive({
      data: {}
    })

    function pageWords() {
      let params = qs.stringify({
        en: queryForm.en,
        cn: queryForm.cn,
        flag: queryForm.flag,
        currentPage: pagination.currentPage,
        pageSize: pagination.pageSize
      }, { arrayFormat: 'repeat' })

      axios.get('/fan-web/word/pageWords?' + params).then(response => {
        let res = response.data.data
        words.data = res.records
        pagination.currentPage = res.current
        pagination.pageSize = res.size
        pagination.total = res.total
      })
    }
    pageWords()

    function handleSelectionChange(selection) {
      multipleSelection.data = selection.map(select => select.id)
    }

    function handleCurrentChange() {
      pageWords()
    }

    function handleSizeChange() {
      pageWords()
    }

    function updateWord(row) {
      dialog.editDialogVisible = true
      updateRow.data = row
    }

    function detailWord(row) {
      dialog.detailDialogVisible = true
      detailRow.data = row
    }

    function deleteWord(id) {
      axios.delete('/fan-web/word/deleteWord/' + id).then(response => {
        if (response.data.code === 200) {
          ElMessage({
            message: response.data.message,
            type: 'success'
          })

          pageWords()
        } else {
          ElMessage({
            message: response.data.message,
            type: 'error'
          })
        }
      })
    }

    let timeout
    function queryEn(queryString, cb) {
      clearTimeout(timeout)

      timeout = setTimeout(() => {
        if (queryForm.en) {
          axios.get('/fan-web/word/listWords/' + queryForm.en).then(response => {
            let results = queryString
              ? response.data.data.filter(createFilter(queryString))
              : response.data.data
            cb(results)
          })
        }
      }, 500 * Math.random())

    }

    function createFilter(queryString) {
      return (item) => {
        return (
          item.en.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        )
      }
    }

    return {
      queryForm, words, multipleSelection, pagination, dialog, updateRow, detailRow
      , pageWords, handleSelectionChange, handleCurrentChange, handleSizeChange
      , updateWord, deleteWord, detailWord, queryEn
    }
  },
  components: {
    WordAdd, WordEdit, WordDetail
  }
}
</script>

<style scoped>
.el-form .el-input,
.el-form .el-select {
  width: 200px;
}
:deep(.el-input__wrapper) {
  width: 180px;
}
</style>