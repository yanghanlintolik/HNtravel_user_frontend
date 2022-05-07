<template>	
	<view>
		<cu-custom :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content"  style="display: flex;flex-direction: row;align-items: center; justify-content: center;" >
				<image style="width: 40upx;height: 40upx;"
					src="http://m.qpic.cn/psc?/V12eKFrM2hLmPp/45NBuzDIW489QBoVep5mceHXTFWcyYv6UyuR2LevA2NhsrL9Ku0ZsyCNOBb5dyQznjobb8NomC6FnpU4TyOsOJAQQ59*BSRwWL3*nUe95uQ!/b&bo=mgHaAZoB2gEDJwI!&rf=viewer_4">
				景点搜索
				</image>
				</block>
		</cu-custom>
		<view class="cu-bar search bg-white">
			<view class="search-form round">
				<text class="cuIcon-search"></text>
				<input v-model="data" @input="change"  @blur="InputBlur" :adjust-position="false" type="text" placeholder="请输入搜索关键字" confirm-type="search"></input>
			</view>
		</view>
		<view class="cu-list grid col-4 margin-tb-sm no-border solids-bottom">
			<view v-if="flag==0" class="cu-tag bg-blue light round margin">暂无搜索内容</view>
		<view style="display: flex;flex-direction: column;align-items: center;width: 100%;">
			<view style=" background-color:#FFFFFF;border-radius: 10upx;box-shadow: 1upx 1upx 2upx 1upx #c1c1c1;width: 95%;height: 800upx;margin-top: 20upx;display: flex;flex-direction: column;align-items: center;"
			 v-for="(item,index) in showMenuList" :key="index" :id="'main-'+index">
				<view style="width: 95%;" class="cu-bar solid-bottom bg-white">
					<view class="action padding-lr">{{item.name}}</view>
					<!-- <button class="bg-blue text-df" @click="redirectTo(index)">客流预测</button> -->
					<button class="cu-btn text-sm round bg-blue" @click="redirectTo(index)">客流预测</button>
				</view>
				<image class="image" :src="item.image"></image>
				<view style="margin: 10upx;height: 220upx; padding: 5upx;display: flex;flex-direction: column;width: 95%;font-size: 26upx;border-bottom: 2upx solid #6CB2BA;">
					<text style="color: #5f5f5f;">星级：<text style="color: #5f5f5f;">{{item.score}}</text></text>
					<text style="color: #5f5f5f;">开放时间：<text style="color: #5f5f5f;">{{item.time}}</text></text>
					<text style="color: #5f5f5f;">票价：<text style="color: #5f5f5f;">{{item.money}}</text></text>
					<text style="color: #5f5f5f;">地址：<text style="color: #5f5f5f;">{{item.address}}</text></text>
				</view>
				<scroll-view style="width: 95%;height: 200upx;" scroll-y>
					<view style="color:  #5f5f5f; font-size: 25upx;width: 95%;margin-top:
					 10upx;margin-bottom: 4upx;">简介：{{item.scen_detail}}
					</view>
				</scroll-view>
			</view>
		</view>
			
		</view>
		
	</view>
	
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	import gloalMixin from '@/mixins/global-minxin.js'
	export default {
		mixins: [gloalMixin],
		components: {
			uniNavBar
		},
		data() {
			return {
				flag:0,
				data: null,
				showMenuList: [],
				list: []
			}
		},
		onLoad() {
			this.list = getApp().globalData.jingdian
		},
		onReady() {
			uni.hideLoading()
		},
		methods: {
			redirectTo(index) {
				uni.navigateTo({
					url: "../passengerFlow/lineChart?name=" + this.showMenuList[index].name
				})
			},
			// 查询景点
			change() {
				this.showMenuList = []
				for (var i in this.list) {
					console.log(this.list[i].name)
					if (this.list[i].name.search(this.data) != -1 && this.data != "") {
						this.showMenuList.push(this.list[i])
						this.flag=1
					}
				}
				if(this.showMenuList.length==0){
					this.flag=0
				}
				console.log(this.showMenuList)
			},
			back(){
				uni.navigateBack({
					delta: 1
				})
			},
			// redirectTo(index){
			// 	console.log(this.showMenuList[index].url)
			// 	uni.redirectTo({
			// 		url:this.showMenuList[index].url
			// 	})
			// }
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

		}
	}
</script>

<style>
	.search_view {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-start;
	}

	.search_title {
		font-size: 30upx;
	}

	.menu {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: flex-start;
		width: 100%;
		height: auto;
		padding: 20upx;
	}

	.search_input {
		color: #000000;
		background-color:#FFFFFF;
		width: 100%;
		height: 60upx;
		padding-left: 40upx;
		font-size: 30upx;
		border-radius: 10upx;
	}
	.row{
		padding-bottom: 10upx;
		width: 100%;
		margin-top: 20upx;
		border-bottom: solid 1upx #C8C7CC;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: flex-start;
	}
</style>
