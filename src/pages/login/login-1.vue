<template>
  <div class="login-container">
    <el-form autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left" label-width="0px" class="card-box login-form">
      <h3 class="title">系统登录</h3>
      <el-form-item prop="email">
        <el-input name="email" type="text" v-model="loginForm.email" autoComplete="on" placeholder="邮箱"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input name="password" type="password" @keyup.enter.native="handleLogin" v-model="loginForm.password" autoComplete="on" placeholder="密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width:100%;" :loading="loading" @click.native.prevent="handleLogin">
          登录
        </el-button>
      </el-form-item>
    </el-form>
    <el-dialog title="第三方验证" :visible.sync="showDialog">
      邮箱登录成功,请选择第三方验证
      <socialSign></socialSign>
    </el-dialog>
  </div>
</template>

<script>
import { isWscnEmail } from 'utils/validate';

export default {
  name: 'login',
  data() {
    const validateEmail = (rule, value, callback) => {
      if(value===''){
        callback(new Error('请输入账号'));
      }
      else{
        callback();
      }
    };
    const validatePass = (rule, value, callback) => {
      if (value==='') {
        callback(new Error('请输入密码'));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        email: '',
        password: ''
      },
      loginRules: {
        email: [
          { required: true, trigger: 'blur', validator: validateEmail }
        ],
        password: [
          { required: true, trigger: 'blur', validator: validatePass }
        ]
      },
      loading: false,
      showDialog: false
    }
  },
  methods: {
    handleLogin() {
      console.log(this.$refs.loginForm.validate)
      this.$refs.loginForm.validate((valid,msg) => {
        if (valid) {
          this.loading = true;
          this.$router.push('/welcome');
        } else {
          this.$_showtip('请填写完整信息!','error');
          return false;
        }
      });
    },
  },
  created() {
    // window.addEventListener('hashchange', this.afterQRScan);
  },
  destroyed() {
    // window.removeEventListener('hashchange', this.afterQRScan);
  }
}
</script>
<style lang="scss" src="./login.scss" scoped></style>
