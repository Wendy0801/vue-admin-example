<template>
	<div>
		<aside>
			<el-menu :default-active="$route.path" @open="handleopen" @close="handleclose" @select="handleselect" unique-opened router>
				<template v-for="(first,index) in $router.options.routes">
					<el-submenu :index="`${index+0}`" v-if="first.children&&!first.hidden&&first.isAuth">
						<template slot="title">
							<i :class="first.iconCls"></i>
							{{first.name}}
						</template>
						<template v-for="(second,indexSecond) in first.children">
							<el-submenu :index="`${index+0}-${indexSecond+0}`" v-if="second.children&&second.isAuth">
								<template slot="title" v-if="second.isAuth">
									{{second.name}}
								</template>
								<el-menu-item v-for="(third,indexThird) in second.children" :index="third.path" v-if="!third.hidden&&third.isAuth">{{third.name}}</el-menu-item>
							</el-submenu>
							<el-menu-item v-if="!second.children&&!second.hidden&&second.isAuth" :index="second.path">
								{{second.name}}
								<i class="icon-arrow"></i>
							</el-menu-item>
						</template>
					</el-submenu>
					<el-menu-item v-if="!first.children&&!first.hidden&&first.isAuth" :index="first.path">{{first.name}}</el-menu-item>
				</template>
			</el-menu>
		</aside>
		<header>
			<div class="header-title fl">
				<div class="logo">
					<img src="../assets/logo-oval.png" alt="">
				</div>
				<h1>星美生活优惠券平台-运营后台</h1>
			</div>
			<el-dropdown trigger="hover" class="header-user fr">
				<span class="el-dropdown-link userinfo-inner">
					<i class="iconfont icon-touxiang"></i>
					123123{{sysUserName}}
				</span>
				<el-dropdown-menu slot="dropdown">
					<el-dropdown-item @click.native="logout">退出登录</el-dropdown-item>
				</el-dropdown-menu>
			</el-dropdown>
	
		</header>
		<main>
			<div class="breadcrumb-wrap">
				<el-breadcrumb separator=">" class="breadcrumb-inner">
					<el-breadcrumb-item v-for="item in $route.matched" :key="item.path">
						<i :class="item.meta.iconCls"></i>
						{{ item.name }}
					</el-breadcrumb-item>
				</el-breadcrumb>
			</div>
			<div class="view-container">
				<router-view></router-view>
			</div>
		</main>
	</div>
</template>

<script>
export default {
	data() {
		return {
			sysName: '星美通信平台',
			collapsed: false,
			sysUserName: '',
			sysUserAvatar: '',
			form: {
				name: '',
				region: '',
				date1: '',
				date2: '',
				delivery: false,
				type: [],
				resource: '',
				desc: ''
			},
			allRoutes: []
		}
	},
	mounted() {
		// this.$router.options.routes = [];
		// $router.options.routes
		this.allRoutes = this.$router.options.routes;
		var user = sessionStorage.getItem('user');
		if (user) {
			user = JSON.parse(user);
			this.sysUserName = user.name || '';
			this.sysUserAvatar = user.avatar || '';
		}
	},
	methods: {
		setAuthRoutes() {
			var authStr = ApiService.getCookie('authList');
			var authList = authStr.split(',');
			// var authList = ['/bannerList','/userHomepage','/change-password','/activityIntroduce','/generalHomepage']
			for (var i = 0, len = this.allRoutes.length; i < len; i++) {
				var first = this.allRoutes[i];
				if (!first.children) {
					continue;
				}
				for (var j = 0, jLen = first.children.length; j < jLen; j++) {
					var secode = first.children[j];
					if (secode.children) { // 还有下层,再遍历
						var third = secode.children;
						for (var k = 0, kLen = third.length; k < kLen; k++) {
							// 第三层的path做判断
							if (setAuth(third[k])) {
								// 自己加 isAuth , second加isAuth ,first加isAuth
								// console.log('三级验证通过')
								third[k].isAuth = true;
								secode.isAuth = true;
								first.isAuth = true;
							}
						}
					} else { // 没有下层,验证己身
						if (setAuth(secode)) {
							secode.isAuth = true;
							first.isAuth = true;
							// console.log('二级验证通过')
						}
					}
				}
			}
			function setAuth(route) {
				var _isInAuthList = authList.filter(item => route.path === item);
				return _isInAuthList.length > 0;
			}
		},
		onSubmit() {
			console.log('submit!');
		},
		handleopen() {
			//console.log('handleopen');
		},
		handleclose() {
			//console.log('handleclose');
		},
		handleselect: function (a, b) {
		},
		//退出登录
		logout: function () {
			var _this = this;
			this.$confirm('确认退出吗?', '提示', {
				//type: 'warning'
			}).then(() => {
				sessionStorage.removeItem('user');
				_this.$router.push('/login');
			}).catch(() => {

			});
		},
		//折叠导航栏
		collapse: function () {
			this.collapsed = !this.collapsed;
		},
		showMenu(i, status) {
			this.$refs.menuCollapsed.getElementsByClassName('submenu-hook-' + i)[0].style.display = status ? 'block' : 'none';
		}
	},
}

</script>

<style scoped lang="scss">
@import '../themes/_variable.scss';
@import '../themes/_basic.scss';

aside{
	position: fixed;
	left: 0;
	top:0;
	width: 230px;
	height: 100%;
	box-sizing: border-box;
	padding-top:100px;
	z-index: 1;
	background: $cbc;
	.icon-arrow{
		position: absolute;
		width: 8px;
		height: 8px;
		border-radius: 50%;
		right: 22px;
		top:50%;
		transform: translate3d(0,-50%,0);
		background: $mfc;
	}
	.el-menu-item{
		// color:$sfc;
		opacity: .6;
	}
	.is-opened .is-active {
		color:$mfc;
		opacity: 1;
		.icon-arrow{
			background: $primary;
		}
	}
	.iconfont{
		font-size: 18px;
		padding-right: 2px;
		color: $mtc;
	}
		
}

header{
	position: fixed;
	left: 0;
	top:0;
	width: 100%;
	height: 100px;
	background: #34495E;
	z-index: 11;
	box-sizing: border-box;
	padding-left:40px;
	padding-right:40px;
	color:#fff;
	.header-title{
		padding:20px;
		padding-left: 0;
	}
	.logo{
		width: 60px;
		height: 60px;
		@extend %mid;
	}
	h1{
		@extend %mid;
	}
	.header-user{
		line-height: 100px;
		color:#fff;
	}
}

main{
	padding-left: 230px;
	padding-top:100px;
	background:fbfbfb;

	.breadcrumb-wrap{
		background: #fff;
		padding:16px 40px;
		border-bottom: 1px solid #ccc;
		.el-breadcrumb{
			// background:pink;
		}
		.el-breadcrumb__item{
			font-size: 15px;
			@extend %mid;
			height: 24px;
			line-height: 24px;
			i{
				line-height: 24px;
				@extend %mid;
			}
			.iconfont{
				transform: translate3d(0,-1px,0);
				padding-right: 2px;
				font-size: 18px;
				color: #95A0AA;
			}
		}
	}

	.view-container{
		padding:20px;
		padding-left: 40px;
	}
}

</style>