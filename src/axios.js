import axios from "axios";
import { ElMessage } from "element-plus";
import router from "./router";


const request = axios.create({
  timeout: 3000,
  headers: {
    'Content-Type': 'application/json',
  },
});

request.interceptors.request.use(config => {
  if (localStorage.getItem("JWT")) {
    config.headers.Authorization = localStorage.getItem("JWT")
  }
  return config
});

request.interceptors.response.use(response => {
  return response;
}, error => {
  if (error.response) {
    switch (error.response.status) {
      case 400:
        ElMessage({
          message: '请求错误',
          type: 'error'
        })
        break;
      case 401:
        router.push('/login');
        ElMessage({
          message: '登录已过期, 请重新登录',
          type: 'error'
        })
        break;
      case 403:
        ElMessage({
          message: error.response.data.message,
          type: 'error'
        })
        break;
      case 404:
        ElMessage({
          message: '请求错误,未找到该资源',
          type: 'error'
        })
        break;
      case 500:
        ElMessage({
          message: '服务器出错',
          type: 'error'
        })
        break;
      default:
        ElMessage({
          message: '未知错误',
          type: 'error'
        })
    }
  } else {
    if (error.message.includes('timeout')) {
      ElMessage({
        message: '请求超时',
        type: 'error'
      })
    }
  }

  return Promise.reject(error);
});

export default request