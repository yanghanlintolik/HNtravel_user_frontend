<template>
	<view>
		<cu-custom :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content"  style="display: flex;flex-direction: row;align-items: center; justify-content: center;" >
				<image style="width: 40upx;height: 40upx;"
					src="http://m.qpic.cn/psc?/V12eKFrM2hLmPp/45NBuzDIW489QBoVep5mceHXTFWcyYv6UyuR2LevA2NhsrL9Ku0ZsyCNOBb5dyQznjobb8NomC6FnpU4TyOsOJAQQ59*BSRwWL3*nUe95uQ!/b&bo=mgHaAZoB2gEDJwI!&rf=viewer_4">
				旅游攻略
				</image>
				</block>
		</cu-custom>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action" :class="'text-'+themeColor.name">
				<text class="cuIcon-titles " ></text> 定制景点
			</view>
			<view class="action text-gray">
				<view class="text-red" :class="isLike? 'cuIcon-likefill':'cuIcon-like'" @click="isChooseLike()"><text class="text-df" :class="'text-'+themeColor.name">喜欢</text></view>
				<view class="cuIcon-refresh margin-left-sm"><text class="text-df" @click="isChooseRefresh()">重新定制</text></view>
			</view>
		</view>
		<view class="cu-card article margin-lr-sm" v-for="(item,index) in strategyList" :key="index">
			<view class="cu-item shadow-orange">
				<view class="title">
					<view class="text-cut">{{item[0]}}</view>
				</view>
				<view class="content">
					<image :src="item[2]"></image>
					<view class="desc">	
						<scroll-view style="width: 95%;height: 200upx;" scroll-y>
							<view style="color:  #5f5f5f; font-size: 25upx;width: 95%;margin-top:
							 10upx;margin-bottom: 4upx;">简介：{{item[1]}}
							</view>
						</scroll-view>
					</view>
				</view>
			</view>
		</view>
	
	</view>
</template>

<script>
	import gloalMixin from '@/mixins/global-minxin.js'
	export default {
		mixins:[gloalMixin],
		data() {
			return {
				strategyList:[],
				isLike:false,
				refreshNum:0
			}
		},
		onLoad() {
			
			this.strategyList = getApp().globalData.strategyList
			console.log(this.strategyList)
		},
		methods: {
			isChooseLike() {
				this.isLike = true
				uni.redirectTo({
					url: '/pages/guide/strategy-Customized'
				})
			},
			isChooseRefresh() {
				this.strategyList = []
				this.refreshNum = this.refreshNum + 1
				console.log(getApp().globalData.idList);
				uni.request({
					url: getApp().globalData.globalUrl+"/strategy1/sight_strategy/" +  getApp().globalData.dayChoose +"/"+ "["+ getApp().globalData.idList + "]"+"/" + this.refreshNum,
					success: res => {
						uni.showLoading({
							title:'已重新规划'
						})
						setTimeout(function () {
						    uni.hideLoading();
						}, 1000);
						console.log(res.data)
						this.strategyList = res.data
						getApp().globalData.strategyList=res.data
						if (res.data.length == 0) {
							console.log('没内容了');
							setTimeout(function () {
							   uni.showModal({
							   	title:"暂无更多内容"
							   })
							}, 1000);
							
						}
					},	
				})
				
				
				console.log(this.refreshNum);
			}
		}
	}
</script>

<style>
</style>
