<template>
    <section class="check-order-page" v-if="orderInfo">
        <div class="cl">
            <el-col :span="24" :space="200" class="toolbar" style="padding-bottom: 0px;">
                <el-steps :space="160" :active="stepNow">
                    <el-step title="下单" icon="edit">
                        <i slot="icon" class="iconfont icon-xiadanchenggong"></i>
                    </el-step>
                    <el-step title="支付" icon="edit">
                        <i slot="icon" class="iconfont icon-zhifu"></i>
                    </el-step>
                    <el-step title="使用" icon="edit">
                        <i slot="icon" class="iconfont icon-shiyongrenshu"></i>
                    </el-step>
                    <el-step title="评价" icon="edit">
                        <i slot="icon" class="iconfont icon-pingjia"></i>
                    </el-step>
                    <el-step title="完成" icon="edit">
                        <i slot="icon" class="iconfont icon-zhengque2"></i>
                    </el-step>
                </el-steps>
            </el-col>
        </div>
        <div class="order-info-wrap">
            <div class="info-row cl">
                <div class="info-block fl">
                    <b class="info-title">订单编号:</b>
                    <span class="info-content">{{orderInfo.orderNo}}</span>
                </div>
                <div class="info-block fl">
                    <b class="info-title">订单状态:</b>
                    <span class="info-content">{{statuText}}</span>
                </div>
            </div>
            <div class="info-row cl">
                <div class="info-block fl">
                    <b class="info-title">用户姓名:</b>
                    <span class="info-content">{{orderInfo.orderNo}}</span>
                </div>
                <div class="info-block fl">
                    <b class="info-title">用户手机:</b>
                    <span class="info-content">{{orderInfo.orderNo}}</span>
                </div>
            </div>
            <div class="info-row cl">
                <div class="info-block fl">
                    <b class="info-title">商家ID:</b>
                    <span class="info-content">{{orderInfo.orderNo}}</span>
                </div>
                <div class="info-block fl">
                    <b class="info-title">商家名称:</b>
                    <span class="info-content">{{orderInfo.orderNo}}</span>
                </div>
            </div>
            <div class="info-row cl">
                <div class="info-block fl">
                    <b class="info-title">特惠价:</b>
                    <span class="info-content">{{orderInfo.orderNo}}</span>
                </div>
                <div class="info-block fl">
                    <b class="info-title">购买数量:</b>
                    <span class="info-content">{{orderInfo.orderNo}}</span>
                </div>
            </div>
            <div class="info-row cl">
                <div class="info-block fl">
                    <b class="info-title">商品总价:</b>
                    <span class="info-content">{{orderInfo.totalPrice}}元</span>
                </div>
                <div class="info-block fl">
                    <b class="info-title">流量抵扣:</b>
                    <span class="info-content">{{orderInfo.flowExchangeNum}}</span>
                </div>
            </div>
            <div class="info-row cl">
                <div class="info-block fl">
                    <b class="info-title">订单总额:</b>
                    <span class="info-content">{{orderInfo.orderNo}}</span>
                </div>
                <div class="info-block fl">
                    <b class="info-title">支付方式:</b>
                    <span class="info-content">{{orderInfo.orderNo}}</span>
                </div>
            </div>
            <div class="info-row cl">
                <div class="info-block fl">
                    <b class="info-title">预计到店消费日期:</b>
                    <span class="info-content">{{orderInfo.orderNo}}</span>
                </div>
                <div class="info-block fl">
                    <b class="info-title">星美券:</b>
                    <span class="info-content">{{orderInfo.orderNo}}</span>
                </div>
            </div>
            <div class="info-row cl">
                <div class="info-block fl">
                    <b class="info-title">核销门店ID:</b>
                    <span class="info-content">{{orderInfo.orderNo}}</span>
                </div>
                <div class="info-block fl">
                    <b class="info-title">核销门店名称:</b>
                    <span class="info-content">{{orderInfo.orderNo}}</span>
                </div>
            </div>
            <div class="info-row cl">
                <div class="info-block fl">
                    <b class="info-title">下单时间:</b>
                    <span class="info-content">{{orderInfo.orderTime}}</span>
                </div>
            </div>
            <div class="info-row cl">
                <div class="info-block fl">
                    <b class="info-title">支付时间:</b>
                    <span class="info-content">{{orderInfo.orderPayTime}}</span>
                </div>
            </div>
            <div class="info-row cl">
                <div class="info-block fl">
                    <b class="info-title">使用时间:</b>
                    <span class="info-content">{{orderInfo.useStartTime}}</span>
                </div>
            </div>
            <div class="info-row cl">
                <div class="info-block fl">
                    <b class="info-title">评价时间:</b>
                    <span class="info-content">{{orderInfo.orderNo}}</span>
                </div>
            </div>
        </div>
        <el-row>
            <el-button type="primary" @click="goBack()">返回</el-button>
        </el-row>
    </section>
</template>
<script>
export default {
    data() {
        return {
            'orderId':'',
            'orderInfo':{},
        }
    },
    computed:{
        'statuText':function(){
            var statuTextArr = ['','待付款','待使用','待评价','已完成','已取消','已过期']
            return statuTextArr[this.orderInfo.orderStatus]
        },
        'stepNow':function(){
            this.orderInfo.orderStatus = 4
            if(this.orderInfo.orderStatus<4){
                return this.orderInfo.orderStatus
            }
            else{
                return 5
            }
        }
    },
    mounted() {
        this.orderId = this.$route.params.orderId
        this.getOrderDetail()
    },
    methods: {
        getOrderDetail() {
            this.$_api.get({
                ext: 'order/read',
                order_id: this.orderId
            })
                .then(res => {
                    if(res.code===1){
                        this.orderInfo = res.data
                    }
                })
        },
        goBack(){
            window.history.go(-1);
        }
    }
}

</script>
<style lang="scss" src="../check-order/check-order.scss" scoped>

</style>
<style lang="scss">
@import '../../themes/_variable.scss';
.check-order-page {
    .el-row{
        margin-top:10px;
    }
    .el-step__head {
        width: 40px;
        height: 40px;
    }
    .el-step__icon {
        width: 40px;
        height: 40px;
        text-align: center;
        line-height: 40px;
        background: #f0f0f0;
        color: #949FA9;
        border-radius: 50%;
        margin-top: -6px;
        i {
            display: block;
            font-size: 22px;
        }
    }
    .el-step__line {
        left: 40px;
        right: -8px!important;
    }

    .el-step__head.is-finish {
        color: $primary;
        border-color: $primary;
    }
    .is-finish {
        .el-step__icon {
            background: $primary;
            color: #fff;
        }
    }
    .el-step__title.is-finish {
        color: $primary;
    }
    .el-step__title {
        margin-left: 6px;
    }
}
</style>
