const _import = require('./_import_' + process.env.NODE_ENV);

/* layout */
import CoreLayout from '@/layouts/Core.layout';

const Login = _import('login/login')

const Welcome = _import('welcome/welcome')

// 交易管理
// const OrderSetlist = _import('order-setlist/order-setlist')
// const OrderSetAdd = _import('order-setadd/order-setadd')
const OrderList = _import('order-list/order-list')
const CheckOrder = _import('check-order/check-order')

//账号管理
const UserManager = _import('user-manager/user-manager')
const UserAdd = _import('user-add/user-add')
// const AddManager = _import('user-manager/user-manager')

let config = [
    {
        path: '/',
        component: CoreLayout,
        name: '欢迎',
        isAuth: true,
        hidden: true,
        iconCls: 'el-icon-star-on',
        children: [
            { path: '/',name: '欢迎使用',component: Welcome, isAuth: true, hidden: true, iconCls: 'el-icon-message' },
        ]
    },
    {
        path: '/',
        component: CoreLayout,
        name: '交易管理',
        isAuth: true,
        iconCls: 'iconfont icon-jiaoyi',
        meta:{
            iconCls: 'iconfont icon-jiaoyi',
        },
        children: [
            // { path: '/order/setlist', name: '订单设置列表', component: OrderSetlist, isAuth: true, iconCls: 'el-icon-message' },
            // { path: '/order/add/', name: '添加订单配置', component: OrderSetAdd, isAuth: true, hidden: true, iconCls: 'el-icon-message' },
            // { path: '/order/edit/:id', name: '订单配置修改', component: OrderSetAdd, isAuth: true, hidden: true, iconCls: 'el-icon-message' },
            { path: '/order-list', name: '订单管理', component: OrderList, isAuth: true },
            { path: '/check-order/:orderId', name: '查看订单', component: CheckOrder, isAuth: true ,hidden:true}
            // /:orderId/:orderStatus
        ]
    },
    {
        path: '/',
        component: CoreLayout,
        name: '系统管理',
        iconCls: 'iconfont icon-xitong',//图标样式class
        meta:{
            iconCls: 'iconfont icon-xitong',
        },
        isAuth: true,
        children: [
            { path: '/user-manager', name: '账号管理', component: UserManager, isAuth: true },
            { path: '/user-add', name: '添加账号', component: UserAdd, isAuth: true,hidden:true },
        ]
    },
    {
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    // {
    //     path: '*',
    //     hidden: true,
    //     redirect: { path: '/404' }
    // }
]




export default config