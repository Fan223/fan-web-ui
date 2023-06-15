<template>
  <div class="container">
    <el-form
      :model="loginForm"
      size="large"
      @keyup.enter="login"
    >
      <h1> Sign in to fan-web </h1>

      <el-form-item prop="username">
        <el-input
          v-model="loginForm.username"
          placeholder="Username"
          clearable
        />
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="loginForm.password"
          show-password
          placeholder="Password"
          clearable
        />
      </el-form-item>
      <el-form-item prop="captcha">
        <el-input
          v-model="loginForm.captcha"
          placeholder="Captcha"
          clearable
          style="width: 331px;"
        />
        <el-image
          :src="captcha.img"
          @click="getCaptcha"
          style="margin-left: 20px;"
        />
      </el-form-item>

      <el-form-item>
        <el-button
          type="primary"
          size="large"
          @click="login"
        > Sign In </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { inject, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Login',
  setup() {
    const axios = inject('axios')
    const router = useRouter()

    let loginForm = reactive({
    })

    let captcha = reactive({
      str: '',
      img: ''
    })

    function login() {
      if (loginForm.captcha !== captcha.str) {
        ElMessage({
          message: '验证码错误',
          type: 'error'
        })
        loginForm.captcha = ''
        getCaptcha()
      } else if ((loginForm.username === 'fan' && loginForm.password === 'fan223')
        || (loginForm.username === 'tourists' && loginForm.password === 'tourists')) {
        localStorage.setItem('JWT', 'JWT')
        router.push('/').then(() => {
          ElMessage({
            message: '登录成功',
            type: 'success'
          })
        })
      } else {
        ElMessage({
          message: '用户名或密码错误',
          type: 'error'
        })
        loginForm.captcha = ''
        getCaptcha()
      }
    }

    function getCaptcha() {
      axios.get('/fan-web/api/getCaptcha').then((response) => {
        captcha.str = response.data.data.captchaStr;
        captcha.img = response.data.data.captchaImg;
      });
    }
    getCaptcha()

    return {
      loginForm, captcha, login, getCaptcha
    }
  }
}
</script>

<style scoped>
.container {
  height: 100%;
  min-height: 521px;
  min-width: 650px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url("@/assets/background.jpg");
  background-size: 100% 100%;
  color: #dddddd;
}
.el-form {
  background-color: rgb(0, 0, 0, 0.5);
  width: 521px;
  height: 300px;
  padding: 50px;
  padding-top: 10px;
  text-align: center;
}
.el-input {
  --el-input-border-color: #9e9e9e;
  --el-input-placeholder-color: #9e9e9e;
}
.el-button {
  width: 100%;
  background-color: #2ea043;
  border: none;
}
</style>