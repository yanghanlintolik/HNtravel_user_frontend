<template>
	<view>
		<cu-custom :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content"  style="display: flex;flex-direction: row;align-items: center; justify-content: center;" >
				<image style="width: 40upx;height: 40upx;"
					src="http://m.qpic.cn/psc?/V12eKFrM2hLmPp/45NBuzDIW489QBoVep5mceHXTFWcyYv6UyuR2LevA2NhsrL9Ku0ZsyCNOBb5dyQznjobb8NomC6FnpU4TyOsOJAQQ59*BSRwWL3*nUe95uQ!/b&bo=mgHaAZoB2gEDJwI!&rf=viewer_4">
				个性路线
				</image>
				</block>
		</cu-custom>

		<view class="contain" scroll-y="" enable-flex="true">
			<!-- v-for="(item,index) in chooseList"	 -->
			<view class="head_view" style="margin-top: 20upx;">
				<view class="image-view" :style="{backgroundImage: 'url('+url+')'}">
					<view style="color: #FFFFFF;text-align: left;padding-top: 220upx;padding-left: 20upx;">
						{{list2.name}}
						<view style="font-size: 24upx;">{{list2.address}}</view>
					</view>
				</view>
			</view>
			<view class="part2">
				<view style="height: 48upx;align-items: center; width: 100%;flex-direction: row;display: flex;"
					:class="'text-'+ themeColor.name">
					<view style="display: flex;margin-right: 20upx;">简介</view>

				</view>
				<view>
					<scroll-view style="width: 98%;margin-top: 10upx;padding-bottom: 20upx;" scroll-y>
						<view
							style="line-height: 40upx; font-size: 26upx;width: 100%;margin-top:10upx;margin-bottom: 10upx;">							　
							{{list2.scen_detail}}
						</view>
					</scroll-view>
				</view>
			</view>
			<view class="part2" style="height: 540upx;">
				<map @markertap="markClick" :latitude="latitude" :longitude="longitude" :polyline="map1"
					:markers="markers" :scale="scale" style="width: 100%;height: 500upx;">
				</map>
			</view>

			<view
				style="height: auto;display: flex;flex-direction: column;align-items: center;justify-content: center;width: 100%;">
				<view class="cu-bar bg-white " style="width: 100%;">
					<view class="action" :class="'text-'+ themeColor.name"
						style="width: 100%;height: 80upx;display: flex;flex-direction: row;justify-content: space-between;">
						<view style="display: flex;flex-direction: row;align-items: center;justify-content: start;"><text class="cuIcon-titles"></text>景区攻略</view>
						<button @click="togl()"  style="margin: 0;width: 120upx;height: 40upx;line-height: 40upx;font-size: 25upx;text-align: center;color: #FFFFFF;background-color: #20d2ff;border-radius: 10upx;">攻略</button>
					</view>
				</view>
				<view class="cu-bar bg-white " style="width: 100%;">
					<view class="action" :class="'text-'+ themeColor.name"
						style="width: 100%;display: flex;flex-direction: row;justify-content: flex-start;">
						<text class="cuIcon-titles"></text>推荐景点
					</view>
				</view>

				<view
					style="width: 100%;display: flex;height: 250upx;flex-direction: row;align-items: center;justify-content: center;box-shadow: 1upx 1upx 2upx 1upx #c1c1c1;background-color: #FFFFFF;padding: 20upx;">
					<image style="width: 40%;height: 200upx;border-radius: 16upx;" :src="list3[theDetail][2]"></image>
					<view
						style="display: flex;flex-direction: column;align-items: center;justify-content: space-around;width: 60%;height: 250upx;">
						<view
							style="width: 90%;padding: 10upx;display: flex;flex-direction: row;align-items:center;justify-content: space-between;margin-top: 5upx;">
							<view class="title">{{list3[theDetail][0]}}</view>
							<image :src="src[theDetail]" style="width: 50upx;height: 50upx;" @click="select(theDetail)">
							</image>
						</view>
						<scroll-view scroll-y style="height: 180upx;padding: 10upx;width: 90%;">
							<text style="font-size: 25upx;"
								:class="'text-'+ themeColor.name">简介：{{list3[theDetail][4]}}</text>
						</scroll-view>
					</view>
				</view>

			</view>
		</view>
	</view>
</template>

<script>
	import gloalMixin from '@/mixins/global-minxin.js'
	const innerAudioContext = uni.createInnerAudioContext();
	export default {
		mixins: [gloalMixin],
		data() {

			return {
				musicIndex: -1,
				src: [],
				src1: "../../static/bofang1.png",
				src2: "../../static/zanting.png",
				is_start: false,
				if_view: false,
				animationData: {},
				list2: {},
				list3: [],
				index: 0,
				url: "",
				pH: 0,
				latitude: 0,
				longitude: 0,
				map: [],
				map1: [],
				markers: [],
				list: [],
				list1: [],
				scale: 16,
				animation: '',
				timer: "",
				isStop: 0,
				theDetail: 0
			}
		},
		onReady() {


			uni.getSystemInfo({ //调用uni-app接口获取屏幕高度
				success: res => { //成功回调函数
					this.pH = res.screenHeight //windoHeight为窗口高度，主要使用的是这个

				}
			})
		},
		onLoad(options) {
			console.log(options.index)
			this.list2 = getApp().globalData.jingdian[options.index]
			this.url = this.list2.image
			console.log(this.url)
			uni.showLoading({
				title: "加载中",
			})
			uni.request({
				url: getApp().globalData.globalUrl + "/xiaogonglue/strategy_recommend/" + getApp().globalData.id +
					"/" + this.list2.name,
				success: e => {
					uni.hideLoading()
					this.list3 = e.data
					for (var i in this.list3) {
						this.src.push(this.src1)
					}
					this.showAll()
				}
			})
		},
		methods: {
			markClick(e) {
				console.log("点击了")
				console.log(e.markerId)
				this.theDetail = e.markerId

			},
			musicStop(index) {
				this.src[index] = this.src1
				this.is_start = false
				innerAudioContext.stop()
				this.isStop = 0
			},
			select(index) {
				if (this.musicIndex === index && this.isStop === 1) {
					this.musicStop(index)
				} else {
					this.bofang(index)
				}
			},
			togl(){
				uni.navigateTo({
					url: "/pages/guide/scenicLine?name=" + this.list2.name
				})
			},
			bofang(index) {
				this.isStop = 1
				this.src[this.musicIndex] = this.src1
				this.src[index] = this.src2
				this.musicIndex = index
				this.is_start = true
				this.isRoate = true
				this.if_view = true
				innerAudioContext.src = this.list3[index][3]
				innerAudioContext.play();

			},
			donghua() {
				this.animation.rotate(18000).step()
				this.animationData = this.animation.export()
				this.animation
			},
			showAll() {
				this.scale = 16
				this.map = []
				this.map1 = []

				for (var i = 0; i < this.list3.length; i++) {
					var point = this.list3[i][1].split(",")
					console.log(point)
					this.latitude = point[1]
					this.longitude = point[0]
					this.markers.push({
						id: i,
						alpha: 0.6,
						anchor: {
							x: 1,
							y: 0
						},
						label: {
							content: this.list3[i][0], //this.list1[i][1]
							color: '#0e0908',
							bgColor: '#e0e758',
							padding: 3,
							borderRadius: 4
						},
						width: 20,
						height: 20,
						latitude: point[1],
						longitude: point[0],
						iconPath: '../../static/yuandian.png'
					})

				}
				var label = []
				var long_i = 0
				var long_k = 1000000
				for (var j = 0; j < this.list3.length; j++) {
					var point = this.list3[j][1].split(":")
					if (point[0] < long_k) {
						long_i = j
						long_k = point[0]
					}
				}
				this.map.push({
					"points": [],
					"arrowLine": false,
					"width": 3,
					"color": "#6f72f7"
				})
				this.map[0].points.push({
					"latitude": this.list3[long_i][1].split(",")[1],
					"longitude": this.list3[long_i][1].split(",")[0]
				})
				label.push(long_i)
				for (var j = 1; j < this.list3.length; j++) {
					var min = 10000
					var min_point = 0
					for (var k = 0; k < this.list3.length; k++) {
						if (!(label.indexOf(k) > -1)) {
							if (Math.abs(this.list3[label[label.length - 1]][1].split(",")[0] - this.list3[k][1].split(
									",")[0]) +
								Math.abs(this.list3[label[label.length - 1]][1].split(",")[1] - this.list3[k][1].split(
									",")[1]) < min) {
								min_point = k
								min = Math.abs(this.list3[label[label.length - 1]][1].split(",")[0] - this.list3[k][1]
										.split(",")[0]) +
									Math.abs(this.list3[label[label.length - 1]][1].split(",")[1] - this.list3[k][1].split(
										",")[1])
							}
						}
					}
					label.push(min_point)
					this.map[0].points.push({
						"latitude": this.list3[min_point][1].split(",")[1],
						"longitude": this.list3[min_point][1].split(",")[0]
					})
				}
				console.log(this.markers)
				this.map1 = this.map
				this.scale = 16
			}

		}

	}
</script>

<style lang="scss" scoped>
	page {
		display: flex;
		flex-direction: column;
		height: auto;
		min-height: 100%;
	}

	.contain {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		margin-bottom: 20upx;
	}

	.head_view {
		width: 95%;
		height: 300upx;

	}

	.image-view {
		width: 100%;
		height: 100%;
		background-size: 100% 100%;
	}

	.part1 {
		width: 95%;
		height: 80upx;
		display: flex;
		justify-content: space-between;
		flex-direction: row;
		align-items: center;
		text-align: center;
		background-color: #FFFFFF;
	}

	.part1-view {
		width: 50%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.part2 {
		width: 100%;
		display: flex;
		background-color: #FFFFFF;
		padding: 20upx;
		margin-top: 20upx;
		flex-direction: column;
		box-shadow: 1upx 1upx 1upx 1upx #37e6bb;
	}

	.part2_view {
		color: #888888;
		width: 100%;
		height: 200upx;
	}

	.cu-tag {
		font-size: 24upx;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		box-sizing: border-box;
		padding: 5upx 5upx;

		margin: 10upx;
	}

	.cu-border {
		border: 2upx solid #aaaaaa;
	}
</style>
