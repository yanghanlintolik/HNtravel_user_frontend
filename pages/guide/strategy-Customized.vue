<template>
	<view style="background-color: #FFFFFF;height: 100vh;width: 100%;">
		<cu-custom :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content"  style="display: flex;flex-direction: row;align-items: center; justify-content: center;" >
				<image style="width: 40upx;height: 40upx;"
					src="http://m.qpic.cn/psc?/V12eKFrM2hLmPp/45NBuzDIW489QBoVep5mceHXTFWcyYv6UyuR2LevA2NhsrL9Ku0ZsyCNOBb5dyQznjobb8NomC6FnpU4TyOsOJAQQ59*BSRwWL3*nUe95uQ!/b&bo=mgHaAZoB2gEDJwI!&rf=viewer_4">
				专属定制旅游计划
				</image>
				</block>
		</cu-custom>
		<view class="">
			<map :markers="markers" :circles="circles" scale="13" style="width: 100%;height: 800upx;" :latitude="latitude"
			 :longitude="longitude" :polyline="polyline" :scale="scale">
			</map>
		</view>
		<view style="width: 100%;background-color: #FFFFFF;padding: 20upx;">
			<view class="flex justify-between text-lg">
				<view class="flex justify-start" style="width: 60%;">
					<view class="flex align-center text-black">{{playDays}}天玩遍海口景点人气榜</view>
				</view>
				<view class="text-center flex justify-end">
					<button class="cu-btn round" :class="'bg-'+themeColor.name" v-if="ifsave===true" @click="savePlan()">
						<view class="cuIcon-text "></view>保存
					</button>
					<view style="display: flex;flex-direction: row;align-items: center;justify-content: flex-start;">
						<view style="font-size: 24upx;color: #A5673F;font-weight: bold;" class="uni-list-cell-db">消费欺诈</view>
						<switch style="margin-left: 5upx;" @change="relitu" />
					</view>
				</view>

			</view>
			<view class="flex justify-start align-center margin-top-sm">
				<view class="flex solids-right padding-right-sm align-center" style="height:40upx;">3天</view>
				<view class="flex align-center padding-left-sm">游玩{{(playDays)*2}}个观光点</view>
				<view class="cu-form-group  margin-tb-sm" v-if="ifsave===true">
					<text class="cuIcon-comment text-yellow"></text>
					<picker style="margin-left: 10upx;" mode="date" :value="date" @change="bindDateChange">
						<view class="uni-input">{{date}}</view>
					</picker>
				</view>
			</view>
			<view style="line-height: 50upx;background-color: #faf9fe;text-align: center;height: 50upx;width: 100%;font-size: 30upx;font-weight: bold;zcolor: #2a2117;">{{text}}</view>
			<scroll-view scroll-x class="bg-white nav margin-top-sm">
				<view class="flex text-center" v-if="tabflag">
					<view class="cu-item flex-sub" :class="index==TabCur?'cur text-'+themeColor.name:'text-gray'" v-for="(item,index) in tabName" :key="index"
					 @tap="tabSelect" :data-id="index">
						{{item.name}}
					</view>
				</view>
				<view class="flex text-center" v-else>
					<view class="cu-item flex-sub" :class="index==TabCur?'cur text-'+themeColor.name:'text-gray'" v-for="(item,index) in tabName1" :key="index"
					 @tap="tabSelect" :data-id="index">
						{{item.name}}
					</view>
				</view>
			</scroll-view>

			<view class="flex">
				<scroll-view scroll-x class="flex bg-white nav padding-bottom-sm align-center" enable-flex="true"
				 scroll-with-animation>
					<view style="display: flex;flex-direction: row;align-items: center;justify-content: flex-start;width: 100%;height: 200upx;">

						<!-- D1或者是----------- -->
						<view class="text-blue flex align-center" style="width: 10%">D1</view>
						<view v-for="(item,index) in scenicList" style="width: 500upx; height: 140upx;display: flex;flex-direction: row;align-items: center;justify-content: flex-start;">
							<view @click="menu(index)" style="border-radius: 10upx;display: flex;flex-direction: row;align-items: center;justify-content: flex-start;padding: 10upx;width: 100%;height: 100%;border: solid 1upx #C1C1C1;"
							 v-if="item.length===5">
								<image class="radius-lg flex align-center" style="width:120upx; height: 120upx;" :src="item[3]"></image>
								<view style="margin-left: 10upx;display: flex;flex-direction: column;align-items: flex-start;justify-content: flex-start;width:240upx ;height: 120upx;">
									<view class="flex justify-between" style="width: 100%;">
										<view style="font-size: 25upx;width: 180upx;overflow: hidden;text-overflow: ellipsis;">{{item[0]}}</view>
										<view style="font-size: 30upx;color: #0096D8;font-weight: bold;">{{index+1}}</view>
									</view>
									<view style="font-size: 20upx;" class="flex align-center text-green">评分:{{item[2]}}</view>
									<view style="font-size: 20upx;" class="flex align-center text-green">位置:{{item[1]}}</view>
								</view>
							</view>
							<view @click="menu(index)" style="border-radius: 10upx;display: flex;flex-direction: row;align-items: center;justify-content: flex-start;padding: 10upx;width: 100%;height: 100%;border: solid 1upx #C1C1C1;"
							 v-else>
								<image class="radius-lg flex align-center" style="width:120upx; height: 120upx;" :src="item[2]"></image>
								<view style="margin-left: 10upx;display: flex;flex-direction: column;align-items: flex-start;justify-content: flex-start;width: 240upx;height: 120upx;">
									<view class="flex justify-between" style="width: 100%;">
										<view style="font-size: 25upx;width: 180upx;overflow: hidden;text-overflow: ellipsis;">{{item[0]}}</view>
										<view style="font-size: 30upx;color: #0096D8;font-weight: bold;">{{index+1}}</view>
									</view>
									<view style="font-size: 20upx;" class="flex align-center text-green">评分:{{item[4]}}</view>
									<view style="width: 180upx;overflow: hidden;text-overflow: ellipsis;font-size: 20upx;" class="flex align-center text-green">时间:{{item[5]}}</view>
								</view>
							</view>
							<view v-if="index<scenicList.length-1" @click="toLuxian(index)" style="display: flex;flex-direction: column;align-items: center;justify-content: center;background-color: #FFFFFF;width: 100upx;height: 30upx;border-bottom:solid 2upx #007AFF ;">
								<text style="font-size: 20upx;">路线导航</text>
							</view>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>

		<view v-if="clickindex!=-1" style="box-shadow:2px 2px 2px #bfbfbf ;border-top:solid 1upx #bfbfbf;border-top-left-radius: 20upx;border-top-right-radius: 10upx;width: 100%;height: 320upx;position: absolute;bottom: 0;z-index: 100;display: flex;flex-direction: column;align-items: center;justify-content: flex-start;background-color: #FFFFFF;">
			<block v-for="(item,index) in tabS">
				<text @click="selectTab(index)" class="solid-bottom" style="margin-top: 2upx;padding: 10upx;width: 100%;text-align: center;font-size: 30upx;">{{item}}</text>
			</block>
		</view>
	</view>
</template>

<script>
	import gloalMixin from '@/mixins/global-minxin.js'
	export default {
		mixins:[gloalMixin],
		
		data() {
			return {
				clickindex: -1,
				tabS: ["景点攻略", "景区客流", "3D导览", "地图导航", "取消"],
				scale: 10,
				circles: [],
				date: "",
				saveRoad: "",
				saveCityDate:"",
				polyline: [],
				latitude: 0,
				longitude: 0,
				firstDay: [],
				pH: 0,
				id: 0, // 使用 marker点击事件 需要填写id
				title: 'map',
				latitude: 20.04102,
				longitude: 110.18724,
				polyline: [],
				TabCur: 0,
				tabflag: true,
				scrollLeft: 0,
				tabName: [{
						name: "第一天"
					},
					{
						name: "第二天"
					},
					{
						name: "第三天"
					}
				],
				tabName1: [{
						name: "第一天"
					},
					{
						name: "第二天"
					},
					{
						name: "第三天"
					},
					{
						name: "第四天"
					},
					{
						name: "第五天"
					}
				],
				text: "",
				strategyList: [],
				playDays: 0,
				scenicName: [],
				allList: {},
				list: [{
					name: 'lalal'
				}],
				markers: [],
				scenicList: [],
				ifsave: true
			}
		},

		onLoad(options) {
			uni.showLoading({
				title:'加载中...'
			})
			this.text = options.text
			let date = new Date().toISOString().slice(0, 10)
			this.date = date
			this.ifsave = options.ifsave
			this.strategyList = getApp().globalData.strategyList
			
			for (var i = 0; i < this.strategyList.length; i++) {
				if (i < this.strategyList.length - 1) {
					this.scenicName += "\"" + this.strategyList[i][0] + "\"" + ","
				} else {
					this.scenicName += "\"" + this.strategyList[i][0] + "\""
				}


			}
			uni.request({
				url: "https://cyye.lbj.wiki/strategy1/sight_road_strategy/" + "[" + this.scenicName + "]",
				success: res => {
					this.allList = JSON.parse(JSON.stringify(res.data))
					this.firstDay = this.allList.data[0].path
					this.playDays = this.allList.data.length
					if (this.playDays === 3) {
						this.tabflag = true
					} else {
						this.tabflag = false
					}
					let first = []
					for (var i = 0; i < this.firstDay.length; i++) {
						if (i === 0) {
							first.push(this.firstDay[i].startPlace)
						}
						if (first.indexOf(this.firstDay[i].endPlace) === -1) {
							first.push(this.firstDay[i].endPlace)
						}
					}
					
					for (var i = 0; i < first.length; i++) {
						if ((first[i].substring(first[i].length - 2, first[i].length)) == '酒店' || first[i].substring(first[i].length -
								2, first[i].length) == "公寓") {
							for (var j = 0; j < this.allList.data1.length; j++) {
								if (first[i] === this.allList.data1[j][0]) {
									//this.allList.data1[j].push()
									this.scenicList.push(this.allList.data1[j])
								}
							}
						} else {
							for (var j = 0; j < this.strategyList.length; j++) {
							
								if (first[i] === this.strategyList[j][0]) {
									this.scenicList.push(this.strategyList[j])
								}
							}
						}
					}
					this.showmap()
					uni.hideLoading()
					var allList1=this.allList.data
					for (var i = 0; i < allList1.length; i++) {
						for (var j = 0; j < allList1[i].path.length; j++) {	
								var date = new Date(this.date.split("-")[0],this.date.split("-")[1],this.date.split("-")[2]);
								//这里的60就是你要加的天数，减也可以。年、月会相应加上去，值得注意的是date.getMonth()得到的月份比实际月份小1，所以实际月份是(date.getMonth()+1)
								date.setDate(date.getDate() + i);
								let date1 = date.getFullYear() +"-"+ (date.getMonth().toString().padStart(2,'0')) +"-"+ date.getDate().toString().padStart(2,'0');
								this.saveRoad += allList1[i].path[j].startPlace + "-" + allList1[i].path[j].endPlace + ","
								this.saveCityDate += date1 + "=" + allList1[i].path[j].city + ","	
								console.log(date1)
						}
					}
					this.saveRoad=this.saveRoad.substring(0,this.saveRoad.length-1)
					this.saveCityDate=this.saveCityDate.substring(0,this.saveCityDate.length-1)
					

				}
			})
		},
		onReady() {
			uni.getSystemInfo({ //调用uni-app接口获取屏幕高度
				success: res => { //成功回调函数
					this.pH = res.screenHeight //windoHeight为窗口高度，主要使用的是这个

				}
			})
		},
		methods: {
			relitu(e) {
				if (e.target.value === true) {
					this.scale = 8
					uni.getLocation({
						type: 'wgs84',
						success: res => {
							this.latitude = res.latitude
							this.longitude = res.longitude
						}
					})
					uni.request({
						url: "http://30a5u18070.imdo.co/get_data",
						success: e => {
							for (var i = 0; i < e.data.length; i++) {
								this.circles.push({
									"latitude": e.data[i].lat,
									"longitude": e.data[i].lng,
									"fillColor": "#fd6912AA",
									"color": "#DC143CAA",
									"radius": e.data[i].count * 1000,
									"strokeWidth": 5
								})

							}
							
						}
					})
				} else {
					this.scale = 10
					this.circles = []
				}

			},
			toLuxian(index) {

				uni.navigateTo({
					url: "../traffic/index?start=" + this.scenicList[index][0] + "&end=" + this.scenicList[index + 1][0] + "&city=" +
						this.scenicList[index + 1][6]
				})
			},
			menu(index) {
				
				this.clickindex = index
			},
			selectTab(index) {
				if (index === 0) {
					uni.navigateTo({
						url: "../guide/scenicLine?name=" + this.scenicList[this.clickindex][0]
					})
				}
				if (index === 1) {
					uni.navigateTo({
						url: "../passengerFlow/lineChart?name=" + this.scenicList[this.clickindex][0]
					})
				}
				if (index === 2) {
					uni.navigateTo({
						url: "../index/virtual?name=" + this.scenicList[this.clickindex][0]
					})
				}
				if (index === 3) {
					this.tomap(this.clickindex)
				}
				if (index === 4) {
					this.clickindex = -1
				}

			},
			tomap(i) {

				uni.getLocation({
					type: 'gcj02', //返回可以用于uni.openLocation的经纬度
					success: res => {
						const latitude = res.latitude;
						const longitude = res.longitude;
						let longitude1 = parseFloat(this.scenicList[i][0].substring(this.scenicList[i][0].length - 2, this.scenicList[
								i][0].length) ===
							"酒店" || this.scenicList[i][0].substring(this.scenicList[i][0].length - 2, this.scenicList[i][0].length) ===
							"公寓" ?
							this.scenicList[i][4].split(",")[0] : this.scenicList[i][3].split(",")[0])
						let latitude1 = parseFloat(this.scenicList[i][0].substring(this.scenicList[i][0].length - 2, this.scenicList[i]
								[0].length) ===
							"酒店" || this.scenicList[i][0].substring(this.scenicList[i][0].length - 2, this.scenicList[i][0].length) ===
							"公寓" ?
							this.scenicList[i][4].split(",")[1] : this.scenicList[i][3].split(",")[1])

						uni.openLocation({
							latitude: latitude1,
							longitude: longitude1,
							scale: 18,
							success: e => {
							
							}
						})
					}
				});
			},
			savePlan() {
				console.log("-----------------------------")
				if (getApp().globalData.id != null) {
					let str = ""

					for (var i = 0; i < getApp().globalData.strategyList.length; i++) {
						if (i < getApp().globalData.strategyList.length - 1) {
							str += getApp().globalData.strategyList[i][0] + ","

						} else {
							str += getApp().globalData.strategyList[i][0]

						}
					}
					uni.showLoading({
						title: "保存中..."
					})
					uni.request({
						url: "https://cyye.lbj.wiki/strategy1/save_road_strategy/" + getApp().globalData.id + "/" + str + "/" + getApp()
							.globalData.travelcity + "/" + getApp().globalData.travelday + "/" + this.date,
						success: res => {
							if (res.data === "保存出行规划成功") {
								uni.hideLoading(),
									uni.showToast({
										title: "保存成功"
									})
								console.log(this.saveRoad)
								console.log(this.saveCityDate)
								uni.request({
									url: getApp().globalData.globalUrl+"/zqd/plan/saveRoad?userId=" + getApp().globalData.id + "&scenic=" + this.saveRoad +
										"&scenicCity=" + this.saveCityDate,
									success: res => {
										
									}
								})
							}
							else {
								uni.hideLoading()
								uni.showModal({
									content: "请登录或已经在该天存在攻略",
							
									success: function(res) {
										if (res.confirm) {
											uni.switchTab({
												url: "../me/index"
											})
										} else if (res.cancel) {
											console.log('用户点击取消');
										}
									}
								})
							}
						}
					})
					

				} else {
					uni.hideLoading()
					uni.showModal({
						content: "请登录或已经在该天存在攻略",

						success: function(res) {
							if (res.confirm) {
								uni.switchTab({
									url: "../me/index"
								})
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					})
				}

			},
			bindDateChange: function(e) {
				this.date = e.target.value
				var allList1=this.allList.data
				for (var i = 0; i < allList1.length; i++) {
					for (var j = 0; j < allList1[i].path.length; j++) {	
							var date = new Date(this.date.split("-")[0],this.date.split("-")[1],this.date.split("-")[2]);
							//这里的60就是你要加的天数，减也可以。年、月会相应加上去，值得注意的是date.getMonth()得到的月份比实际月份小1，所以实际月份是(date.getMonth()+1)
							date.setDate(date.getDate() + i);
							let date1 = date.getFullYear() +"-"+ (date.getMonth()) +"-"+ date.getDate();
							this.saveRoad += allList1[i].path[j].startPlace + "-" + allList1[i].path[j].endPlace + ","
							this.saveCityDate += date1 + "=" + allList1[i].path[j].city + ","	
							console.log(date1)
					}
				}
				this.saveRoad=this.saveRoad.substring(0,this.saveRoad.length-1)
				this.saveCityDate=this.saveCityDate.substring(0,this.saveCityDate.length-1)
				
			},
			showmap() {
				this.markers = []
				this.polyline = []
				this.polyline.push({
					"points": [],
					"arrowLine": false,
					"width": 3,
					"color": "#6f72f7"
				})
				for (var i = 0; i < this.scenicList.length; i++) {
					var longitude = this.scenicList[i][0].substring(this.scenicList[i][0].length - 2, this.scenicList[i][0].length) ===
						"酒店" || this.scenicList[i][0].substring(this.scenicList[i][0].length - 2, this.scenicList[i][0].length) === "公寓" ?
						this.scenicList[i][4].split(",")[0] : this.scenicList[i][3].split(",")[0]
					var latitude = this.scenicList[i][0].substring(this.scenicList[i][0].length - 2, this.scenicList[i][0].length) ===
						"酒店" || this.scenicList[i][0].substring(this.scenicList[i][0].length - 2, this.scenicList[i][0].length) === "公寓" ?
						this.scenicList[i][4].split(",")[1] : this.scenicList[i][3].split(",")[1]
					this.markers.push({
						id: i,
						alpha: 0.6,
						anchor: {
							x: 1,
							y: 0
						},
						label: {
							content: i + 1, //this.list1[i][1]
							color: '#0e0908',
							bgColor: '#e0e758',
							padding: 3,
							borderRadius: 4
						},
						width: 20,
						height: 20,
						latitude: latitude,
						longitude: longitude,
						iconPath: '../../static/yuandian.png'
					})
					this.latitude = latitude
					this.longitude = longitude
					this.polyline.push({
						"points": [],
						"arrowLine": false,
						"width": 3,
						"color": "#6f72f7"
					})

					this.polyline[0].points.push({
						"latitude": latitude,
						"longitude": longitude
					})

				}
				console.log(this.markers)
			},
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
				this.dataChange(e.currentTarget.dataset.id)
			},
			dataChange(index) {
				this.scenicList = []
				this.firstDay = this.allList.data[index].path
				let first = []
				for (var i = 0; i < this.firstDay.length; i++) {
					if (i === 0) {
						first.push(this.firstDay[i].startPlace)
					}
					if (first.indexOf(this.firstDay[i].endPlace) === -1) {
						first.push(this.firstDay[i].endPlace)
					}
				}
				for (var i = 0; i < first.length; i++) {
					if ((first[i].substring(first[i].length - 2, first[i].length)) == '酒店' || first[i].substring(first[i].length - 2,
							first[i].length) == "公寓") {
						for (var j = 0; j < this.allList.data1.length; j++) {
							if (first[i] === this.allList.data1[j][0]) {
								this.scenicList.push(this.allList.data1[j])
							}
						}
					} else {
						for (var j = 0; j < this.strategyList.length; j++) {
							if (first[i] === this.strategyList[j][0]) {
								this.scenicList.push(this.strategyList[j])
							}
						}
					}
				}
				this.showmap()
			}
		}
	}
</script>

<style>

</style>
