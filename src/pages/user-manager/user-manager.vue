<template>
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true">
                <el-form-item label="姓名">
                    <el-input v-model="nick_name" placeholder=""></el-input>
                </el-form-item>
                <el-form-item label="账号">
                    <el-input v-model="user_name" placeholder=""></el-input>
                </el-form-item>
                <el-form-item label="账号类型">
                    <el-select v-model="user_type" placeholder="请选择账号类型">
                        <el-option label="全部" value=""></el-option>
                        <el-option label="星美内部" value="3"></el-option>
                        <el-option label="商家" value="2"></el-option>
                        <el-option label="用户" value="1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="商家ID">
                    <el-input v-model="business_id" placeholder=""></el-input>
                </el-form-item>
                <el-form-item label="商家名称">
                    <el-input v-model="business_name" placeholder=""></el-input>
                </el-form-item>
                <el-form-item label="门店ID">
                    <el-input v-model="shop_id" placeholder=""></el-input>
                </el-form-item>
                <el-form-item label="门店名称">
                    <el-input v-model="shop_name" placeholder=""></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="getUsers">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="resetGet">重置</el-button>
                </el-form-item>
            </el-form>
        </el-col>

        <!--列表-->
        <el-col class="colgroup-tab">
            <span>账号管理列表</span>
            <div>
                <el-button type="button" @click="addUser">新增</el-button>
                <el-button type="button" @click="downUser">导出</el-button>
            </div>
        </el-col>
        <el-table :data="userList" highlight-current-row v-loading="listLoading" @selection-change="selectChange" style="width: 100%;">
            <el-table-column type="selection" width="40">
            </el-table-column>
            <el-table-column prop="name" label="序号" width="70">
                <template scope="scope">
                    <span>{{scope.$index+1+(pageNum-1)*pageSize}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="username" label="账号" width="120">
            </el-table-column>
            <el-table-column prop="nickName" label="姓名" width="120">
            </el-table-column>
            <el-table-column prop="systemType" label="系统" width="80">
                <template scope="scope">
                    <span>{{scope.row.systemType==1?'门店用户':scope.row.userType==2?'商家':'运营用户'}}</span>
                </template>
            </el-table-column>
            <el-table-column label="人员类型" width="80">
                <template scope="scope">
                    <span>{{scope.row.userType==1?'门店':scope.row.userType==2?'商家用户':'星美内部'}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="businessId" label="商家ID" width="80">
            </el-table-column>
            <el-table-column prop="businessName" label="商家名称" width="200">
            </el-table-column>
            <el-table-column prop="shopId" label="门店ID" width="80">
            </el-table-column>
            <el-table-column prop="shopName" label="门店名称" width="120">
            </el-table-column>
            <el-table-column label="操作" width="150">
                <template scope="scope">
                    <el-button type="text" size="small" @click="userDel(scope.row.userId)"><i class="iconfont icon-cuo"></i></el-button>
                </template>
            </el-table-column>
        </el-table>


        <!--分页-->
        <el-col :span="24" class="toolbar">
            <el-pagination layout="total,prev, pager, next,jumper" @current-change="userCurrentChange" :total="total" :page-size="10"
                style="float:right;">
                </el-pagination>
        </el-col>
    </section>
</template>
<script>
    export default {
        data() {
            return {
                listLoading: false,
                name: '',
                nick_name: '',
                user_name: '',
                user_type: '',
                business_id: '',
                business_name: '',
                shop_id: '',
                shop_name: '',
                userList: [],
                pageNum: 1,
                pageSize: 10,
                total: 0
            }

        },
        mounted() {
            this.getUsers();
        },
        methods: {
            getUsers() {
                this.$_api.get({
                    'ext': 'user/page',
                    'pageNum': this.pageNum,
                    'pageSize': this.pageSize,
                    'nickName': this.nick_name,
                    'username': this.user_name,
                    'userType': this.user_type,
                    'businessId': this.business_id,
                    'businessName': this.business_name,
                    'shopId': this.shop_id,
                    'shopName': this.shop_name
                })
                    .then(res => {
                        if (res.code == 1) {
                            console.log(res);
                            this.userList = res.data.list;
                            this.total = res.data.total;
                        } else if (res.code == 3) {
                            this.$alert(res.msg, '提示', {
                                confirmButtonText: '确定',
                                callback: action => {
                                    this.$router.push({ path: '/login' });
                                }
                            });
                        } else {
                            this.$_showtip(res.msg);
                        }

                    })
            },
            resetGet() {
                this.pageNum = 1;
                this.pageSize = 10;
                this.nick_name = '';
                this.user_name = '';
                this.user_type = '';
                this.business_id = '';
                this.business_name = '';
                this.shop_id = '';
                this.shop_name = '';
                this.getUsers();
            },
            addUser() {
                this.$router.push({path:'/user-add'})
             },
             downUser(){},
            selectChange() { },
            userDel(id) {
                this.$confirm('是否确认删除选中的该行信息?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(() => {
                    this.$_api.post({
                        'ext': 'user/delete',
                        'ids': id
                    }).then(res => {
                        if (res.code == 1) {
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            this.getUsers();
                        } else {
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                        }
                    })

                }).catch(() => {
                });

            },
            userCurrentChange(value) {
                console.log(value);
                this.pageNum = value;
                this.getUsers();
            }
        }
    }

</script>
<style lang="scss" src="../user-manager/user-manager.scss" scoped></style>