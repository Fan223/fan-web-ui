<template>
  <el-dialog
    v-model="props.dialog.visible"
    title="发布文章"
    width="60%"
    :close-on-click-modal="false"
  >
    <el-checkbox-group
      v-model="checkedCategory.name"
      :min="0"
      :max="1"
      v-for="category in categories.data"
      :key="category.id"
    >
      <el-checkbox
        :label="category.name"
        border
        size="large"
        @change="checkedCategory.id = category.id"
      />
    </el-checkbox-group>

    <template #footer>
      <span>
        <el-button
          type="info"
          @click="props.dialog.visible = false"
        >取 消</el-button>
        <el-button
          @click="addArticle"
          type="primary"
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
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

export default {
  name: 'ArticlePublish',
  props: ['dialog', 'form'],
  setup(props) {
    const axios = inject('axios')
    const router = useRouter()
    const store = useStore()

    let categories = reactive({
      data: []
    })

    let checkedCategory = reactive({
      id: 0,
      name: []
    })

    function listCategories() {
      axios.get('/fan-web/blog/category/listCategories').then(response => {
        categories.data = response.data.data
      })
    }
    listCategories()

    function addArticle() {
      // eslint-disable-next-line vue/no-mutating-props
      props.form.categoryId = checkedCategory.id
      axios.post('/fan-web/blog/article/saveArticle', props.form).then(response => {
        if (response.data.code === 200) {
          ElMessage({
            message: '发布成功',
            type: 'success'
          })
          router.push('/blog/article').then(() => {
            let currentRoute = router.currentRoute.value

            let addTab = {
              id: currentRoute.meta.id,
              name: currentRoute.meta.title
            }
            store.commit('ADD_TAB', addTab)
          })
        } else {
          ElMessage({
            message: response.data.message,
            type: 'error'
          })
        }
      })
    }

    return {
      props, categories, checkedCategory, addArticle
    }
  }
}
</script>

<style scoped>
.el-checkbox-group {
  display: inline-block;
}
.el-checkbox {
  margin-left: 20px;
  margin-top: 20px;
}
</style>