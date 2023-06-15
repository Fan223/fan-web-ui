<template>
  <el-container>
    <!-- 头像信息 -->
    <div>
      <el-upload
        action="#"
        :http-request="upload"
        :show-file-list="false"
        :before-upload="handleUpload"
      >
        <el-avatar
          :src="$store.state.userInfo.avatar"
          :size="280"
          class="avatar"
        />
        <el-avatar
          :size="280"
          class="mask"
        >
          <el-icon :size="40">
            <Plus />
          </el-icon>
        </el-avatar>
      </el-upload>

      <div style="text-align: center; margin-left: 40px;">
        <h2> {{$store.state.userInfo.username}} </h2>
      </div>
    </div>

    <el-tabs v-model="activeName.value">
      <!-- 基本资料 -->
      <el-tab-pane
        label="基本资料"
        name="BASE_INFO"
      >
        <el-form
          :model="userInfo"
          ref="userInfoRef"
          size="large"
          :disabled="status.value"
          label-position="right"
          label-width="80px"
        >
          <el-form-item
            label="用户名"
            prop="username"
          >
            <el-input
              v-model="userInfo.username"
              placeholder="请输入用户名"
              clearable
            />
          </el-form-item>
          <el-form-item
            label="邮箱"
            prop="email"
          >
            <el-input
              v-model="userInfo.email"
              placeholder="请输入邮箱"
              clearable
            />
          </el-form-item>
          <el-form-item
            label="手机号"
            prop="phone"
          >
            <el-input
              v-model="userInfo.phone"
              placeholder="请输入手机号"
              clearable
            />
          </el-form-item>
          <el-form-item
            label="生日"
            prop="birthday"
          >
            <el-input
              v-model="userInfo.birthday"
              placeholder="请输入生日"
              clearable
            />
          </el-form-item>
        </el-form>

        <div class="verticalStyle">
          <el-button
            type="primary"
            v-if="status.value"
            @click="(event) => {
              status.value = !status.value
              this.unFocus(event)
            }"
          >编 辑</el-button>
          <el-button
            type="primary"
            v-if="!status.value"
            @click="(event) => {
              status.value = !status.value
              this.unFocus(event)
            }"
          >保 存</el-button>
          <el-button
            type="info"
            v-if="!status.value"
            @click="(event) => {
              this.$refs.userInfoRef.resetFields()
              status.value = !status.value
              this.unFocus(event)
            }"
          >取 消</el-button>
        </div>
      </el-tab-pane>

      <!-- 修改密码 -->
      <el-tab-pane
        label="修改密码"
        name="UPDATE_PASSWORD"
      >
        <el-form
          :model="passwordForm"
          ref="passwordFormRef"
          size="large"
          label-position="right"
          label-width="80px"
        >
          <el-form-item
            label="原密码"
            prop="currentPassword"
          >
            <el-input
              v-model="passwordForm.currentPassword"
              placeholder="请输入原密码"
              clearable
            />
          </el-form-item>
          <el-form-item
            label="新密码"
            prop="newPassword"
          >
            <el-input
              v-model="passwordForm.newPassword"
              placeholder="请输入新密码"
              clearable
            />
          </el-form-item>
          <el-form-item
            label="确认密码"
            prop="confirmPassword"
          >
            <el-input
              v-model="passwordForm.confirmPassword"
              placeholder="请确认新密码"
              clearable
            />
          </el-form-item>
        </el-form>

        <div class="verticalStyle">
          <el-button
            type="primary"
            @click="(event) => {
              this.unFocus(event)
            }"
          >确 定</el-button>
          <el-button
            type="info"
            @click="(event) => {
              this.$refs.passwordFormRef.resetFields()
              this.unFocus(event)
            }"
          >重 置</el-button>
        </div>
      </el-tab-pane>
    </el-tabs>
  </el-container>
</template>

<script>
import { inject, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { useStore } from 'vuex'

export default {
  name: 'UserCenter',
  setup() {
    const axios = inject('axios')
    const store = useStore()

    let activeName = reactive({
      value: 'BASE_INFO'
    })

    let userInfo = reactive({
      username: 'Fan',
      email: 'fanj.zh@foxmail.com',
      phone: 'xxx',
      birthday: 'xxxx-xx-xx'
    })

    let status = reactive({
      value: true
    })

    let passwordForm = reactive({
    })

    function upload(file) {
      const formData = new FormData();
      formData.append('smfile', file.file);

      axios.post('/api/v2/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': 'DKOwDQZIzbTCvcStycffNU4Yh1D98sju',
        },
      }).then(response => {
        if (response.data.code === 'success') {
          store.state.userInfo.avatar = response.data.data.url;
        }
      });
    }

    function handleUpload(file) {
      let isImg = file.type === 'image/jpeg' || file.type === 'image/png';

      if (!isImg) {
        ElMessage({
          message: '上传头像图片只能是 JPG/PNG 格式!',
          type: 'error'
        })
      }
      return isImg;
    }

    return {
      activeName, userInfo, status, passwordForm, upload, handleUpload
    }
  }
}
</script>

<style scoped>
.avatar {
  margin-left: 40px;
  position: absolute;
  z-index: 1;
}
.mask {
  margin-left: 40px;
  z-index: 5;
  opacity: 0;
}
.mask:hover {
  background-color: #0a0a0a;
  opacity: 0.5;
}
.el-tabs {
  width: 100%;
  margin-left: 60px;
}
.el-form {
  width: 80%;
  margin: 0 auto;
  margin-top: 20px;
}
</style>