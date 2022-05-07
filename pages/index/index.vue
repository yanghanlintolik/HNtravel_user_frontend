<template>
	<view style="background-color: #fefefe">
		<cu-custom style="">
			<block style="width: 100%;display: flex;flex-direction: row;align-items: center;" slot="content"><image style="width: 40upx;height: 40upx;" src="http://m.qpic.cn/psc?/V12eKFrM2hLmPp/45NBuzDIW489QBoVep5mceHXTFWcyYv6UyuR2LevA2NhsrL9Ku0ZsyCNOBb5dyQznjobb8NomC6FnpU4TyOsOJAQQ59*BSRwWL3*nUe95uQ!/b&bo=mgHaAZoB2gEDJwI!&rf=viewer_4"></image><text style="height: 40upx;line-height: 40upx;text-align: center;font-size: 30upx;">陆岛城市群智慧旅游</text></block>
		</cu-custom>
		<!-- 顶部搜索导航栏 -->
		<view class="cu-bar search" :class="'bg-'+ themeColor.name">
			<view class="action">
				<picker @change="examinationType" :range="examinationTypeArray">
					<label style="font-size: 28upx;">{{ examinationTypeArrayType }}</label>
					<text style="font-size: 30upx;" class=" cuIcon-triangledownfill"></text>
				</picker>
			</view>
			<view class="padding-sm search-form radius" @click="handleMenu('/pages/index/search-function')">
				<input @focus="InputFocus" @blur="InputBlur" :adjust-position="false" placeholder="搜索主要功能"
					confirm-type="search"></input>
				<text class="cuIcon-search"></text>
			</view>
		</view>
		<!-- 轮播图 -->
		<swiper class="card-swiper" :class="dotStyle?'square-dot':'round-dot'" :indicator-dots="true" :circular="true"
			:autoplay="true" interval="3000" duration="500" @change="cardSwiper" indicator-color="#8799a3"
			indicator-active-color="#0081ff">
			<swiper-item v-for="(item,index) in swiperList" :key="index" :class="cardCur==index?'cur':''">
				<view class="swiper-item"  style="padding: 10upx 0upx 0upx 10upx;">
					<image :src="item.url" mode="aspectFill" v-if="item.type=='image'"></image>
				</view>
			</swiper-item>
		</swiper>

		<!-- 宫格列表 -->
		<view class="cu-list grid col-4 no-border" style="padding: 0;margin: 20upx;">
			<view class="cu-item" v-for="(item,index) in cuIconList" :key="index" @click="handleMenu(item.url)">
				<view :class="['cuIcon-' + item.cuIcon,'text-' + item.color]">
				</view>
				<text style="color: #292116;">{{item.name}}</text>
			</view>
		</view>
		<view
			style=" margin-top: 10upx;width: 100%;display: flex;flex-direction: column;align-items: center;justify-content: center;" @click="toMyMessage()">
			<uni-notice-bar style="border-radius: 30upx; border：none;width: 95%;" show-icon="true" scrollable="true"
				single="true" :text="notice" :speed="speed">
			</uni-notice-bar>
		</view>
		<!-- 游景区，听讲解 -->
		<view class="cu-bar bg-white flex">
			<view class="action" :class="'text-'+ themeColor.name">
				<text class="cuIcon-titles" ></text>
				<text>游景区~~~听讲解</text>
			</view>
		</view>
		<scroll-view scroll-x class="padding-lr-sm bg-white nav padding-bottom-sm" style="margin-top: 10upx;"
			scroll-with-animation>
			<view class="cu-item" v-for="(item,index) in list" :key="index" @click="jingquChoose(index)"
				:data-id="index">
				<image class="radius-lg" style="width:260upx; height: 160upx;" :src="item.image"></image>
				<view style="color:#292116" class="text-sm text-center">{{item.name}}</view>
			</view>
		</scroll-view>

		<!-- 中部导航栏 -->
		<scroll-view scroll-x class="bg-white nav solid-top margin-lr-sm" style="margin-top: 10upx;">
			<view class="flex text-center">
				<view class="cu-item flex-sub " :class="index == activeTab?'cur text-'+themeColor.name :'text-grey'"
					v-for="(tab,index) in tabList" :key="index" @click="tabSelect(index)" :data-id="index">
					{{tab.name}}
				</view>
			</view>
		</scroll-view>
		<!-- 列表卡片 -->
		<view class="cu-card article" v-if="activeTab==0">
			<view class="cu-item shadow-orange" v-for="(item,index) in meishi" @click="chooseMeishi(index)">
				<view class="title " style="display: flex;flex-direction: row;align-items: center;justify-content: space-between;">
					<view class="text-cut padding-lr-xs">{{item[1]}}</view>
					<view class="text-red margin-right" :class="flagLikeMeishi[index]? 'cuIcon-likefill':'cuIcon-like'">
					</view>
				</view>
				<view class="content">
					<image :src="item[7]" mode="aspectFill"></image>
					<view class="desc">
						<view>类型：<view class="cu-tag bg-red light sm round">{{item[4]}}</view>
						</view>
						<view>评分：<view class="cu-tag bg-green light sm round">{{item[2]}}分</view>
						</view>
						<!-- <text>人均：<text class="text-content">{{item[5]+'元'}}</text></text> -->
						<view>地址：<text class="text-content">{{item[3]}}</text></view>
					</view>
				</view>
			</view>
		</view>
		<view class="cu-card article" v-if="activeTab==1">
			<view class="cu-item shadow-orange" v-for="(item,index) in jingdian" @click="chooseJingdian(index)">
				<view class="title"
					style="display: flex;flex-direction: row;align-items: center;justify-content: space-between;">
					<view class="text-cut">{{item[1]}}</view>
					<view class="text-red margin-right"
						:class="flagLikeJingdian[index]? 'cuIcon-likefill':'cuIcon-like'"></view>
					<!-- <view style="display: flex;flex-direction: row;align-items: center;justify-content: center;">
						<image src="../../static/xingxing.png" style="margin-right: 5upx;width: 20upx;height: 20upx;"></image>
						<view style="font-size: 25upx;color: #09BB07;">{{ parseFloat(item[2])}}分</view>
					</view> -->
				</view>
				<view class="content">
					<image :src="item[6]" mode="aspectFill"></image>
					<view class="desc">
						<view>类型：<view class="cu-tag bg-red light sm round">{{item[4]}}</view>
						</view>
						<view>评分：<view class="cu-tag bg-green light sm round">{{item[2]}}分</view>
						</view>
						<view>地址：<text class="text-content">{{item[3]}}</text></view>
					</view>
				</view>
			</view>
		</view>
		<view class="cu-card article" v-if="activeTab==2">
			<view class="cu-item shadow-orange" v-for="(item,index) in jiudian" @click="chooseJiudian(index)">
				<view class="title"
					style="display: flex;flex-direction: row;align-items: center;justify-content: space-between;">
					<view class="text-cut">{{item[1]}}</view>
					<view class="text-red margin-right"
						:class="flagLikeJiudian[index]? 'cuIcon-likefill':'cuIcon-like'"></view>
					<!-- <view style="display: flex;flex-direction: row;align-items: center;justify-content: center;">
						<image src="../../static/xingxing.png" style="margin-right: 5upx;width: 20upx;height: 20upx;"></image>
						<view style="font-size: 25upx;color:#09BB07 ;">{{item[2]}}分</view>
					</view> -->
				</view>
				<view class="content">
					<image :src="item[6]" mode="aspectFill"></image>
					<view class="desc">
						<view>星级：<view class="cu-tag bg-red light sm round">{{item[4]}}</view>
						</view>
						<view>评分：<view class="cu-tag bg-green light sm round">{{item[2]}}分</view>
						</view>
						<!-- <text>热度：{{item[5]+'条'}}</text> -->
						<view>地址：<text class="text-content">{{item[3]}}</text></view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import gloalMixin from '@/mixins/global-minxin.js'
	// import uniNoticeBar from '@/components/uni-notice-bar/uni-notice-bar.vue'

	export default {
		mixins: [gloalMixin],
		// components: {
		// 	uniNoticeBar
		// },
		data() {
			return {
				flagLikeMeishi: [],
				flagLikeJingdian: [],
				flagLikeJiudian: [],
				speed: 10,
				dotStyle: false,
				cardCur: 0,
				id: "",
				notice: "欢迎使用陆岛城市群智慧旅游小程序",
				examinationTypeArray: ['北京', '海口', '三亚', '上海'],
				examinationTypeIndex: 0,
				examinationTypeArrayType: '海口',
				meishi: [],
				jingdian: [],
				jiudian: [],
				list: [],
				index: '',
				swiperList: [{
						id: 0,
						type: 'image',
						url: 'https://cyye.lbj.wiki/image/1.jpg'
					}, {
						id: 1,
						type: 'image',
						url: 'https://cyye.lbj.wiki/image/2.jpg',
					}, {
						id: 2,
						type: 'image',
						url: 'https://cyye.lbj.wiki/image/3.jpg'
					},
					{
						id: 3,
						type: 'image',
						url: 'https://cyye.lbj.wiki/image/4.jpg'
					}
				],
				cuIconList: [{
						cuIcon: 'deliver_fill',
						color: 'mauve',
						name: '出行规划',
						url: '/pages/traffic/index'
					}, {
						cuIcon: 'appreciatefill',
						color: 'orange',
						name: '专属推荐',
						url: '/pages/index/vipRecommender'
					}, {
						cuIcon: 'rechargefill',
						color: 'yellow',
						name: '消费预警',
						url: '/pages/index/relitu-consume'
					}, {
						cuIcon: 'rankfill',
						color: 'olive',
						name: '景区客流',
						url: '/pages/passengerFlow/forecast'
					}, {
						cuIcon: 'cardboardfill',
						color: 'cyan',
						name: '虚拟导览',
						url: '/pages/index/virtual'
					}, {
						cuIcon: 'discoverfill',
						color: 'blue',
						name: '态势感知',
						url: '/pages/index/culture'
					}, {
						cuIcon: 'shopfill',
						color: 'purple',
						name: '海南美食',
						url: '/pages/index/food'
					}
					// {
					// 	cuIcon: 'friendfamous',
					// 	color: 'red',
					// 	name: '海南人物',
					// 	url: '/pages/index/kepu'
					// }
				],
				activeTab: 0,
				tabList: [{
						index: 0,
						name: '美食'
					},
					{
						index: 1,
						name: '景点'
					},
					{
						index: 2,
						name: '酒店'
					}
				],
			}
		},
		onShow(){
			if(getApp().globalData.situationList.length>0){
				this.notice=getApp().globalData.notice+=getApp().globalData.situationList[Math.floor(Math.random() * getApp().globalData.situationList.length)].time+" "+getApp().globalData.situationList[Math.floor(Math.random() * getApp().globalData.situationList.length)].city+"："+getApp().globalData.situationList[Math.floor(Math.random() * getApp().globalData.situationList.length)].road_id+"，"+getApp().globalData.situationList[Math.floor(Math.random() * getApp().globalData.situationList.length)].cweather+"。  "
			}
		},
		onLoad() {
			
			// uni.connectSocket({
			// 	url: 'wss://cyye.lbj.wiki/webSocket'
			// });

			uni.onSocketMessage(res => {
				console.log('收到服务器内容：' + res.data);
				this.notice = res.data
			});
			getApp().globalData.lable = null
			try {
				const value = uni.getStorageSync('openId');
				const value1 = uni.getStorageSync('token');
				if (value1) {
					console.log(value1)
					getApp().globalData.token = value1
				}
				if (value) {
					getApp().globalData.openId = value
				}
			} catch (e) {
				// error
			}
			uni.request({
				url: getApp().globalData.globalUrl + "/zqd/scenic/getStrategyScenic",
				success: e => {
					this.list = e.data
					getApp().globalData.jingdian = e.data
					console.log(this.list)
				}
			})
			this.loadData();
			if (getApp().globalData.openId != null) {
				 this.getMessage()
			} else {}
			uni.getLocation({
				type: 'gcj02',
				success: function(res) {
					getApp().globalData.longitude=res.longitude
					getApp().globalData.latitude=res.latitude
					}
			})
			
			var time = setInterval(() => {
				if (getApp().globalData.id != null) {
					uni.getLocation({
						type: 'gcj02',
						success: function(res) {
							getApp().globalData.longitude=res.longitude
							getApp().globalData.latitude=res.latitude
							console.log(res.longitude + "," + res.latitude)
							uni.request({
								url: getApp().globalData.globalUrl +
									"/xiaogonglue/get_user_position/" + getApp().globalData
									.id +
									"/" +
									res.longitude + "," + res.latitude,
								success(e) {

									console.log(e.data)
								}
							})
						}
					})
				}
			}, 11000)
		},
		onShareAppMessage() {},
		methods: {
			DotStyle(e) {
				this.dotStyle = e.detail.value
			},
			// cardSwiper
			cardSwiper(e) {
				this.cardCur = e.detail.current
			},
			getMessage() {
				uni.request({
					url: getApp().globalData.globalUrl + "/zqd/payment/get/" + getApp().globalData
					.openId, //仅为示例，并非真实接口地址。
					header: {
						'content-type': 'application/json',
						'token': getApp().globalData.token.toString()
					},
					success: (res) => {
						console.log(res.data)
						if (res.data === "0") {
							getApp().globalData.isLog = false
						} else {
							getApp().globalData.isLog = true
							getApp().globalData.birthday = res.data.birthday,
								getApp().globalData.address = res.data.address,
								getApp().globalData.profession = res.data.profession,
								getApp().globalData.id = res.data.id,
								getApp().globalData.tel = res.data.tel,
								getApp().globalData.lable = res.data.lable,
								getApp().globalData.name = res.data.name,
								getApp().globalData.image = res.data.image
							this.id = getApp().globalData.id
							uni.request({
								url: getApp().globalData.globalUrl + "/zqd/payment/interestCheck/" +
									res.data.id,
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
							uni.request({
								url:getApp().globalData.globalUrl+"/wtaishi/weather?userId="+getApp().globalData.id,
								success:e=>{
									getApp().globalData.situationList=e.data
									if(getApp().globalData.situationList.length>0){
										getApp().globalData.notice=""	
										getApp().globalData.notice+=e.data[Math.floor(Math.random() * e.data.length)].time+" "+e.data[Math.floor(Math.random() * e.data.length)].city+"："+e.data[Math.floor(Math.random() * e.data.length)].road_id+"，"+e.data[Math.floor(Math.random() * e.data.length)].cweather+"。  "
										this.notice=getApp().globalData.notice
									}else{
										getApp().globalData.notice="欢迎使用陆岛城市群智慧旅游小程序"
										this.notice="欢迎使用陆岛城市群智慧旅游小程序"
									}
								}
							})
						}
					}
				})
			},
			toRecommender() {
				console.log(getApp().globalData.lable)
				if (getApp().globalData.lable != null) {
					uni.navigateTo({
						url: "../index/vipRecommender"
					})
				} else {
					uni.showModal({
						content: "请登录或填写个人信息",
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
			// 常用功能点击
			handleMenu(menuUrl) {
				if (menuUrl == '/pages/index/vipRecommender') {
					console.log("点击啦");
					this.toRecommender()
				} else {
					uni.navigateTo({
						url: menuUrl
					})
				}

			},
			//选择地点
			examinationType(e) {
				this.examinationTypeIndex = e.target.value;
				this.examinationTypeArrayType = this.examinationTypeArray[this.examinationTypeIndex]
			},
			// 顶部tab切换
			tabSelect(index) {
				this.activeTab = index;
			},
			// 听景区介绍
			jingquChoose(index) {
				console.log(index);
				getApp().globalData.index = index;
				if (getApp().globalData.lable != null) {
					if (index === 0 || 1||2||3||4) {
						uni.navigateTo({
							url: "../index/index-jingqu?index=" + index,
						})
					} else {
						uni.showToast({
							icon: "none",
							title: "暂无该景点信息"
						})
					}

				} else {
					uni.showModal({
						content: "请登录或修改个人信息",

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
			loadData() {
				uni.request({
					url: getApp().globalData.globalUrl + "/based_user_recommend?inputUserID=&classification=2",
					success: (e) => {
						this.meishi = e.data
						this.flagLikeMeishi.push(false)
						console.log(e.data[0][0])

					}
				})
				uni.request({
					url: getApp().globalData.globalUrl + "/based_user_recommend?inputUserID=&classification=1",
					success: (e) => {
						this.jingdian = e.data
						console.log(e.data[0][0])
						this.flagLikeJingdian.push(false)
					}
				})
				uni.request({
					url: getApp().globalData.globalUrl + "/based_user_recommend?inputUserID=&classification=3",
					success: (e) => {
						this.jiudian = e.data
						console.log(e.data[0][0])
						this.flagLikeJiudian.push(false)
					}
				})
			},
			//点击推荐商家
			chooseMeishi(index) {
				if (getApp().globalData.lable != null) {
					this.flagLikeMeishi[index] = !this.flagLikeMeishi[index]
					console.log(this.meishi[index])
					if (this.flagLikeMeishi[index]) {
						uni.request({
							url: getApp().globalData.globalUrl + "/user_portrait/update_click_interest/1/" +
								getApp().globalData.id + "/" + this.meishi[index][0],
							success: e => {
								uni.showToast({
									title: "谢谢你喜欢我",
									icon: "none"
								})
							}
						})
					}
				} else {
					uni.showModal({
						content: "请登录或填写个人信息",
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
			toMyMessage(){
				uni.navigateTo({
					url:"../me/me-message"
				})
			},
			chooseJingdian(index) {
				if (getApp().globalData.lable != null) {
					this.flagLikeJingdian[index] = !this.flagLikeJingdian[index]
					if (this.flagLikeJingdian[index]) {
						uni.request({
							url: getApp().globalData.globalUrl + "/user_portrait/update_click_interest/2/" +
								getApp().globalData.id + "/" + this.jingdian[index][0],
							success: e => {
								uni.showToast({
									title: "谢谢你喜欢我",
									icon: "none"
								})
							}
						})
					}

				} else {
					uni.showModal({
						content: "请登录或填写个人信息",
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
			chooseJiudian(index) {
				if (getApp().globalData.lable != null) {

					this.flagLikeJiudian[index] = !this.flagLikeJiudian[index]
					if (this.flagLikeJiudian[index]) {
						uni.request({
							url: getApp().globalData.globalUrl + "/user_portrait/update_click_interest/3/" + getApp()
								.globalData.id + "/" + this.jiudian[index][0],
							success: e => {
								uni.showToast({
									title: "谢谢你喜欢我",
									icon: "none"
								})
							}
						})
					}
					
				} else {
					uni.showModal({
						content: "请登录或填写个人信息",
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

		}
	}
</script>

<style>
</style>
