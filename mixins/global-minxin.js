export default {
	components: {},
	data() {
		return {
			loading: false,
			loadingMsg: '加载中',
			skeleton: false
		}
	},
	computed: {
		// 主题颜色
		themeColor() {
			return this.$store.state.themeColor;
		},
		
	},
	methods: {
		// 显示loading，页面需引入 <loading v-if="loading" :msg='loadingMsg'/> 组件
		showLoading(msg) {
			if (!!msg) {
				this.loadingMsg = msg;
			} else {
				this.loadingMsg = '加载中';
			}
			this.loading = true;
		},
		// 关闭loading
		hideLoading() {
			this.loading = false;
		},
		// promise封装toast
		showToast(msg, icon, duration) {
			icon = !!icon ? icon : 'none';
			duration = !!duration ? duration : 2000;
			return new Promise((resolve, reject) => {
				uni.showToast({
					title: msg,
					icon: icon,
					duration: duration
				});
				setTimeout(() => {
					resolve();
				}, duration);
			});
		},
		// promise封装toast
		showNoneIconToast(msg, duration) {
			duration = !!duration ? duration : 2000;
			return new Promise((resolve, reject) => {
				uni.showToast({
					title: msg,
					icon: 'none',
					duration: duration
				});
				setTimeout(() => {
					resolve();
				}, duration);
			});
		},
		// promise封装toast
		showToastWithMask(msg, icon, duration) {
			icon = !!icon ? icon : 'none';
			duration = !!duration ? duration : 2000;
			return new Promise((resolve, reject) => {
				uni.showToast({
					title: msg,
					icon: icon,
					mask: true,
					duration: duration
				});
				setTimeout(() => {
					resolve();
				}, duration);
			});
		},
		// 跳转主题设置
		gotoThemeSetting() {
			uni.navigateTo({
				url: '/pages/me/theme-setting'
			})
		},
		// 重新登录
		// reLogin(message) {
		// 	let _this = this;
		// 	let msg = !!message ? message : '登录信息异常，请重新登录'
		// 	uni.showModal({
		// 		content: message,
		// 		confirmText: '重新登录',
		// 		showCancel: false,
		// 		success(r) {
		// 			if (r.confirm) {
		// 				_this.$store.commit('logout');
		// 				uni.reLaunch({
		// 					url: '/pages/launcher/transition'
		// 				})
		// 			}
		// 		}
		// 	});
		// },
		// 进入页面缺少参数提示
		showIllegalParamError() {
			uni.showModal({
				content: '缺少参数！',
				showCancel: false,
				success() {
					uni.navigateBack();
				}
			})
		},
		// 页面跳转
		navigateTo(pageUrl) {
			uni.navigateTo({
				url: pageUrl
			})
		},
		showSkeleton() {
			this.skeleton = true;
		},
		hideSkeleton() {
			this.skeleton = false;
		}
	}
}
