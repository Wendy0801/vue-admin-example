<template>
  <section>
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters">
        <el-form-item label="订单编号">
          <el-input v-model="filters.orderNo" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="订单状态">
          <el-select v-model="filters.orderStatus" placeholder="请选择订单状态">
            <el-option label="全部" value=""></el-option>
            <el-option label="待付款" value="1"></el-option>
            <el-option label="待使用" value="2"></el-option>
            <el-option label="待评价" value="3"></el-option>
            <el-option label="已完成" value="4"></el-option>
            <el-option label="已取消" value="5"></el-option>
            <el-option label="已过期" value="6"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户手机">
          <el-input v-model="filters.mobile"></el-input>
        </el-form-item>
        <el-form-item label="商家名称">
          <el-input v-model="filters.businessName"></el-input>
        </el-form-item>
        <el-form-item label="门店名称">
          <el-input v-model="filters.shopName"></el-input>
        </el-form-item>
        <el-form-item label="商品名称">
          <el-input v-model="filters.goodsName"></el-input>
        </el-form-item>
        <el-form-item label="支付方式">
          <el-select v-model="filters.unit" placeholder="支付方式">
            <el-option label="全部" value="day"></el-option>
            <el-option label="余额支付" value="day"></el-option>
            <el-option label="微信支付" value="day"></el-option>
            <el-option label="支付宝支付" value="day"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <div class="block">
            <span class="demonstration">下单日期</span>
            <el-date-picker v-model="filters.ordertime" type="daterange" align="right" placeholder="选择日期范围" :picker-options="pickerOptions2"
              @change="selectOrderTime">
              </el-date-picker>
          </div>
        </el-form-item>

        <el-form-item>
          <div class="block">
            <span class="demonstration">支付日期</span>
            <el-date-picker v-model="filters.paytime" type="daterange" align="right" placeholder="选择日期范围" :picker-options="pickerOptions2"
              @change="selectPayTime">
              </el-date-picker>
          </div>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="getOrder">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="resetGet">重置</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <!--列表-->
    <el-col class="colgroup-tab">
      <span>订单管理列表</span>
      <div>
        <el-button type="button" @click="downOrder">导出</el-button>
      </div>
    </el-col>
    <el-table :data="orderList" stripe highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column type="index" width="70" label="序号" fixed>
        <template scope="scope">
          <span>{{scope.$index+1+(pageNum-1)*pageSize}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="orderNo" label="订单编号" width="120" fixed>
      </el-table-column>
      <el-table-column prop="orderStatus" label="订单状态" width="120" fixed>
        <template scope="scope">
          <span v-if="scope.row.orderStatus ==1">待付款</span>
          <span v-if="scope.row.orderStatus ==2">待使用</span>
          <span v-if="scope.row.orderStatus ==3">待评论</span>
          <span v-if="scope.row.orderStatus ==4">已完成</span>
          <span v-if="scope.row.orderStatus ==5">已取消</span>
          <span v-if="scope.row.orderStatus ==6">已过期</span>
        </template>
      </el-table-column>
      <el-table-column prop="custName" label="用户名称" width="120">
      </el-table-column>
      <el-table-column prop="mobile" label="用户手机" min-width="180">
      </el-table-column>
      <el-table-column prop="businessId" label="商家ID" min-width="180">
      </el-table-column>
      <el-table-column prop="businessName" label="商家名称" min-width="180">
      </el-table-column>
      <el-table-column prop="orderId" label="商品ID" min-width="180">
      </el-table-column>
      <el-table-column prop="goodsName" label="商品名称" min-width="180">
      </el-table-column>
      <el-table-column prop="description" label="影票赠送" min-width="180">
        <template scope="scope">
          <span v-if="scope.row.goodsType==1">兑换券</span>
          <span v-if="scope.row.goodsType==2">抵扣券</span>
          <span v-else>无</span>
        </template>
      </el-table-column>
      <el-table-column prop="standardPrice" label="特惠价" min-width="180">
      </el-table-column>
      <el-table-column prop="goodsNumber" label="购买数量" min-width="180">
      </el-table-column>
      <el-table-column prop="settlePrice" label="订单总额" min-width="180">
      </el-table-column>
      <el-table-column prop="description" label="支付方式" min-width="180">
        <template scope="scope">
          <span v-if="scope.row.payType=='WX'">微信</span>
          <span v-if="scope.row.payType=='ALI'">支付宝</span>
          <span v-if="scope.row.payType=='FLOW'">流量</span>
        </template>
      </el-table-column>
      <el-table-column prop="expectUseTime" label="预计到店消费时间" min-width="180">
      </el-table-column>
      <el-table-column prop="shopId" label="核销门店ID" min-width="180">
      </el-table-column>
      <el-table-column prop="shopName" label="核销门店名称" min-width="180">
      </el-table-column>
      <el-table-column label="操作" width="150" fixed="right">
        <template scope="scope">
        
            <el-button type="text" size="small" @click="goCheckOrder(scope.row.orderId,scope.row.orderStatus)"><i class="iconfont icon-icon"></i></el-button>
            <el-button type="text" size="small" @click="writeOff(scope.row.orderNo,scope.row.shopId)"><i class="iconfont icon-zhengque1"></i></el-button>
          <!--<el-button size="small" @click="goCheckOrder(scope.row.orderId,scope.row.orderStatus)">查看</el-button>-->
          <!--<el-button type="danger" size="small" @click="writeOff(scope.row.orderNo,scope.row.shopId)">核销</el-button>-->
        </template>
      </el-table-column>
    </el-table>

    <!--工具条-->
    <el-col :span="24" class="toolbar">
      <el-pagination layout="total,prev, pager, next,jumper" @current-change="orderCurrentChange" :total="total" :page-size="10"
        style="float:right;">
        </el-pagination>
    </el-col>

    <!--核销界面-->
    <el-dialog title="核销券码" v-model="writeOffFormVisible" :close-on-click-modal="false">
      <el-form :model="writeOffForm" label-width="120px" :rules="writeOffFormRule" ref="writeOffForm">
        <el-form-item label="订单编号:">
          <span> {{writeOffForm.orderNumber}}</span>
          <input type="hidden" :value="writeOffForm.shopId">
        </el-form-item>
        <el-form-item label="门店名称:" prop="shopName">
          <el-input v-model="writeOffForm.shopName" auto-complete="off" placeholder="输入门店名称关键字进行查询"></el-input>
        </el-form-item>
        <el-form-item label="星美券:" prop="qrCode">
          <el-input v-model="writeOffForm.qrCode" auto-complete="off" placeholder="请输入券码进行核销"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="writeOffFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="writeOffSubmit">核销</el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script>
  import util from '../../common/js/util'
  //import NProgress from 'nprogress'
  import { getUserListPage, removeUser, batchRemoveUser, editUser, addUser } from '../../api/api';
  import axios from 'axios';

  export default {
    data() {
      return {
        pickerOptions2: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        filters: {
          orderNo: '',
          orderStatus: '',
          mobile: '',
          businessName: '',
          shopName: '',
          goodsName: '',
          orderStartTime: '',
          orderEndTime: '',
          orderPayStartTime: '',
          orderPayEndTime: '',
          paytime: '',
          ordertime: '',
        },
        orderList: [],
        total: 0,
        pageNum: 1,
        pageSize: 10,
        listLoading: false,

        writeOffFormVisible: false,//核销界面是否显示
        writeOffFormRule: {
          shopName: [
            { required: true, message: '输入门店名称关键字进行查询', trigger: 'blur' }
          ],
          qrCode: [
            { required: true, message: '请输入券码进行核销', trigger: 'blur' }
          ]
        },
        //核销界面数据
        writeOffForm: {
          orderNumber: '',
          shopId: '',
          shopName: '',
          qrCode: '',
        }

      }
    },
    mounted() {
      this.getOrder();
    },
    methods: {
      goCheckOrder(orderId, orderStatus) {
        this.$router.push({ path: `/check-order/${orderId}` });
      },
      //获取用户列表
      getOrder() {
        this.listLoading = true;
        this.$_api.post({
          'ext': 'order/order-page',
          'pageNum': this.pageNum,
          'pageSize': this.pageSize,
          'orderNo': this.filters.orderNo,
          'orderStatus': this.filters.orderStatus,
          'mobile': this.filters.mobile,
          'businessName': this.filters.businessName,
          'shopName': this.filters.shopName,
          'goodsName': this.filters.goodsName,
          'orderStartTime': this.filters.orderStartTime,
          'orderEndTime': this.filters.orderEndTime,
          'orderPayStartTime': this.filters.orderPayStartTime,
          'orderPayEndTime': this.filters.orderPayEndTime,
        })
          .then(res => {
            if (res.code == 1) {
              this.total = res.data.total;
              this.orderList = res.data.list;
              this.listLoading = false;
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
        this.filters = {
          orderNo: '',
          orderStatus: '',
          mobile: '',
          businessName: '',
          shopName: '',
          goodsName: '',
          orderStartTime: '',
          orderEndTime: '',
          orderPayStartTime: '',
          orderPayEndTime: '',
          paytime: '',
          ordertime: '',
        };
        this.getOrder();
      },
      //核销界面
      writeOff: function (orderNo, shopId) {
        this.writeOffFormVisible = true;
        this.writeOffForm.orderNumber = orderNo;
        this.writeOffForm.shopId = shopId;
      },
      //核销
      writeOffSubmit() {
        this.$refs.writeOffForm.validate((valid) => {
          if (valid) {
            this.$_api.post({
              'ext': 'order/qr-code',
              'shop_id': this.writeOffForm.shopId,
              'qr_code': this.writeOffForm.qrCode
            }).then(res => {
              if (res.code == 1) {
                this.$alert('核销成功！', '提示', {
                  confirmButtonText: '确定',
                  callback: action => {
                    this.getOrder();
                  }
                });
              } else {
                this.$alert('核销失败！', '提示', {
                  confirmButtonText: '确定',
                  callback: action => {
                    this.getOrder();
                  }
                });
              }
            }).catch(() => {

            })
          }
        });
      },
      downOrder() {

      },
      selsChange() {

      },
      selectOrderTime(value) {
        this.filters.orderStartTime = value.split(' - ')[0];
        this.filters.orderEndTime = value.split(' - ')[1];
      },
      selectPayTime(value) {
        this.filters.orderPayStartTime = value.split(' - ')[0];
        this.filters.orderPayEndTime = value.split(' - ')[1];
      },
      orderCurrentChange(value) {
        console.log(value);
        this.pageNum = value;
        this.getOrder();
      }
    }
  }

</script>

<style scoped lang="scss" src="../order-list/order-list.scss"></style>