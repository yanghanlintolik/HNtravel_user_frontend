<template>
	<view style="background-color: #eeeeee;">
		<cu-custom :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content"  style="display: flex;flex-direction: row;align-items: center; justify-content: center;" >
				<image style="width: 40upx;height: 40upx;"
					src="http://m.qpic.cn/psc?/V12eKFrM2hLmPp/45NBuzDIW489QBoVep5mceHXTFWcyYv6UyuR2LevA2NhsrL9Ku0ZsyCNOBb5dyQznjobb8NomC6FnpU4TyOsOJAQQ59*BSRwWL3*nUe95uQ!/b&bo=mgHaAZoB2gEDJwI!&rf=viewer_4">
				问题反馈
				</image>
				</block>
		</cu-custom>
		<view class="cu-form-group" @click="tofankui()">
			<view class="text-xl">
				<text class="cuIcon-font text-blue"></text>
				<text class="text-grey text-lg padding-lr">新建</text>
			</view>
			<view class="cuIcon-right"></view>
		</view>
		<view style="width: 100%;height:100vh;">
			<scroll-view scroll-y="" enable-flex="true" style="display: flex;flex-direction: column;align-items: center;width: 100%;height: 100%;">
				<view v-for="(item,index) in list" style="margin-top: 20upx;padding: 15upx;background-color: #FFFFFF;display: flex;flex-direction: column;align-items: flex-start;width: 100%;">
					<view style="padding: 20upx;background-color: #FFFFFF;display: flex;flex-direction: row;align-items: center;height: 60upx;width: 100%;">
						<image style="width: 80upx;height: 80upx;border-radius: 40upx;" :src="item.userImage"></image>
						<text style="margin-left: 20upx;">{{item.userName}}</text>
					</view>
					<view style="margin-top: 20upx;padding: 20upx;background-color: #FFFFFF;display: flex;flex-direction: row;align-items: center;height: 60upx;width: 100%;justify-content: space-between;">
						<text style="font-size: 30upx;font-weight: bold;">标题：{{item.title}}</text>
						<text style="color: #007AFF;">{{item.status===0?'未读':item.status===1?'已受理':'已解决'}}</text>
					</view>
					<view style="margin-top: 20upx;height: 100upx;padding: 20upx;background-color: #FFFFFF;display: flex;flex-direction: row;align-items: center;width: 100%;">
					<view v-for='(item1,index1) in item.image.split(",")'>
						<image style="margin-left: 10upx;width: 100upx;height: 100upx;" :src='item1'>
						</image>
					</view>
					</view>
					<view style="margin-top: 20upx;padding-left: 20upx;font-size: 30upx;width: 100%;">
						内容：{{item.content}}
					</view>
					<view style="margin-top: 10upx;font-size: 30upx;width: 100%;">
						<text style="margin-left: 20upx;">{{item.date}}</text>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import gloalMixin from '@/mixins/global-minxin.js'
	export default {
		mixins:[gloalMixin],
		data() {
			return {
				list: []
			};
		},
		onShow() {
			uni.request({
				url: getApp().globalData.globalUrl + "/zhangqidi/zqd/feedback/get/"+getApp().globalData.id,
				success: res => {
					this.list = res.data
					console.log(this.list)
				}
			})
		},
		methods: {
			tofankui() {
				uni.navigateTo({
					url: "fankui"
				})
			}
		}
	}
</script>

<style>
</style>
