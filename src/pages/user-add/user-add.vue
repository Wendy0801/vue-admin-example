<template>
  <div class="user-add-page">
    <el-form ref="form" :model="form" label-width="80px" @submit.prevent="submitAdd" style="margin:20px;width:60%;min-width:600px;">
      <el-form-item label="账号">
        <el-input v-model="form.mobile" type="number" placeholder="请输入手机号码" :maxlength="11"></el-input>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="form.nick_name" placeholder="请输入用户昵称"></el-input>
      </el-form-item>
      <el-form-item label="系统">
        <el-select v-model="form.system_type" placeholder="请选择系统">
          <el-option label="用户端" value="1"></el-option>
          <el-option label="商家后台" value="2"></el-option>
          <el-option label="运营后台" value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="人员类型">
        <el-select v-model="form.user_type" placeholder="请选择人员类型">
          <el-option label="星美内部" value="1"></el-option>
          <el-option label="商家" value="2"></el-option>
          <el-option label="门店" value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商家名称">
        <el-row>
          <el-col :span="18">
            <el-input :value="businessChooseInfo.businessName" placeholder="请选择商家" :disabled="true"></el-input>
          </el-col>
          <el-col :push="1" :span="5">
            <el-button type="primary" @click="showBusinessChoose()">选择商家</el-button>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="门店名称">
        <el-row>
          <el-col :span="18">
            <el-input :value="shopChooseInfo.shopName" placeholder="请选择门店" :disabled="true"></el-input>
          </el-col>
          <el-col :push="1" :span="5">
            <el-button type="primary" @click="showShopChoose()">选择门店</el-button>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item>
        <el-button @click.native.prevent="submitCancel">取消</el-button>
        <el-button type="primary" @click.native.prevent="submitAdd()">保存</el-button>
      </el-form-item>
    </el-form>

    <el-dialog title="请选择商家" :visible.sync="businessChooseVisible">
      <el-row>
        <el-col :span="3">
          商家名称
        </el-col>
        <el-col :span="17">
          <el-input v-model="businessKey" placeholder="请输入商家名称"></el-input>
        </el-col>
        <el-col :push="1" :span="3">
          <el-button type="primary" @click="searchBusiness()">查询</el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="3">
          商家列表
        </el-col>
        <el-col :span="21">
          <el-table :data="businessData">
            <el-table-column property="date" label="序号" width="80">
              <template scope="scope">
                {{scope.$index+1}}
              </template>
            </el-table-column>
            <el-table-column property="businessNo" label="商家编号" width="100"></el-table-column>
            <el-table-column property="businessName" label="商家名称"></el-table-column>
            <el-table-column label="操作" width="80" @click="businessChange(scope)">
              <template scope="scope">
                <el-radio class="radio" v-model="cacheBussinessInfo.businessId" :label="scope.row.businessId"></el-radio>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <el-row>
        <el-col :push="3" :span="21">
          <el-button type="primary" @click="chooseBussiness()">确定</el-button>
        </el-col>
      </el-row>
    </el-dialog>

    <el-dialog title="请选择门店" :visible.sync="shopChooseVisible">
      <el-row>
        <el-col :span="3">
          门店名称
        </el-col>
        <el-col :span="17">
          <el-input v-model="shopKey" placeholder="请输入门店名称"></el-input>
        </el-col>
        <el-col :push="1" :span="3">
          <el-button type="primary" @click="searchShop()">查询</el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="3">
          门店列表
        </el-col>
        <el-col :span="21">
          <el-table :data="shopData">
            <el-table-column property="date" label="序号" width="80">
              <template scope="scope">
                {{scope.$index+1}}
              </template>
            </el-table-column>
            <el-table-column property="shopNo" label="门店编号" width="100"></el-table-column>
            <el-table-column property="shopName" label="门店名称"></el-table-column>
            <el-table-column label="操作" width="80" @click="businessChange(scope)">
              <template scope="scope">
                <el-radio class="radio" v-model="cacheShopInfo.shopId" :label="scope.row.shopId"></el-radio>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <el-row>
        <el-col :push="3" :span="21">
          <el-button type="primary" @click="chooseShop()">确定</el-button>
        </el-col>
      </el-row>
    </el-dialog>

  </div>
</template>
<script>
  import { mapState } from 'vuex'
  export default {
    data() {
      return {
        form: {
          business_id: '',
          shop_id: '',
          system_type: '',
          user_type: '',
          username: '',
          nick_name: '',
          mobile: ''
        },

        dialogVisible: false,

        businessChooseVisible: false,
        businessKey: '',
        businessChecked: false,
        businessData: [],
        businessChooseInfo: {},
        cacheBussinessInfo: {
          businessId: null
        },

        shopChooseVisible: false,
        shopKey: '同步',
        shopData: [],
        shopChooseInfo: {},
        cacheShopInfo: {
          shopId: null
        },
        checked: false,
      }
    },
    computed: {
    ...mapState({
        projects: state => state.activity.projects,
      })
    },
    mounted() {

      console.log(this.$route.params)
    },
    methods: {
      showBusinessChoose() {
        this.businessChooseVisible = true;
        this.searchBusiness();
      },
      closeBusinessChoose() {
        this.businessChooseVisible = false;
      },
      showShopChoose() {
        this.shopChooseVisible = true
      },
      closeShopChoose() {
        this.shopChooseVisible = false
      },
      searchBusiness() {
        this.$_api.get({
          'ext': 'business/queryLikeList',
          'shop_name': this.businessKey,
          'pageNum': 1,
          'pageSize': 1000
        })
          .then(res => {
            if (res.code === 1) {
              this.businessData = res.data.list
            }
            else {
            }
          })
      },
      chooseBussiness() {
        this.closeBusinessChoose()
        var filterResult = this.businessData.filter(item => {
          return item.businessId == this.cacheBussinessInfo.businessId
        })
        if (filterResult.length > 0) {
          this.businessChooseInfo = filterResult[0]
        }
      },
      searchShop() {
        this.$_api.get({
          'ext': 'business/shop/queryLikeList',
          'shop_name': '同步',
          'pageNum': 1,
          'pageSize': 1000,
        })
          .then(res => {
            if (res.code === 1) {
              this.shopData = res.data.list
            }
            else {
            }
          })
      },
      chooseShop() {
        this.closeShopChoose()
        // this.shopChooseInfo = this.cacheShopInfo
        var filterResult = this.shopData.filter(item => {
          return item.shopId == this.cacheShopInfo.shopId
        })
        if (filterResult.length > 0) {
          this.shopChooseInfo = filterResult[0]
        }
      },
      submitAdd() {
        this.form.business_id = this.businessChooseInfo.businessId
        this.form.shop_id = this.shopChooseInfo.shopId
        this.form.username = this.form.mobile
        console.log(this.form)
        this.verifyData()
          .then(res => {
            let _sendForm = Object.assign(this.form, {
              ext: 'user/add'
            })
            this.$_api.post(_sendForm)
              .then(res => {
                if (res.code === 1) {
                  this.$_showtip('保存成功!')
                  this.$router.push({
                    path: '/user-manager'
                  })
                }
                else {
                  throw res.msg
                }
              })
              .catch(err => {
                this.$_showtip(err, 'error')
              })
          })
          .catch(err => {
            this.$_showtip(err, 'error')
          })
      },
      verifyData() {
        return new Promise((resolve, reject) => {
          if (this.form.mobile.trim() === '') {
            reject('账号不能为空')
          }
          if (this.form.nick_name.trim() === '') {
            reject('姓名不能为空')
          }
          if (!this.form.system_type) {
            reject('请选择系统类型')
          }
          if (!this.form.user_type) {
            reject('请选择人员类型')
          }
          // if (!this.form.business_id  this.form.system_type===2) {
          //   reject('请选择商家')
          // }
          resolve(true)
        })
      },
      submitCancel() {
        this.$alert('是否取消当前操作？', '提示', {
          confirmButtonText: '确定',
          callback: action => {
            this.$router.push({
              path: '/user-manager'
            })
          }
        });

      }
    }
  }

</script>
<style lang="scss" src="./user-add.scss" scoped></style>
<style lang="scss">
  .user-add-page {
    .el-radio__label {
      display: none;
    }
    .el-row {
      margin-bottom: 10px;
    }
  }
</style>