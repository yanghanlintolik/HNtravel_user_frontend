<template>
	<view>
		<cu-custom :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content"  style="display: flex;flex-direction: row;align-items: center; justify-content: center;" >
				<image style="width: 40upx;height: 40upx;"
					src="http://m.qpic.cn/psc?/V12eKFrM2hLmPp/45NBuzDIW489QBoVep5mceHXTFWcyYv6UyuR2LevA2NhsrL9Ku0ZsyCNOBb5dyQznjobb8NomC6FnpU4TyOsOJAQQ59*BSRwWL3*nUe95uQ!/b&bo=mgHaAZoB2gEDJwI!&rf=viewer_4">
				虚拟导览
				</image>
				</block>
		</cu-custom>
		<!-- 列表卡片 -->
		<view class="cu-card article ">
			<view class="cu-item shadow-orange margin" v-for="(item,index) in scenic">
				<view class="title flex justify-between align-center" style="flex-direction: row; width: 100%;">
					<view class="text-cut" :class="'text-'+themeColor.name">{{item.name}}</view>
					<view class="cu-tag light sm round margin" :class="'bg-'+themeColor.name" @click="quanjing(index)">浏览全景</view>
				</view>
				<view class="content">
					<image :src="item.image" mode="aspectFill"></image>
					<view class="desc">
						<view>星级：<view class="cu-tag bg-red light sm round">{{item.star}}</view>
						</view>
						<view>票价：<view class="cu-tag bg-green light sm round">{{item.money}}元</view>
						</view>
						<text>开放时间：{{item.openTime}}</text>
						<view>地址：<text class="text-content">{{item.address}}</text></view>
					</view>
				</view>
				<view class="margin-lr margin-tb-sm text-gray text-sm">{{item.content}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import gloalMixin from '@/mixins/global-minxin.js'
	var _this = this
	export default {
		mixins: [gloalMixin],
		data() {
			return {
				scenic: [],
			}
		},
		onLoad(options) {
			
			uni.request({
				url:getApp().globalData.globalUrl + "/zqd/scenic/getVirtual",
				success: (e) => {
					getApp().globalData.scenic = e.data;
					this.scenic = e.data
					let num=0
					if(options.name!=null){
						for(var k=0;k<this.scenic.length;k++){
							
							if(options.name===this.scenic[k].name){
								this.quanjing(k)
								break;
							}	
							num++
						}
						if(num===this.scenic.length){
						uni.showModal({
							title: '提示',
							content: '暂无数据',
							cancelText: "取消", // 取消按钮的文字  
							confirmText: "确定", // 确认按钮文字  
							showCancel: true, // 是否显示取消按钮，默认为 true
							confirmColor: '#f55850',
							cancelColor: '#39B54A',
							success: (res) => {
								if (res.confirm) {
									uni.navigateBack({
						
									})
								} else {
									uni.navigateBack({
						
									})
								}
							}
						})
						}
						
					}
				}
			})
		},

		methods: {
			quanjing(e) {
				uni.navigateTo({
					//多个参数用&拼接:url: '../comment/comment?id='+id'&name='+name
					url:"quanJing?index="+e
				});
			}
		}
	}
</script>

<style>
	.contain_view {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}


	.qiun-columns {
		justify-content: center;
		margin-top: 20upx;
		width: 90%;
		display: flex;
		flex-direction: column;
		align-items: center;
		border-bottom: solid 1upx #007AFF;
		padding-bottom: 20upx;
	}

	.title {
		font-size: 50upx;
		font-weight: bold;
		width: 70%;
		padding-left: 25upx;
		color: #007AFF;
	}

	.title2 {
		width: 90%;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: flex-start;
		font-weight: bold;
		padding-left: 25upx;
	}

	.image {
		width: 55%;
		height: 200upx;
	}

	.title1 {
		font-size: 30upx;
	}

	.title_view {
		margin-top: 20upx;
		width: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}

	.message {
		margin-left: 20upx;
		width: 45%;
		height: 200upx;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: space-around;
	}

	.first {
		width: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
	}

	.daohang_bt {
		width: 180upx;
		height: 60upx;
		line-height: 60upx;
		background-color: #55AAFF;
		font-weight: bold;
		color: white;
		border-radius: 30upx;
		font-size: 30upx;
	}
</style>
