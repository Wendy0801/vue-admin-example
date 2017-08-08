// 路由钩子
import Vue from 'vue'
import store from '@/store'
import router from './router'
import cookie from '@/services/cookie'

import NProgress from 'nprogress'; // Progress 进度条
import 'nprogress/nprogress.css';// Progress 进度条 样式

// 此处可以针对路由配置做一些处理,以及页面切换之前一些存储,跳转后的一些数据回复
router.beforeEach((to, now, next) => {
  var managerToken = cookie.get('manager_token');
  if (!managerToken && to.path !== '/login') {
    next({ path: '/login' })
  }
  else {
    NProgress.start(); // 开启Progress
    // 如果要保存当前页面的滚动条位置,且将要跳转的地址对应配置项
    if (now.meta.storePostion) {
      let _shouldStore = now.meta.storeWhenGo.filter(item => to.name === item)
      now.meta.positionY = (_shouldStore.length > 0) ? document.body.scrollTop : 0
    }
    // store.dispatch('TOGGLE_LOAD_STATU', true);
    next();
  }
});

router.afterEach(route => {
  Vue.nextTick(() => {
    setTimeout(() => {
      // 如果要跳转的地址已经保存了滚动条位置,则需要恢复原来位置
      if (route.meta.storePostion) {
        document.body.scrollTop = route.meta.positionY || 0
      }
      document.title = route.meta.title || '星美生活优惠券平台-运营后台'
      // store.dispatch('TOGGLE_LOAD_STATU', false);
    }, 300)
    NProgress.done(); // 结束Progress
  });
});
