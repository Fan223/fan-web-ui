<template>
  <el-container>
    <el-header>
      <b class="alignStyle"> Fan's Web </b>
    </el-header>

    <el-main>
      <el-row>
        <el-col
          :span="6"
          :offset="2"
        >
          <el-button
            dark
            text
            @click="$router.push('/blog')"
          >
            个人博客
          </el-button>
        </el-col>

        <el-col
          :span="6"
          :offset="2"
        >
          <el-button
            dark
            text
            @click="$router.push('/manager')"
          >
            网站后台
          </el-button>

          <div style="margin-left: 50px;">
            <ul>
              <li>
                <b> 博客管理 </b>
                <ul>
                  <li> 文章管理 </li>
                  <li> 分类管理 </li>
                  <li> 标签管理 </li>
                </ul>
              </li>

              <li>
                <b> 系统管理 </b>
                <ul>
                  <li> 菜单管理 </li>
                  <li> 角色管理 </li>
                  <li> 用户管理 </li>
                </ul>
              </li>
            </ul>
          </div>
        </el-col>

        <el-col
          :span="6"
          :offset="2"
        >
          <el-button
            dark
            text
            @click="$router.push('/word')"
          >
            单词管理
          </el-button>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Index'
}
</script>

<style scoped>
.el-header {
  height: 120px;
  line-height: 120px;
}
.el-header b {
  font-size: 40px;
}
.el-button {
  width: 180px;
  height: 80px;
  font-size: 28px;
  font-weight: bold;
}
.el-button:hover {
  background-color: #1d2025 !important;
}
li {
  margin-top: 20px;
}
</style>