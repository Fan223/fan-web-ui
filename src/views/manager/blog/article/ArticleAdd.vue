<template>
  <!-- 头部 -->
  <el-container v-show="$store.state.collapse.blogHeader">
    <el-button
      :icon="ArrowLeftBold"
      class="left"
      @click="$router.push('/blog/article')"
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

    <el-button
      @click="(event) => {
        dialog.visible = true
        addForm.content = this.$refs.vditorRef.vditor.getValue()
        this.unFocus(event)
      }"
      class="right"
    >
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

export default {
  name: 'ArticelAdd',
  setup() {
    let addForm = reactive({
      title: '',
      content: ''
    })

    let dialog = reactive({
      visible: false
    })

    return {
      ArrowLeftBold, addForm, dialog
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
.left {
  height: 100%;
  width: 120px;
  border: none;
}
.left:hover {
  background-color: #1d2025;
}
.el-form {
  margin-left: 20px;
  width: 85%;
}
.el-form-item {
  margin: 0;
  margin-top: 5px;
}
.el-input {
  height: 40px;
}
.right {
  margin-left: 10px;
  margin-right: 10px;
  height: 100%;
  width: 100px;
  border: none;
}
.right:hover {
  background-color: #1d2025;
}
</style>