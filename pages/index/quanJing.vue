<template>
	<view>
		<cu-custom :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content"  style="display: flex;flex-direction: row;align-items: center; justify-content: center;" >
				<image style="width: 40upx;height: 40upx;"
					src="http://m.qpic.cn/psc?/V12eKFrM2hLmPp/45NBuzDIW489QBoVep5mceHXTFWcyYv6UyuR2LevA2NhsrL9Ku0ZsyCNOBb5dyQznjobb8NomC6FnpU4TyOsOJAQQ59*BSRwWL3*nUe95uQ!/b&bo=mgHaAZoB2gEDJwI!&rf=viewer_4">
				全景浏览
				</image>
				</block>
		</cu-custom>
		<web-view :src="src"></web-view>
	</view>
</template>

<script>
	import gloalMixin from '@/mixins/global-minxin.js'
	export default {
		mixins: [gloalMixin],
		data() {
			return {
				src: ""
			}
		},
		onReady() {
			uni.getSystemInfo({ //调用uni-app接口获取屏幕高度
				success: res => { //成功回调函数
					this.pH = res.screenHeight //windoHeight为窗口高度，主要使用的是这个

				}
			})
		},
		onLoad(option) {
			console.log(option)
			this.src = getApp().globalData.scenic[option.index].view
		}
	}
</script>

<style>
</style>
