<template>
	<view>
		<!-- 用户信息 -->
		<view>
			<view class="user-info-content">
				<view class="user-info" @click.stop="handleMenu('')">
					<cu-custom style="width: 100%;">
						<block style="width: 100%;display: flex;flex-direction: row;align-items: center;" slot="content"><image style="width: 40upx;height: 40upx;" src="http://m.qpic.cn/psc?/V12eKFrM2hLmPp/45NBuzDIW489QBoVep5mceHXTFWcyYv6UyuR2LevA2NhsrL9Ku0ZsyCNOBb5dyQznjobb8NomC6FnpU4TyOsOJAQQ59*BSRwWL3*nUe95uQ!/b&bo=mgHaAZoB2gEDJwI!&rf=viewer_4"></image><text style="height: 40upx;line-height: 40upx;text-align: center;font-size: 30upx;">陆岛城市群智慧旅游</text></block>
					</cu-custom>
					<view class="padding" :class="'bg-'+ themeColor.name">
						<view class="flex">
							<view class="margin-left" style="width: 20%;">
								<image v-if="isLog===true" class="cu-avatar round lg text-lg" :src="image"></image>
								<image v-if="isLog===false" class="cu-avatar round lg text-lg" src="../../static/touxiang_girl.png"></image>
							</view>
							<view style="width: 80%;" class="margin-top">
								<view class="flex justify-between text-df">
									<view v-if="isLog===true" class="text-xl white">Hi，{{name}}</view>
									<!--  -->
									<button v-if="isLog===false" class="cu-btn round bg-white" @click="appLoginWx">登录</button>
									<!-- 测试开始	 -->
									<view v-if="isLog===true" class="padding-lr-sm bg-white flex align-center" style="border-radius: 20upx 0 0 20upx;"
									 @click="toMessage">个人信息</view>
								</view>
							</view>
							
						</view>
						<view class="flex align-center justify-center margin-top-xl">
							<view class="flex text-black" style="border-radius: 20upx; width: 90%;height: 100upx;background-color: #FFFFFF;">
								<!-- 积分 -->
								<view v-if="isLog===false" class="flex align-center justify-center" style="width: 100%;">
									登录享受更多功能
								</view>
								<view v-if="isLog===true" class="flex" style="width: 100%;">
									<!-- @click="handleMenu('')" -->
									<view class="flex align-center justify-center flex-sub line-right" @click="toInterest">用户画像</view>
									<view class="flex align-center justify-center  flex-sub" @click="toMessage">我的信息</view>
								</view>
							</view>
						</view>
						
					</view>
				</view>
			</view>
			<view style="margin-top: 20upx;">
				<view class="cu-bar bg-white solids-bottom ">
					<view class="action">
						<text class="cuIcon-title text-orange "></text> 其他功能
					</view>
				</view>
				<view class="cu-form-group solid-bottom "@click=" toMeMail">
					<view class="text-xl ">
						<text class="cuIcon-comment text-yellow"></text>
						<text class="text-grey text-lg padding-lr">我的消息</text>
					</view>
					<view class="cuIcon-right"></view>
				</view>
				<view class="cu-form-group solid-bottom" @click="themeSetting">
					<view class="text-xl">
						<text class="cuIcon-settingsfill text-red" ></text>
						<text class="text-grey text-lg padding-lr">设置主题</text>
					</view>
					<view class="cuIcon-right"></view>
				</view>
				<view class="cu-form-group" @click="toCityWeather">
					<view class="text-xl">
						<text class="cuIcon-emoji text-blue"></text>
						<text class="text-grey text-lg padding-lr">天气预报</text>
					</view>
					<view class="cuIcon-right"></view>
				</view>
				<view class="cu-form-group" @click="toFankui()">
					<view class="text-xl">
						<text class="cuIcon-phone text-blue"></text>
						<text class="text-grey text-lg padding-lr">问题反馈</text>
					</view>
					<view class="cuIcon-right"></view>
				</view>
			</view>

		</view>
		<view style="margin-top: 200upx ;display: flex;flex-direction: column;align-items: center;justify-content: center;">
			<text style="font-weight: bold;color: #777777;">-- 海大软件工程研究小组 --</text>
			<text style="color: #bdbdbd;">专注于智慧旅游的小程序</text>
		</view>
	</view>
</template>

<script>

	import gloalMixin from '@/mixins/global-minxin.js'
	
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	export default {
		mixins: [gloalMixin],
		data() {
			return {
				statusBarHeight: getApp().globalData.statusBarHeight,
				name: getApp().globalData.name,
				image: getApp().globalData.image,
				isLog: false,
				pH: 0
			}
		},
		onReady() {
			uni.getSystemInfo({ //调用uni-app接口获取屏幕高度
				success: res => { //成功回调函数
					this.pH = res.screenHeight //windoHeight为窗口高度，主要使用的是这个
				}
			})
		},
		onLoad() {
			if (getApp().globalData.isLog != null) {
				this.isLog = getApp().globalData.isLog
			}
			if (getApp().globalData.openId != null && getApp().globalData.isLog === true) {
				this.name = getApp().globalData.name
				this.image = getApp().globalData.image
			}
			console.log(this.isLog)
		},
		methods: {
			//天气
			toCityWeather() {
				console.log('我点击了');
				uni.navigateTo({
					url: "../guide/city-weather"
				})
			},
			toMeMail(){
				if (getApp().globalData.id != null) {
					uni.navigateTo({
						url:"../me/me-message"
					})
				} else {
					uni.showModal({
						content: "请登录",
						confirmText: "去完成",
						cancelText: "下次再说",
						success: function(res) {
							if (res.confirm) {
								uni.switchTab({
									url: "../me/index"
								})
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					})
				}
				
			},
			themeSetting(){
				console.log('dianjila');
				uni.navigateTo({
					url: "./theme-setting"
				})
			},
			toFankui() {
				if (getApp().globalData.id != null) {
					uni.navigateTo({
						url: "../register/fankuiList"
					})
				} else {
					uni.showModal({
						content: "请登录",
						confirmText: "去完成",
						cancelText: "下次再说",
						success: function(res) {
							if (res.confirm) {
								uni.switchTab({
									url: "../me/index"
								})
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					})
				}

			},
			appLoginWx() {
				uni.getUserProfile({
					desc: '展示',
					success: (info) => { //这里请求接口
						console.log(info)
						uni.getProvider({
							service: 'oauth',
							success: (res) => {
								if (~res.provider.indexOf('weixin')) {
									uni.login({
										provider: 'weixin',
										success: (res2) => {
											uni.showLoading({
												title: "登录中"
											})
											console.log(res2)
											uni.request({
												url: getApp().globalData.globalUrl + "/zqd/getOpenId/" + res2.code,
												success: (res3) => {
													getApp().globalData.openId = JSON.parse(res3.data.openid).openid.toString()
													//this.haha(res3)
													uni.request({
														url: getApp().globalData.globalUrl + "/zqd/payment/Check/" + JSON.parse(res3.data.openid).openid
															.toString(),
														success: (res4) => {
															console.log(res4.data.status + "eeeee")
															if (res4.data.status === "0") {
																let data = JSON.parse(info.rawData)
														
														
																let sex = ""
																if (data.gender === 1) {
																	sex = "男"
																} else {
																	sex = "女"
																}
																uni.request({
																	url: getApp().globalData.globalUrl + "/zqd/payment/create",
																	data: {
																		openId: JSON.parse(res3.data.openid).openid.toString(),
																		sex: sex,
																		name: data.nickName,
																		image: data.avatarUrl
																	},
																	method: 'POST',
																	success: (res5) => {
																		console.log(res5.data.data)
																		getApp().globalData.token = res5.data.data
																		try {
																			uni.setStorageSync('openId', JSON.parse(res3.data.openid).openid.toString());
																			uni.setStorageSync('token', res5.data.data);
																		} catch (e) {
																			// error
																		}
																		getApp().globalData.name = data.nickName,
																			getApp().globalData.image = data.avatarUrl
																		this.name = data.nickName
																		this.image = data.avatarUrl
																		this.isLog = true
																		wx.hideLoading()
																		wx.showToast({
																			title: "登录成功"
																		})
																		this.getMesage()
														
																	}
																})
															} else {
																try {
																	uni.setStorageSync('openId', JSON.parse(res3.data.openid).openid.toString());
																	uni.setStorageSync('token', res4.data.token);
														
																} catch (e) {
																	// error
																}
																console.log(info.rawData)
																let data = JSON.parse(info.rawData)
																getApp().globalData.name = data.nickName,
																	getApp().globalData.image = data.avatarUrl
																getApp().globalData.token = res4.data.token
																this.name = data.nickName
																this.image = data.avatarUrl
																this.isLog = true
																wx.hideLoading()
																wx.showToast({
																	title: "登录成功"
																})
																this.getMesage()
														
															}
														}
													})
												}
											})
										},
										fail: () => {
											uni.showToast({
												title: "微信登录授权失败",
												icon: "none"
											});
										}
									})

								} else {
									uni.showToast({
										title: '请先安装微信或升级版本',
										icon: "none"
									});
								}
							}
						})
					},
					fail: () => {
						uni.showToast({
							title: "微信登录授权失败",
							icon: "none"
						});
					}
				})

			},
			back() {
				uni.navigateBack({
					delta: 1
				})
			},
			haha(res3) {



			},
			getMesage() {
				uni.request({
					url: getApp().globalData.globalUrl + "/zqd/payment/get/" + getApp().globalData.openId, //仅为示例，并非真实接口地址。
					header: {
						'content-type': 'application/json',
						'token': getApp().globalData.token
					},
					success: (res) => {
						getApp().globalData.birthday = res.data.birthday,
							getApp().globalData.address = res.data.address,
							getApp().globalData.profession = res.data.profession,
							getApp().globalData.id = res.data.id,
							getApp().globalData.tel = res.data.tel,
							getApp().globalData.lable = res.data.lable,
							uni.request({
								url: getApp().globalData.globalUrl + "/zqd/payment/interestCheck/" + res.data.id,
								success: (e) => {
									if (e.data.status === "0") {
										uni.showModal({
											title: "问卷调查",
											content: "为了您更好地体验,请您完成问卷调查",
											confirmText: "去完成",
											cancelText: "下次再说",
											success: function(res) {
												if (res.confirm) {
													uni.navigateTo({
														url: "../register/question"
													})
												} else if (res.cancel) {
													console.log('用户点击取消');
												}
											}
										})
									} else {
										getApp().globalData.if_user_image = 1
									}
								}
							})
					}
				})
			},
			toMessage() {
				uni.navigateTo({
					url: "../me/vipMessage"
				})
			},
			toInterest() {

				if (getApp().globalData.if_user_image === 1) {
					uni.navigateTo({
						url: "./label?userId=" + getApp().globalData.id,
					})
				} else {
					uni.showModal({
						title: "问卷调查",
						content: "为了您更好地体验,请您完成问卷调查",
						confirmText: "去完成",
						cancelText: "下次再说",
						success: function(res) {
							if (res.confirm) {
								uni.navigateTo({
									url: "../register/question"
								})
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					})
				}
			}

		},
	}
</script>

<style lang="scss" scoped>
	// 头部
	.user-info-content {
		.user-info {
			padding-bottom: 30upx;
			// background-image: linear-gradient(45deg, #66C9F6,#66C9F6);
		
		
			border-radius: 0 0 30upx 30upx;

			image.cu-avatar {
				border: 3upx solid #FFFFFF;
			}
		}

	}

	.line-right {
		position: relative;

		&:after {
			content: '';
			position: absolute;
			top: 0;
			right: 0;
			bottom: 0;
			width: 1px;
			background-color: #000000;
		}
	}
</style>
