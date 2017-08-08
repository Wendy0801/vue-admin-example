<template>
	<div>
		<el-row class="container">
			<el-col class="app-aside">
				<aside :class="collapsed?'menu-collapsed':'menu-expanded'">
					<div class="app-logo" :class="collapsed?'logo-collapse-width':'logo-width'">
						<div v-if="!collapsed">
							<p>星美生活</p>
							<p></p>
						</div>
						<div v-if="collapsed">
							<img src="../assets/avatar.gif" alt="">
						</div>
					</div>
					<!--导航菜单-->
					<el-menu :default-active="$route.path" theme="dark" class="smi-sidebar" @open="handleopen" @close="handleclose" @select="handleselect" unique-opened router v-show="!collapsed">
						<template v-for="(first,index) in allRoutes">
							<el-submenu :index="`${index+0}`" v-if="first.children&&!first.hidden&&first.isAuth">
								<template slot="title">
									<i :class="first.iconCls"></i>{{first.name}}</template>
								<template v-for="(second,indexSecond) in first.children">
									<el-submenu :index="`${index+0}-${indexSecond+0}`" v-if="second.children&&second.isAuth">
										<template slot="title" v-if="second.isAuth">{{second.name}}</template>
										<el-menu-item v-for="(third,indexThird) in second.children" :index="third.path" v-if="!third.hidden&&third.isAuth">{{third.name}}</el-menu-item>
									</el-submenu>
									<el-menu-item v-if="!second.children&&!second.hidden&&second.isAuth" :index="second.path">{{second.name}}</el-menu-item>
								</template>
							</el-submenu>
							<el-menu-item v-if="!first.children&&!first.hidden&&first.isAuth" :index="first.path">{{first.name}}</el-menu-item>
						</template>
					</el-menu>
					<!--导航菜单-折叠后-->
					<ul class="el-menu el-menu-vertical-demo collapsed" theme="dark" v-show="collapsed" ref="menuCollapsed">
						<li v-for="(item,index) in $router.options.routes" v-if="!item.hidden" class="el-submenu item">
							<template v-if="!item.leaf">
								<div class="el-submenu__title" style="padding-left: 20px;" @mouseover="showMenu(index,true)" @mouseout="showMenu(index,false)"><i :class="item.iconCls"></i></div>
								<ul class="el-menu submenu" :class="'submenu-hook-'+index" @mouseover="showMenu(index,true)" @mouseout="showMenu(index,false)"> 
									<li v-for="child in item.children" v-if="!child.hidden" :key="child.path" class="el-menu-item" style="padding-left: 40px;" :class="$route.path==child.path?'is-active':''" @click="$router.push(child.path)">{{child.name}}</li>
								</ul>
							</template>
							<template v-else>
								<li class="el-submenu">
									<div class="el-submenu__title el-menu-item" style="padding-left: 20px;height: 56px;line-height: 56px;padding: 0 20px;" :class="$route.path==item.children[0].path?'is-active':''" @click="$router.push(item.children[0].path)"><i :class="item.iconCls"></i></div>
								</li>
							</template>
						</li>
					</ul>
				</aside>
			</el-col>
			<el-col class="app-content">
				<el-col :span="24" class="header">
					<el-col :span="1">
						<div class="tools" @click.prevent="collapse">
							<i class="fa fa-align-justify"></i>
						</div>
					</el-col>
					<el-col :span="10">
						<section class="content-container">
							<div class="grid-content bg-purple-light">
								<el-col :span="24" class="breadcrumb-container">
									<el-breadcrumb separator="/" class="breadcrumb-inner">
										<el-breadcrumb-item v-for="item in $route.matched" :key="item.path">
											{{ item.name }}
										</el-breadcrumb-item>
									</el-breadcrumb>
								</el-col>
							</div>
						</section>
					</el-col>
					<el-col :span="2" class="userinfo">
						<el-dropdown trigger="hover">
							<span class="el-dropdown-link userinfo-inner">
								<img :src="this.sysUserAvatar" /> {{sysUserName}}</span>
							<el-dropdown-menu slot="dropdown">
								<el-dropdown-item>我的消息</el-dropdown-item>
								<el-dropdown-item>设置</el-dropdown-item>
								<el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
							</el-dropdown-menu>
						</el-dropdown>
					</el-col>
				</el-col>
				<el-col :span="24" class="content-wrapper">
					<transition name="fade" mode="out-in">
						<router-view></router-view>
					</transition>
				</el-col>
			</el-col>
			
		</el-row>
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
		this.allRoutes = this.$router.options.routes.slice();
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
.app-logo{
	background:$dark;
	text-align: center;
	font-size:18px;
}
.app-aside{
	position: fixed;
	top:0;
	bottom:0;
	left:0;
	width: 230px;
}
.header{
	position: fixed;
	top:0;
	left:230px;
	z-index: 2;
}
.app-content{
	padding:100px 20px 20px 250px;
}
.content-wrapper{
	width:100%;
}
.container {
	position: absolute;
	left: 0;
	top: 0px;
	bottom: 0px;
	width: 100%;
	.header {
		height: 60px;
		line-height: 60px;
		background: #fff;
		color: #666;
		.userinfo {
			text-align: right;
			padding-right: 35px;
			float: right;
			.userinfo-inner {
				cursor: pointer;
				color: #fff;
				img {
					width: 40px;
					height: 40px;
					border-radius: 20px;
					margin: 10px 0px 10px 10px;
					float: right;
				}
			}
		}
		.logo {
			//width:230px;
			height: 60px;
			font-size: 22px;
			padding-left: 20px;
			padding-right: 20px;
			border-color: rgba(238, 241, 146, 0.3);
			border-right-width: 1px;
			border-right-style: solid;
			img {
				width: 40px;
				float: left;
				margin: 10px 10px 10px 18px;
			}
			.txt {
				color: #fff;
			}
		}
		.logo-width {
			width: 230px;
		}
		.logo-collapse-width {
			width: 60px
		}
		.tools {
			padding: 0px 23px;
			width: 14px;
			height: 60px;
			line-height: 60px;
			cursor: pointer;
		}
	}
	.main {
		display: flex; // background: #324057;
		position: absolute;
		top: 60px;
		bottom: 0px;
		overflow: hidden;
		aside {
			flex: 0 0 230px;
			width: 230px; // position: absolute;
			// top: 0px;
			// bottom: 0px;
			.el-menu {
				height: 100%;
			}
			.collapsed {
				width: 60px;
				.item {
					position: relative;
				}
				.submenu {
					position: absolute;
					top: 0px;
					left: 60px;
					z-index: 99999;
					height: auto;
					display: none;
				}
			}
		}
		.menu-collapsed {
			flex: 0 0 60px;
			width: 60px;
		}
		.menu-expanded {
			flex: 0 0 230px;
			width: 230px;
		}
		.content-container {
			// background: #f1f2f7;
			flex: 1; // position: absolute;
			// right: 0px;
			// top: 0px;
			// bottom: 0px;
			// left: 230px;
			overflow-y: scroll;
			padding: 20px;
			.breadcrumb-container {
				//margin-bottom: 15px;
				.title {
					width: 200px;
					float: left;
					color: #475669;
				}
				.breadcrumb-inner {
					float: right;
				}
			}
			.content-wrapper {
				background-color: #fff;
				box-sizing: border-box;
			}
		}
	}
}
</style>