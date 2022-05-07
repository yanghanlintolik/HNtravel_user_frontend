<template>
	<view>
		<cu-custom :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content"  style="display: flex;flex-direction: row;align-items: center; justify-content: center;" >
				<image style="width: 40upx;height: 40upx;"
					src="http://m.qpic.cn/psc?/V12eKFrM2hLmPp/45NBuzDIW489QBoVep5mceHXTFWcyYv6UyuR2LevA2NhsrL9Ku0ZsyCNOBb5dyQznjobb8NomC6FnpU4TyOsOJAQQ59*BSRwWL3*nUe95uQ!/b&bo=mgHaAZoB2gEDJwI!&rf=viewer_4">
				用户画像
				</image>
				</block>
		</cu-custom>
	<view class="cu-bar bg-white solids-bottom ">
		<view class="action">
			<text class="cuIcon-title" :class="'text-'+themeColor.name"></text> 越重要的信息字体越大哦！
		</view>
	</view>
	<view class="view" :style="{height:pH+'px'}">
		<image mode="widthFix" style="width: 100%; background-color: #007AFF;" :src="url">
		</image>
		
	</view>
	</view>
</template>

<script>
	import gloalMixin from '@/mixins/global-minxin.js'
	export default {
		mixins:[gloalMixin],
		data() {
			return {
				pH: 0,
				url: ""
			}
		},
		onLoad() {
			console.log(getApp().globalData.id)
			this.url = getApp().globalData.globalUrl + "/user_portrait_picture/" + getApp().globalData.id + ".jpg"
		},
		onReady() {
			let that = this;
			uni.getSystemInfo({ //调用uni-app接口获取屏幕高度
				success: res => { //成功回调函数
					this.pH = res.screenHeight //windoHeight为窗口高度，主要使用的是这个
					let titleH = uni.createSelectorQuery().select(".scroll"); //想要获取高度的元素名（class/id）
					titleH.boundingClientRect(data => {
						let pH = this.pH;
						this.navHeight = pH - 90 //计算高度：元素高度=窗口高度-元素距离顶部的距离（data.top）
					}).exec()
				}
			})
			this.imgHeight()
		},
		methods: {
			back() {
				uni.navigateBack({
					delta: 1
				})
			},

			saveClick() {
				let tagnames = this.checktags.join(',').toString();
				uni.showToast({
					icon: "success",
					title: "保存成功，内容：" + tagnames,
					duration: 2000
				});
			}
		}
	}
</script>

<style>
	.view {
		height: 100%;
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-start;
	}
</style>
