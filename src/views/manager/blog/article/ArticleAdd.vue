<template>
  <!-- 头部 -->
  <el-container v-show="$store.state.collapse.vditorHeader">
    <el-button
      :icon="ArrowLeftBold"
      @click="routerArticle"
    >
      <b> 文章管理 </b>
    </el-button>

    <el-form :model="addForm">
      <el-form-item prop="title">
        <el-input
          v-model="addForm.title"
          placeholder="请输入标题"
          clearable
          maxlength="100"
          show-word-limit
        />
      </el-form-item>
    </el-form>

    <el-button @click="(event) => {
        dialog.visible = true
        addForm.content = this.$refs.vditorRef.vditor.getValue()
        this.unFocus(event)
      }">
      <b> 发布 </b>
      <el-icon class="el-icon--right">
        <Promotion />
      </el-icon>
    </el-button>
  </el-container>

  <Vditor
    ref="vditorRef"
    :form="addForm"
  />
  <ArticlePublish
    :dialog="dialog"
    :form="addForm"
  />
</template>

<script>
import { reactive } from 'vue'
import Vditor from '@/components/Vditor.vue';
import { ArrowLeftBold } from '@element-plus/icons-vue'
import ArticlePublish from './ArticlePublish.vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

export default {
  name: 'ArticelAdd',
  setup() {
    const router = useRouter()
    const store = useStore()

    let addForm = reactive({
      title: '',
      content: ''
    })

    let dialog = reactive({
      visible: false
    })

    function routerArticle() {
      router.push('/blog/article').then(() => {
        let currentRoute = router.currentRoute.value

        let addTab = {
          id: currentRoute.meta.id,
          name: currentRoute.meta.title
        }
        store.commit('ADD_TAB', addTab)
      })
    }

    return {
      ArrowLeftBold, addForm, dialog, routerArticle
    }
  },
  components: {
    Vditor, ArticlePublish
  }
}
</script>

<style scoped>
.el-container {
  height: 50px;
}
.el-button {
  height: 100%;
  width: 120px;
  border: none;
}
.el-button:hover {
  background-color: #1d2025;
}
.el-form {
  width: 85%;
}
.el-form-item {
  margin-top: 5px;
}
.el-input {
  height: 40px;
}
</style>