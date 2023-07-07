<template>
  <el-container>
    <el-main class="alignStyle verticalStyle">
      <el-form
        :model="loginForm"
        size="large"
        @keyup.enter="login"
      >
        <h1> Sign in to Fan's Web </h1>

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
    </el-main>

    <el-footer>
      <div>
        <span>
          <a
            href="https://beian.miit.gov.cn/"
            target="_blank"
          > 湘ICP备2022002121号-1 </a>
        </span>
        <br />
        <span> Copyright 2021-2023 Fan. All Rights Reserved </span>
      </div>
    </el-footer>
  </el-container>
</template>

<script>
import { inject, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Login',
  setup() {
    const axios = inject('axios')
    const router = useRouter()
    const store = useStore()

    let loginForm = reactive({
    })

    let captcha = reactive({
      img: ''
    })

    function login() {
      axios.post('/fan-web/api/login', loginForm).then(response => {
        if (response.data.code === 200) {
          ElMessage({
            message: response.data.message,
            type: 'success'
          })
          store.state.userInfo = response.data.data
          localStorage.setItem('JWT', 'JWT')
          localStorage.setItem('username', response.data.data.username)
          router.push('/')
        } else {
          ElMessage({
            message: response.data.message,
            type: 'error'
          })
          getCaptcha()
        }
      }).catch(() => { });
    }

    function getCaptcha() {
      axios.get('/fan-web/api/getCaptcha').then(response => {
        loginForm.token = response.data.data.token
        captcha.img = response.data.data.captchaImg;
      }).catch(() => { });
    }
    getCaptcha()

    return {
      loginForm, captcha, login, getCaptcha
    }
  }
}
</script>

<style scoped>
.el-container {
  height: 100%;
  min-height: 521px;
  min-width: 650px;
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
.el-footer {
  height: 60px;
  text-align: center;
  color: #9e9e9e;
  padding: 10px;
}
a {
  color: #9e9e9e;
  text-decoration: none;
}
</style>