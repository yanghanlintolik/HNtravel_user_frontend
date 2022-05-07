<template>
	<view class="page-body">
		<view class="page-section page-section-gap">
			<map scale="13" style="width: 100%;height: 500upx;" :latitude="latitude" :longitude="longitude" :polyline="polyline">
			</map>
		</view>
	</view>
</template>

<script>
	export default {
		name: "map_real",
		props: {
			roadData:"",
			roadName:""
		},
		data() {
			return {
				list: [],
				inputData: "",
				data: "",
				flag: 0,
				pH: 0,
				id: 0, // 使用 marker点击事件 需要填写id
				title: 'map',
				latitude: 20.04102,
				longitude: 110.18724,
				polyline: [],
				covers: [{
					latitude: 39.909,
					longitude: 116.39742,
					iconPath: '../../static/add_image.png'
				}, {
					latitude: 39.90,
					longitude: 116.39,
					iconPath: '../../static/add_image.png'
				}]
			}
		},

		onLoad() {

		},
		
		methods: {
			back() {
				uni.navigateBack({
					delta: 1
				})
			},
			show(index) {
				var midelData = this.roadData.roadData[index].split(",")
				this.inputData = this.roadName.roadName[index]
				var weidu = 0.000
				var polyline = []
				polyline = [{
					"points": [],
					arrowLine: false,
					width: 5,
					"color": "#4922aa"
				}]
				for (var i in midelData) {
					if (i == 0) {
						this.longitude = midelData[0].split(" ")[0],
							this.latitude = midelData[0].split(" ")[1]
					}
					if (weidu < midelData[i].split(" ")[1]) {
						weidu = midelData[i].split(" ")[1]
					}
					polyline[0].points.push({
						"latitude": midelData[i].split(" ")[1],
						"longitude": midelData[i].split(" ")[0]
					})
				}
				this.polyline = polyline
				this.flag = 0
			},
			
		}
	}
</script>

<style>
	.contain {
		width: 100%;
		height: 100%;
	}

	.map {
		width: 100%;
	}

	.search_input {
		color: #000000;
		background-color: #FFFFFF;
		width: 100%;
		height: 60upx;
		padding-left: 10upx;
		font-size: 30upx;
		border-radius: 10upx;
	}

	.for_view {
		margin-left: 20upx;
		width: 100%;
		margin-top: 20upx;
	}

	.list {
		width: 100%;
		height: 300upx;
	}

	.text1 {
		font-size: 35upx;
	}

	.scroll {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: flex-start;
		height: 100%;
	}
</style>
