<template>
    <div class="login-container">
        <div class="login-bg">
            <el-form :model="loginForm" :rules="rules2" ref="loginForm" label-position="left" label-width="0px" class="demo-ruleForm card-box loginform">
                <div class="form-head">
                    <div class="logo"><img src="../../assets/logo-oval.png"></div>
                    <h3 class="title">星美生活优惠券平台-运营后台</h3>
                </div>
                <div class="form-contian">
                    <el-form-item prop="username">
                        <i class="iconfont icon-touxiang"></i>
                        <el-input type="text" v-model="loginForm.username" auto-complete="off" placeholder="账号"></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <i class="iconfont icon-mima1"></i>
                        <el-input type="password" v-model="loginForm.password" auto-complete="off" placeholder="密码"></el-input>
                    </el-form-item>
                    <el-checkbox v-model="isRemeberMe" style="margin:0px 0px 35px 0px;">记住密码</el-checkbox>
                    <el-form-item style="width:100%;" :class="{'active':isEmpty}">
                        <el-button type="primary" style="width:100%;" @click.native.prevent="loginNow">登录</el-button>
                    </el-form-item>
                </div>

            </el-form>
        </div>
    </div>
</template>
<script>
    // import NProgress from 'nprogress'
    // import ApiService from 'SERVICES/api.service';
    // import { Md5 } from 'SERVICES/md5.service';

    export default {
        data() {
            return {
                isEmpty: true,
                logining: false,
                loginForm: {
                    username: '',
                    password: ''
                },
                rules2: {
                    username: [
                        { required: true, message: '请输入账号', trigger: 'blur' },
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                    ]
                },
                isRemeberMe: '',
            };
        },
        mounted: function () {
        },
        methods: {
            loginNow() {
                // if (this.logining) {
                //     return fasle;
                // }
                // NProgress.start();
                this.logining = true;
                this.verifyData()
                    .then(res => {
                        this.$_api.post({
                            'ext': 'login/user-login',
                            'username': this.loginForm.username,
                            'password': this.$_api.md5(this.loginForm.password)
                            // 'password': this.loginForm.password
                        }).then(res => {
                            console.log(res);
                            if (res.code === 1) {
                                this.$message({
                                    type: 'success',
                                    message: '登录成功!'
                                });
                                this.logining = false;
                                this.$_cookie.set({
                                    'userinfo': JSON.stringify({
                                        token: res.data.managerToken,
                                        username: res.data.user.username,
                                        userMobile: res.data.user.mobile
                                    }),
                                    'manager_token': res.data.managerToken
                                });
                                this.$router.push({ 'path': '/' });
                                // this.getUserAuth(res.data.data.ssUserId);

                            }
                            else {
                                this.logining = false;
                                  this.$message({
                                    type: 'success',
                                    message: res.msg
                                });
                            }
                        })
                    })
            },
            verifyData() {
                return new Promise(resolve => {
                    this.$refs.loginForm.validate((valid) => {
                        if (valid) {
                            resolve(true);
                        }
                    })
                })
            }
        }
    }

</script>

<style scoped>
    .login-container {
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background-color: #F9FBFC;
        position: fixed;
    }
    
    .card-box {
        padding: 20px;
        /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
        -webkit-border-radius: 5px;
        border-radius: 5px;
        -moz-border-radius: 5px;
        background-clip: padding-box;
        margin-bottom: 20px;
        background-color: #fff;
        /*margin: 180px auto;*/
        width: 400px;
        /*border: 2px solid #8492A6;*/
    }
    
    .title {
        margin: 0px auto 40px auto;
        text-align: center;
        color: #505458;
    }
    
    .login-bg {
        width: 1024px;
        margin: 0 auto;
        background-image: url("../../assets/bg_login-in2.png");
        height: 940px;
        background-size: 100%;
        background-repeat: no-repeat;
        background-position: 50% 50%;
        position: relative;
    }
    
    .loginform {
        width: 450px;
        /*padding: 35px 35px 15px 35px;*/
        padding: 0;
        position: absolute;
        top: 185px;
        left: 296px;
        box-shadow: 0px 0px 10px #bbb;
    }
    
    .form-head {
        background: #34495E;
        height: 70px;
        line-height: 70px;
        border-radius: 5px 5px 0 0;
        padding-top: 40px;
        position: relative;
    }
    
    .title {
        opacity: 0.9;
        font-size: 18px;
        color: #FFFFFF;
        font-weight: normal;
        margin: 0px;
    }
    
    .logo {
        left: 175px;
        top: -50px;
        position: absolute;
    }
    
    .logo img {
        width: 100px;
    }
    
    .form-contian {
        padding: 30px 24px;
    }
    
    .active button {
        background: #99A4AE;
        border-color: #99A4AE;
    }
</style>