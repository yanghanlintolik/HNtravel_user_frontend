<template>
	<view>
		<cu-custom :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content"  style="display: flex;flex-direction: row;align-items: center; justify-content: center;" >
				<image style="width: 40upx;height: 40upx;"
					src="http://m.qpic.cn/psc?/V12eKFrM2hLmPp/45NBuzDIW489QBoVep5mceHXTFWcyYv6UyuR2LevA2NhsrL9Ku0ZsyCNOBb5dyQznjobb8NomC6FnpU4TyOsOJAQQ59*BSRwWL3*nUe95uQ!/b&bo=mgHaAZoB2gEDJwI!&rf=viewer_4">
				消费预警
				</image>
				</block>
		</cu-custom>
		<map show-location="true" scale="12" :style="{height:pH+'px'}" style="width: 100%;" :latitude="latitude"
		 :longitude="longitude" :circles="circles">
		</map>
	</view>
</template>

<script>
	import gloalMixin from '@/mixins/global-minxin.js'
	export default {
		mixins: [gloalMixin],
		data() {
			return {
				scale:17,
				latitude:0,
				longitude:0,
				pH: 0,
				circles: []
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
			uni.getLocation({
				type: 'wgs84',
				success: res=> {
					this.latitude=res.latitude
					this.longitude=res.longitude
				}
			})
			uni.request({
				url:getApp().globalData.globalUrl+"/get_data",
				success:e=> {
					for (var i = 0; i < e.data.length; i++) {
						this.circles.push({
						"latitude": e.data[i].lat,
						"longitude": e.data[i].lng,
						"fillColor": "#fd6912AA",
						"color":"#DC143CAA",
						"radius": e.data[i].count*1000,
						"strokeWidth":5
					})
					
					}
					console.log(this.circles)
				}
			})
			
		}

	}
</script>

<style>
</style>
