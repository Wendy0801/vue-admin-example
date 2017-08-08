import Vue from 'vue'


import Mock from './mock'
Mock.bootstrap();

// 引用自定义配置后的第三方库
import '@/libs'
import 'font-awesome/css/font-awesome.min.css'

import './themes/main.scss'

// @ => 代替根路径下的src目录
import App from '@/App'

// vue-router路由管理
import router from '@/router'
// vuex全局状态管理
import store from '@/store'




// console.log(store)

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

