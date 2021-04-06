import axios from 'axios'
import router from '../router/index.js'
import {
  Message,
  Loading
} from 'element-ui'

const Axios = axios.create({
  // baseURL: "http://localhost:9085",
  timeout: 10000
})

Axios.install = (Vue) => {
  Vue.prototype.$http = Axios
}

let loading // 定义loading变量

function startLoading () { // 使用Element loading-start 方法
  loading = Loading.service({
    lock: true,
    text: '加载中...',
    background: 'rgba(0, 0, 0, 0.7)'
  })
}

function endLoading () { // 使用Element loading-close 方法
  loading.close()
}

// 请求拦截  设置统一header
Axios.interceptors.request.use(
  config => {
    // 加载
    startLoading()
    if (sessionStorage.getItem("token")) {
      // console.log(sessionStorage.getItem("token"));
      config.headers.Authorization = sessionStorage.getItem("token")
    }
    // if (localStorage.eleToken) {
    //   config.headers.Authorization = localStorage.eleToken
    // }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截  401 token过期处理
Axios.interceptors.response.use(
  response => {
    endLoading()
    return response
  },
  error => {
    // 错误提醒
    endLoading()
    Message.error(error.response.data)

    const { status } = error.response
    if (status === 401) {
      Message.error('token值无效，请重新登录')
      // 清除token
      localStorage.removeItem('eleToken')

      // 页面跳转
      router.push('/login')
    }

    return Promise.reject(error)
  }
)

export default Axios
