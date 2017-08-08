<template>
  <div class="layout" :class="{'layout-hide-text': spanLeft < 5}">
    <!--<core-layout></core-layout>-->
    <router-view></router-view>
    <!--<loading></loading>-->
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import Loading from '@/components/Loadding';

  export default {
    components: {
      'loading': Loading,
    },
    data() {
      return {
        spanLeft: 4,
        spanRight: 20,
        popupVisible: false,
        popupClass: 'info',
        message: '操作成功',
        showMusicPlayer: false,
        musicBarDeg: 0,
      }
    },
    computed: {
    ...mapGetters({
        loadingNow: 'getLoadingStatu',
        actionStatu: 'getActionStatu',
        userinfo: 'getUserinfo',
        isWechat:'getIsWechat',
        isApp:'getIsApp',
      }),
      iconSize() {
        return this.spanLeft === 5 ? 14 : 24;
      }
    },
    watch: {
      'actionStatu': function () {
        this.type = this.actionStatu.type;
        this.popupClass = this.actionStatu.isFromApp
          ? `${this.actionStatu.type} mint-popup-app`
          : this.actionStatu.type;
        this.message = this.actionStatu.message;
        this.popupVisible = true;
        setTimeout(() => {
          this.popupVisible = false;
        }, 1500)
      }
    },
    mounted() {
      // 测试代码
      this.$_cookie.set({
        'manager_token':'manager_cJTTu3keQvv6E7RLrYrM5',
        'userinfo': '{"token":"manager_cJTTu3keQvv6E7RLrYrM5","username":"test2","userMobile":"1380000002"}',
      });
    },
    methods: {
      toggleClick() {
        if (this.spanLeft === 5) {
          this.spanLeft = 2;
          this.spanRight = 22;
        } else {
          this.spanLeft = 4;
          this.spanRight = 20;
        }
      },
      addUserinfo() {
        this.$store.dispatch('SET_USERINFO', {
          username: 'xiaobing',
          age: 27
        })
      },
      changeUserinfo() {
        this.$store.dispatch('SET_USERINFO', {
          username: '张三',
          age: 27
        })
      }
    }
  }

</script>
<style lang="scss" scoped>
  .fade-leave-active {
    opacity: 0;
    transition: all 0.5s ease
  }
</style>