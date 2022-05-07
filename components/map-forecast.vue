<template>
	<view style="height: 100%;width: 100%;">
		<view class="cu-bar search bg-white">
			<view class="search-form round">
				<text class="cuIcon-search"></text>
				<input v-model="inputData" @input="change" @blur="InputBlur" :adjust-position="false" type="text" placeholder="请输入搜索关键字"
				 confirm-type="search"></input>
			</view>
		</view>
		<view class="bg-white padding-sm" v-if="flag">
			<scroll-view scroll-y style="width: 80%;">
				<view @click="show(index)" class="solids-bottom padding-lr padding-tb-sm" v-for="(item,index) in list">
					<text class="text-grey">{{item.name}}</text>
				</view>
			</scroll-view>
		</view>
		<view class="page-section page-section-gap" style="height: 100%;width: 100%;">
			<map  :scale="scale" style="width: 100%;height: 100vh;" :latitude="latitude" :longitude="longitude"
			 :markers="covers1" :polyline="polyline" :controls="controls" :polygons="polygon" @controltap="markclick"
			 :enable-traffic="enable_traffic">
			</map>
		</view>
	</view>
</template>

<script>
	import roadData from "../data/roadData.js"
	import roadName from "../data/roadData.js"
	import quyu from "../data/roadData.js"
	export default {
		name: "map_for",
		props: {

		},
		data() {
			return {
				enable_traffic: false,
				quyuList: [460105, 460106, 460108],
				controls: [{
						id: 1,
						position: {
							left: 0,
							top: 0,
							width: 30,
							height: 30
						},
						clickable: true,
						iconPath: "../../../static/honglvdeng.png"
					},
					{
						id: 2,
						position: {
							left: 50,
							top: 0,
							width: 30,
							height: 30
						},
						clickable: true,
						iconPath: "../../../static/tianqi.png"
					}
				],
				list: [],
				if_tianqi: 0,
				if_jiaotong: 0,
				inputData: "",
				roadData: roadData,
				roadName: roadName,
				quyu: quyu,
				data: "",
				flag: 0,
				otherflag: false,
				scale: 12,
				polygon: [],
				pH: 0,
				id: 0, // 使用 marker点击事件 需要填写id
				title: 'map',
				latitude: 19.920893,
				longitude: 110.283993,
				polyline: [],
				covers1: [],
				tianqi_covers: [{
					id: 1,
					alpha: 0.6,
					anchor: {
						x: 1,
						y: 0
					},
					label: {
						content: "",
						color: '#0e0908',
						bgColor: '#dae5b4',
						padding: 5,
						borderRadius: 4
					},
					width: 30,
					height: 30,
					latitude: 19.950893,
					longitude: 110.370993,
					iconPath: '../../../static/biaoji.png'
				}, {
					id: 2,
					alpha: 0.6,
					anchor: {
						x: 1,
						y: 0
					},
					label: {
						content: "",
						color: '#0e0908',
						bgColor: '#dae5b4',
						padding: 5,
						borderRadius: 4
					},
					width: 30,
					height: 30,
					latitude: 19.950893,
					longitude: 110.222424,
					iconPath: '../../../static/biaoji.png'
				}, {
					id: 3,
					alpha: 0.6,
					anchor: {
						x: 1,
						y: 0
					},
					label: {
						content: "",
						color: '#0e0908',
						bgColor: '#dae5b4',
						padding: 5,
						borderRadius: 4
					},
					width: 30,
					height: 30,
					latitude: 20.025507,
					longitude: 110.532424,
					iconPath: '../../../static/biaoji.png'
				}]
			}
		},

		mounted() {
			this.tianqiRequest()
			uni.getSystemInfo({ //调用uni-app接口获取屏幕高度
				success: res => { //成功回调函数
					this.pH = res.screenHeight //windoHeight为窗口高度，主要使用的是这个

				}
			})
		},
		
		methods: {
			show(index) {
				this.otherflag = true
				this.scale = 18
				this.covers1 = []
				console.log(index)
				var midelData = this.roadData.roadData[this.list[index].id].split(",")
				this.inputData = this.roadName.roadName[this.list[index].id]
				var length = this.roadData.roadData[this.list[index].id].split(",").length
				this.longitude = midelData[parseInt(length / 2)].split(" ")[0],
					this.latitude = midelData[parseInt(length / 2)].split(" ")[1]
				this.covers1 = [{
					id: 1,
					alpha: 0.6,
					anchor: {
						x: 1,
						y: 0
					},
					label: {
						content: this.roadName.roadName[this.list[index].id].split("->")[1],
						color: '#0e0908',
						bgColor: '#dae5b4',
						padding: 5,
						fontSize: 15,
						borderRadius: 4
					},
					width: 15,
					height: 15,
					latitude: midelData[parseInt(length / 2)].split(" ")[1],
					longitude: midelData[parseInt(length / 2)].split(" ")[0],
					iconPath: '../../../static/yuandian.png'
				}]
				console.log(this.covers1)
				this.flag = 0
			},



			markclick(e) {

				if (e.controlId == 2) {
					this.if_tianqi++
					this.enable_traffic = false
					if (this.if_tianqi % 2 == 1) {
						this.if_jiaotong = 0
						this.showtianqi()
					} else {
						this.polyline = []
						this.covers1 = []
					}
				} else {
					this.if_jiaotong++
					if (!this.otherflag) {
						this.covers1 = []
					}
					this.polyline = []

					if (this.if_jiaotong % 2 == 1) {
						this.if_tianqi = 0
						this.enable_traffic = true
					} else {
						this.enable_traffic = false

						this.covers1 = []

					}
				}
			},
			tianqiRequest() {

				uni.request({
					url: "https://api.map.baidu.com/weather/v1/?district_id=" + this.quyuList[0] +
						"&data_type=all&ak=EtMcTmGFwIx9YOIXFiwmGcFOohe6YLne",
					success: res => {
						this.tianqi_covers[1].label.content = "秀英区:" + res.data.result.now.text + "\n" + "温度:" + res.data.result.now.temp +
							"\n" + res.data.result.now.wind_dir + " " + res.data.result.now.wind_class
					}
				})
				uni.request({
					url: "https://api.map.baidu.com/weather/v1/?district_id=" + this.quyuList[1] +
						"&data_type=all&ak=EtMcTmGFwIx9YOIXFiwmGcFOohe6YLne",
					success: res => {

						this.tianqi_covers[0].label.content = "龙华区:" + res.data.result.now.text + "\n" + "温度:" + res.data.result.now.temp +
							"\n" + res.data.result.now.wind_dir + " " + res.data.result.now.wind_class
					}
				})
				uni.request({
					url: "https://api.map.baidu.com/weather/v1/?district_id=" + this.quyuList[2] +
						"&data_type=all&ak=EtMcTmGFwIx9YOIXFiwmGcFOohe6YLne",
					success: res => {
						this.tianqi_covers[2].label.content = "美兰区:" + res.data.result.now.text + "\n" + "温度:" + res.data.result.now.temp +
							"\n" + res.data.result.now.wind_dir + " " + res.data.result.now.wind_class

					}
				})

			},
			showtianqi() {
				this.latitude = 19.985507
				this.longitude = 110.383993
				this.scale = 10
				console.log(this.quyu.quyu)
				for (var k = 0; k < 3; k++) {
					var longhua1 = this.quyu.quyu[k].split(";")
					this.polyline.push({
						"points": [],
						arrowLine: false,
						width: 2,
						dottedLine: true,
						"color": "#1e3594"
					})
					for (var i = 0; i < longhua1.length; i++) {
						var longitude = longhua1[i]
						i++
						var latitude = longhua1[i]
						this.polyline[k].points.push({
							"latitude": latitude,
							"longitude": longitude
						})
					}
				}
				this.polyline = this.polyline
				this.covers1 = this.tianqi_covers
			},
			change() {
				this.list = []
				console.log(this.roadName.roadName[0])
				console.log(this.inputData)
				for (var i = 0; i < this.roadName.roadName.length; i++) {
					if (this.roadName.roadName[i].search(this.inputData) != -1 && this.inputData != "") {
						console.log("查到啦===")
						this.list.push({
							"id": i,
							"name": this.roadName.roadName[i]
						})
						this.flag = 1
					}
				}
				console.log(this.list)
				if (this.list.length == 0) {
					this.flag = 0
				}
			},
		}
	}
</script>

<style>

</style>
