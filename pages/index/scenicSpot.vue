<template>
	<view>
		<cu-custom>
			<block style="width: 100%;display: flex;flex-direction: row;align-items: center;" slot="content">
				<image style="width: 40upx;height: 40upx;"
					src="http://m.qpic.cn/psc?/V12eKFrM2hLmPp/45NBuzDIW489QBoVep5mceHXTFWcyYv6UyuR2LevA2NhsrL9Ku0ZsyCNOBb5dyQznjobb8NomC6FnpU4TyOsOJAQQ59*BSRwWL3*nUe95uQ!/b&bo=mgHaAZoB2gEDJwI!&rf=viewer_4">
				</image><text
					style="height: 40upx;line-height: 40upx;text-align: center;font-size: 30upx;">陆岛城市群智慧旅游</text>
			</block>
		</cu-custom>
		<view>
			<image class="blur_bj" :src="backUrl" height="100vh"></image>
		</view>
		<view class="cu-bar search fixed" :class="'bg-'+themeColor.name" :style="[{top:CustomBar + 'px'}]"
			@click="handleMenu('/pages/index/search-scenicSpot')">
			<view class="search-form round">
				<text class="cuIcon-search"></text>
				<input type="text" placeholder="输入搜索的关键词" confirm-type="search"></input>
			</view>
			<view class="action">
				<button class="cu-btn shadow-blur round light" :class="'bg-'+themeColor.name">搜索</button>
			</view>
		</view>
		<swiper class="card-swiper" style="z-index: 100;height:1080upx;margin-top: 100upx;" :circular="true"
			:current="cardCur" interval="5000" duration="500" @change="cardSwiper" :style="[{top:CustomBar + 'px'}]">
			<swiper-item class="swiper_item" v-for="(item,index) in list" :key="index">
				<view class="swiper-item" style="transform: scale(1);">
					<view class="cu-card case">
						<view class="margin-top">
							<view class="image" style="height: 800upx;width: 95%; border:8px solid #FFFFFF;">
								<image class="radius-lg" :src="item.image"></image>
								<button class="cu-tag text-sm rounde light" :class="'bg-'+themeColor.name"
									@click="redirectTo(index)">
									<view class="cuIcon-activity"></view> 路线导游
								</button>

								<view class="cu-bar bg-shadeBottom">
									<text class="text-cut scenic-text">{{item.name}}</text>
								</view>
							</view>
							<view
								style="padding: 10upx;display: flex;flex-direction: column;width: 95%;font-size: 26upx;border-bottom: 2upx solid #6CB2BA;background-color: #FFFFFF;">
								<text>星级：{{item.score}}</text>
								<text>开放时间：{{item.time}}</text>
								<text>票价：{{item.money}}</text>
								<text>地址：{{item.address}}</text>
							</view>
							<view style="width: 95%;background-color: #FFFFFF;" class="flex justify-between">
								<button @tap="showModal(index)" class="text-sm cu-btn flex"
									style="padding: 0upx 10upx;background-color: #FFFFFF;">简介：<text
										class="lg cuIcon-roundright" style="color: #AAAAAA;">展开</text></button>
							</view>
						</view>
					</view>
				</view>
			</swiper-item>
		</swiper>
		<view style="width: 100%;display: flex;flex-direction: column;align-items: center;">
			<button class="cu-btn round flex" :class="'bg-'+themeColor.name" open-type="share"
				style="margin-top: 10upx;height: 80upx;line-height: 80upx;text-align: center;width: 80%;">
				<text class="cuIcon-share" style="font-size: 54upx;"></text>
				<text class="text-df margin-left-sm">点击分享美景</text>
			</button>
		</view>

		<view class="cu-modal " :class="detailText != null?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">{{name}}</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl padding scenic-text"
					style="white-space:pre-wrap; text-indent: 30px; text-align: justify;">
					{{detailText}}
				</view>
			</view>
		</view>
		<!-- <view class="cu-tabbar-height"></view> -->
	</view>
</template>

<script>
	import gloalMixin from '@/mixins/global-minxin.js'
	export default {
		mixins: [gloalMixin],
		data() {

			return {
				backUrl: "",
				CustomBar: this.CustomBar,
				list: [],
				load: true,
				cardCur: 0,
				detailText: null,
				name: '',
				dotStyle: false,
			};
		},
		onLoad(options) {
			this.cardCur = options.cardCur
			if (options.flag != 1) {
				this.list = getApp().globalData.jingdian
				this.backUrl = this.list[0].image
			} else {
				uni.request({
					url: getApp().globalData.globalUrl + "/zqd/scenic/getStrategyScenic",
					success: e => {
						this.list = e.data
						getApp().globalData.jingdian = e.data
						console.log("else:" + this.list)
						this.list = getApp().globalData.jingdian
						this.backUrl = this.list[0].image
					}
				})
			}
		},
		onShareAppMessage(res) {
			return {
				title: '和你分享我发现的美景',
				path: '/pages/index/scenicSpot?cardCur=' + this.cardCur + "&flag=1",
				imageUrl: this.backUrl
			}
		},
		onReady() {
			uni.hideLoading()
		},
		methods: {
			// 常用功能点击
			handleMenu(menuUrl) {
				uni.navigateTo({
					url: menuUrl
				})
			},
			redirectTo(index) {
				console.log(index)
				uni.navigateTo({
					url: "/pages/guide/scenicLine?name=" + this.list[index].name
				})
			},
			DotStyle(e) {
				this.dotStyle = e.detail.value
			},
			// cardSwiper
			cardSwiper(e) {

				this.cardCur = e.detail.current
				this.backUrl = this.list[this.cardCur].image

			},
			//点击显示详情
			showModal(index) {
				this.name = this.list[index].name
				this.detailText = this.list[index].scen_detail
				console.log(this.detailText);
			},

			hideModal(e) {
				this.detailText = null
			},

		},
	}
</script>

<style lang="scss">
	.scenic-text {
		font-size: 32upx;
		font-weight: 300;
	}

	.scenic-text::first-letter {
		font-size: 40upx;
		margin-right: 5upx;
	}

	.scenic-name::first-letter {
		font-weight: bold;
		font-size: 40upx;
		margin-right: 5upx;
	}

	.blur_bj {
		position: absolute;
		height: 100%;
		width: 100%;
		top: 0;
		z-index: -1;
		-webkit-filter: blur(5rpx);
		filter: blur(15rpx) brightness(70%); // 模糊半径和变暗
		transform: scale(1.2); // 控制边缘是否模糊，小于1的话边缘会模糊
	}
	.swiper_item{
		margin-left: 18upx;
	}
</style>
