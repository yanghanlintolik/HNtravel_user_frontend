<template>
	<view>
		<cu-custom :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content"  style="display: flex;flex-direction: row;align-items: center; justify-content: center;" >
				<image style="width: 40upx;height: 40upx;"
					src="http://m.qpic.cn/psc?/V12eKFrM2hLmPp/45NBuzDIW489QBoVep5mceHXTFWcyYv6UyuR2LevA2NhsrL9Ku0ZsyCNOBb5dyQznjobb8NomC6FnpU4TyOsOJAQQ59*BSRwWL3*nUe95uQ!/b&bo=mgHaAZoB2gEDJwI!&rf=viewer_4">
				景区客流
				</image>
				</block>
		</cu-custom>
		<view class="cu-bar search" :class="'bg-'+themeColor.name" :style="[{top:CustomBar + 'px'}]"
			@click="handleMenu('/pages/passengerFlow/search-forecast')">
			<view class="search-form round">
				<text class="cuIcon-search"></text>
				<input type="text" placeholder="输入搜索的关键词" confirm-type="search"></input>
			</view>
			<view class="action">
				<button class="cu-btn shadow-blur round light" :class="'bg-'+themeColor.name">搜索</button>
			</view>
		</view>
		<view class="cu-modal" :class="modalName==='Image'?'show':''">
			<view class="cu-dialog" >
				<line-chart ref="lineChart" :name="name"></line-chart>
				<view class="cu-bar bg-white">
					<view class="action margin-0 flex-sub  solid-left" @tap="hideModal">我知道了</view>
				</view>
			</view>
		</view>
		
		<view>
			<scroll-view scroll-y scroll-with-animation style="background-color: #FFFFFF;height:calc(100vh)"
				:scroll-into-view="'main-'+mainCur">
				<view style="display: flex;flex-direction: column;align-items: center;width: 100%;">
					<view style=" background-color:#FFFFFF;border-radius: 10upx;box-shadow: 1upx 1upx 2upx 1upx #c1c1c1;width: 100%;display: flex;flex-direction: column;align-items: center;"
						v-for="(item,index) in showMenuList" :key="index" :id="'main-'+index">
						<view style="width: 95%;display: flex;flex-direction: row;justify-content: space-between;"
							class="cu-bar solid-bottom bg-white">
							<view class="action">{{item.name}}</view>
							<button class="cu-btn shadow"  :class="'bg-'+themeColor.name" @tap="showModal(index)"
								data-target="Image"><view class="cuIcon-calendar"></view> 客流预测</button>		
							<!-- <view @click="redirectTo(index)" :class="'bg-'+themeColor.name"
								style="font-weight: bold;padding: 15upx;border-radius: 30upx;height: 60upx;display: flex;flex-direction: row;align-items: center;justify-content: center;color: #FFFFFF;">
								<view class="cuIcon-calendar"></view> 客流预测
							</view> -->
						</view>
						<image class="image" :src="item.image"></image>
						<view style="margin-top: 10upx;padding: 5upx;display: flex;flex-direction: column;width: 95%;font-size: 26upx;border-bottom: 2upx solid #6CB2BA;">
							<text style="color: #5f5f5f;">星级：<text style="color: #5f5f5f;">{{item.score}}</text></text>
							<text style="color: #5f5f5f;">开放时间：<text style="color: #5f5f5f;">{{item.time}}</text></text>
							<text style="color: #5f5f5f;">票价：<text style="color: #5f5f5f;">{{item.money}}</text></text>
							<text style="color: #5f5f5f;">地址：<text
									style="color: #5f5f5f;">{{item.address}}</text></text>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
		
	</view>
</template>

<script>
	import gloalMixin from '@/mixins/global-minxin.js'
	import uCharts from '@/components/u-charts/u-charts.js';
	import lineChart from "../../components/lineChart"
	import {
		isJSON
	} from '@/common/checker.js';
	var _self;
	var canvaLineA = null;
	export default {
		components: {
			lineChart
		},
		mixins: [gloalMixin],
		data() {
			return {
				modalName: null,
				showMenuList: [],
				cWidth: '',
				data: "",
				cHeight: '',
				pixelRatio: 1,
				showItem: 1,
				pH: 0, //窗口高度
				navHeight: 0, //元素的所需高度
				tabCur: 0,
				mainCur: 0,
				verticalNavTop: 0,
				load: true,

				////
				name: "",
				data1: [],
				timeNow: "",
				all_row_time: [1, 2, 3],
				row_time: "",
				textarea: '',


			}
		},
		onReady() {
			let that = this;
			uni.getSystemInfo({ //调用uni-app接口获取屏幕高度
				success: res => { //成功回调函数
					this.pH = res.screenHeight //windoHeight为窗口高度，主要使用的是这个
					let titleH = uni.createSelectorQuery().select(".VerticalBox"); //想要获取高度的元素名（class/id）
					titleH.boundingClientRect(data => {
						let pH = this.pH;
						this.navHeight = pH - titleH //计算高度：元素高度=窗口高度-元素距离顶部的距离（data.top）
					}).exec()
				}
			})
		},
		onLoad(options) {
			this.showMenuList = getApp().globalData.jingdian.reverse()
		},
		methods: {
			// 常用功能点击
			handleMenu(menuUrl) {
				uni.navigateTo({
					url: menuUrl
				})
			},
			showModal(index) {
				this.name = this.showMenuList[index].name
				this.modalName = 'Image'
				this.$refs.lineChart.start(this.name);
			},
			hideModal(e) {
				this.modalName = ''
				console.log('modalname='+this.modalName);
				this.$refs.lineChart.end();
			},
			// 顶部tab切换			
			redirectTo(index) {
				uni.navigateTo({
					url: "../passengerFlow/lineChart?name=" + this.showMenuList[index].name
				})
			},


		}
	}
</script>

<style>
	.cu-list>.cu-item {
		transition: all .6s ease-in-out 0s;
		transform: translateX(0upx)
	}

	.image {
		width: 95%;
		height: 300upx;
		align-items: center;
		justify-content: center;
	}

	/* .cu-bar {
		display: flex;
		position: relative;
		align-items: center;
		min-height: 100upx;
		justify-content: space-between;
	} */
	.cu-bar .action {
		display: flex;
		align-items: center;
		height: 100%;
		color: #000000;
		font-weight: bold;
		justify-content: center;
		max-width: 90%;
	}

	.new {
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
		align-items: center;
		background-color: #FFFFFF;
		height: 100upx;
		border-left: solid 6upx #39b8ef;
		text-align: center;
	}

	.new1 {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: flex-end;
		background-color: #f7fbfe;
		height: 100upx;
		border-left: solid 6upx #f7fbfe;
		text-align: center;
	}
</style>
