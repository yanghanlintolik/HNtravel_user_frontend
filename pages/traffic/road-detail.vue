<template>
	<view>
		<cu-custom :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content"  style="display: flex;flex-direction: row;align-items: center; justify-content: center;" >
				<image style="width: 40upx;height: 40upx;"
					src="http://m.qpic.cn/psc?/V12eKFrM2hLmPp/45NBuzDIW489QBoVep5mceHXTFWcyYv6UyuR2LevA2NhsrL9Ku0ZsyCNOBb5dyQznjobb8NomC6FnpU4TyOsOJAQQ59*BSRwWL3*nUe95uQ!/b&bo=mgHaAZoB2gEDJwI!&rf=viewer_4">
				我的路线详情
				</image>
				</block>
		</cu-custom>
		<view class="flex justify-center align-center flex-direction" style="width: 100%;" :style="[{top:CustomBar + 'px'}]" >
			<view class="justify-center" style="width: 100%;">
				
				<view class="bg-white  padding radius border-shadow">
					<view class="flex align-center flex-between">
						<view class="flex-sub">
							<view class="flex align-center justify-between " :class="'text-'+themeColor.name" @click="handleMenu('/pages/traffic/index')">
								<text >{{start_place}}—{{end_place}}</text>
								<text class="cuIcon-deliver_fill" >重新规划</text> 
							</view>
							<view class="text-gray text-sm flex justify-between">
								路线时间：{{date}}  {{time}}
								<!-- <view class="text-gray text-sm">
									<text class="cuIcon-attentionfill margin-lr-xs">飞机</text> 	
								</view> -->
							</view>						
						</view>
					</view>
				</view>
			<!--  -->
				<map scale="13" style="width: 100%;height: 400upx;" :latitude="latitude" :longitude="longitude"
					:polyline="polyline" :markers="markers">
				</map>
				<view v-if="!flag && !flag1&&startMark">
					<view class="margin-tb-sm flex justify-start align-start bg-white padding"
						style=" flex-direction: row;">
						<view class="margin-left" style="width: 20%;">
							<text class="text-green" v-if="!!minute">{{hour}}小时{{minute}}分钟</text>
						</view>
						<scroll-view scroll-y="" class="margin-left flex-direction align-start solids-left padding-lr"
							style="height: 500upx;">
							<view v-for="(item,index) in station">
								<view v-if="item.disable===1" class="flex align-center" @click="clickroad(index)">
									<image v-if="item.type===2&&item.flag==1" src='../../static/jiaotong.png'
										class="image_view1"></image>
									<image v-else-if="item.type===1&&item.flag==1" src='../../static/gaotie.png'
										class="image_view1"></image>
									<image v-else-if="item.type===3&&item.flag==1" src="../../static/jipiao.png"
										class="image_view1"></image>
									<image v-else-if="item.type===4&&item.flag==1" src="../../static/xunhuan.png"
										class="image_view1"></image>
									<image v-else-if="item.type===5&&item.flag==1" src="../../static/car.png"
										class="image_view1"></image>
									<image class="image_view1" v-else></image>
									<text
										@click="change(index)">{{item.flag===1?item.place+" "+item.classNo:item.place}}</text>
								</view>
							</view>
						</scroll-view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import roadData from "../../data/roadData.js"
	import roadName from "../../data/roadData.js"
	import map_real from "../../components/map-realTime.vue"
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	import uCharts from '@/components/u-charts/u-charts.js';
	import gloalMixin from '@/mixins/global-minxin.js';
	import event from '@/common/event.js';
	import {
		isJSON
	} from '@/common/checker.js';
	var _self;
	var canvaLineA = null;

	export default {
		mixins: [gloalMixin],
		components: {
			map_real
		},
		data() {
			return {
				theList: [],
				flag_tai: false,
				roadData: roadData,
				roadName: roadName,
				city: "",
				startMark: false,
				markers: [],
				latitude: 0,
				longitude: 0,
				roadList: [],
				polyline: [],				
				activeTab: 0,
				guihua: false,
				id: '',
				road: "",
				all_row_time: [],
				row_time: "",
				time: "00:00",
				date: "2019-01-01",
				tongzhan: {
					"place": "换乘",
					"type": 4,
					"flag": 1,
					"disable": 1,
					"classNo": ""
				},
				butongzhan: {
					"place": "换乘",
					"type": 4,
					"flag": 1,
					"disable": 1,
					"classNo": ""
				},
				road_flag: null,
				flag: 0,
				flag1: 0,
				start_place: "",
				end_place: "",
				cWidth: '',
				cHeight: '',
				pixelRatio: 1,
				textarea: '',
				showItem: 0,
				all_time: 0,
				pH: 0, //窗口高度
				navHeight: 0, //元素的所需高度
				station: [],
				station1: [],
				hour: 0,
				minute: 0,
				methondflag: 0,
				str1: '',
				priority: 0,
			}
		},
		onReady() {
			let that = this;
			this.id = getApp().globalData.id
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
		},
		onLoad(options) {
			console.log(options.start_place);
			console.log(options.end_place);
			if (options.start_place != null) {
				this.start_place = options.start_place
				this.end_place = options.end_place
				this.date = options.date
				this.time = options.time
				this.priority = options.priority
				// this.city = options.city
				this.search()
				// this.search1()
			}
			uni.getLocation({
				type: 'gcj02',
				success: res => {
					this.longitude = res.longitude
					this.latitude = res.latitude
				}
			})
			// let date = new Date().toISOString().slice(0, 10)
			// this.date = date
			// let time = new Date().toString().slice(16, 21)
			// this.time = time
			// console.log(time)
			this.id = getApp().globalData.id
			console.log(this.id);
			
			
		},
		methods: {
			changeList() {
				this.theList = []
				console.log(this.roadName.roadName[0])
				console.log(this.road)
				for (var i = 0; i < this.roadName.roadName.length; i++) {
					if (this.roadName.roadName[i].search(this.road) != -1 && this.road != "") {
						console.log("查到啦===")

						this.theList.push({
							"id": i,
							"name": this.roadName.roadName[i]
						})
						this.flag_tai = 1
					}
				}
				if (this.theList.length == 0) {
					this.flag_tai = 0
				}
			},
			// 常用功能点击
			handleMenu(menuUrl) {
				uni.navigateTo({
					url: menuUrl
				})
			},
			search() {
				this.searchInit()
				uni.request({
					//外网可用
					// url: "http://47.106.207.183:32221/best_path?startPlace="+this.start_place+"&endPlace="+this.end_place,
					//内网http://192.168.1.130:8888/bestPath?startPlace=海大北门&endPlace=三亚&dateTime=2020-10-01 10:10
					url: "https://cyye.lbj.wiki/path/bestPath?startPlace=" + this.start_place + "&endPlace=" + this
						.end_place +
						"&dateTime=" + this.date + " " + this.time + "&priority=" + this.priority,
					success: (e) => {
						this.dealResult(e)
					},
					fail() {
						this.guihua = false
						uni.hideLoading()
					}

				})
			},
			searchInit() {
				this.hour = 0
				this.minute = 0
				this.all_time = 0
				this.guihua = true
				uni.showLoading({
					title: '加载中'
				})
			},
			dealResult(e) {
				this.guihua = false
				this.startMark = true
				uni.hideLoading()
				console.log(e.data)
				if (e.data.code == "1010") {
					uni.showModal({
						title: "暂无出行方案"
					})
				} else {
					this.roadList = e.data.result
					this.hour = 0
					this.minute = 0
					var alldata = []
					if (e.data.result == null) {
						alldata = e.data
					} else {
						alldata = e.data.result
					}
					console.log("allLength=" + e.data.length)
					this.station = alldata
					for (var i = 0; i < this.station.length; i++) {
						if (this.station[i].classNo === null) {
							this.station[i].classNo = ""
						}
					}
					for (var i = 0; i < this.station.length - 1; i++) {

						this.station[i].disable = 1
						this.all_time += this.station[i].timeNeed

						if (i == 0) {
							this.station[0].flag = 1
						} else if (this.station[i].type != this.station[i + 1].type) {
							console.log(i + 1)
							this.station[i + 1].flag = 1
							this.station[i].flag = 1
							this.station.splice(i + 1, 0, this.butongzhan)
							i++;
							console.log("1")
						} else if (this.station[i].classNo != this.station[i + 1].classNo) {
							console.log(this.station[i].classNo + " " + this.station[i].classNo)
							this.station[i + 1].flag = 1
							this.station[i].flag = 1
							this.station.splice(i + 1, 0, this.tongzhan)
							i++;
							console.log("2")
						} else {
							if (i + 1 == this.station.length - 1) {
								this.station[i + 1].flag = 1
								this.station[i + 1].disable = 1
							} else {
								this.station[i + 1].flag = 0
							}
							console.log("3")
						}

					}
					this.hour = parseInt(this.all_time / 60)
					this.minute = this.all_time % 60
					for (var n = 0; n < this.station.length; n++) {
						var if_c = 0;
						var count = 0;
						var end_j = 0;
						if (this.station[n].flag === 1) {
							for (var k = n; k < this.station.length; k++) {
								console.log("k: " + k)
								if (this.station[k].flag === 1) {
									if_c++;
									if (if_c == 2) {
										break;
									}
								} else {
									if (if_c == 1) {
										count++
									}
								}
							}
						}
						if (count > 0) {
							this.station.splice(n + 1, 0, {
								"place": this.station[n].classNo + " " + (count + 1) + "站",
								"disable": 1,
								"type": 6,
								"flag": 0,
								"classNo": ""
							})
							n++;
							for (var l = n + 1; l < n + 1 + count; l++) {
								this.station[l].disable = 0
							}
						}
					}
				}
				this.showmap()
			},
			change(e) {
				console.log(e)
				console.log(this.station)
				if (this.station[e].type === 6 && this.station[e].flag === 0) {
					console.log("看见========")
					this.$set(this.station[e], "flag", 1)

					while (this.station[++e].flag != 1) {

						this.$set(this.station[e], "disable", 1)

					}
					this.station = JSON.parse(JSON.stringify(this.station))
				} else if (this.station[e].type === 6 && this.station[e].flag === 1) {
					console.log("看不见========")
					this.$set(this.station[e], "flag", 0)

					while (this.station[++e].flag != 1) {
						this.$set(this.station[e], "disable", 0)

					}
					this.station = JSON.parse(JSON.stringify(this.station))
				}
			},	
			changeData() {
				if (isJSON(_self.textarea)) {
					let newdata = JSON.parse(_self.textarea);
					canvaLineA.updateData({
						series: newdata.series,
						categories: newdata.categories,
						scrollPosition: 'right',
						animation: false
					});
				} else {
					uni.showToast({
						title: '数据格式错误',
						image: '../../../static/images/alert-warning.png'
					})
				}
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
				for (var i = 0; i < this.roadList.length; i++) {
					if (i === 0 || i === this.roadList.length - 1) {
						this.markers.push({
							id: i,
							alpha: 0.6,
							anchor: {
								x: 1,
								y: 0
							},
							label: {
								content: this.roadList[i].place, //this.list1[i][1]
								color: '#0e0908',
								bgColor: '#e0e758',
								padding: 3,
								borderRadius: 4
							},
							width: 20,
							height: 20,
							latitude: this.roadList[i].latitude,
							longitude: this.roadList[i].longitude,
							iconPath: '../../static/yuandian.png'
						})
						// if(i===this.roadList.length-1){
						// 	this.markers.push({})
						// }
					}

					if (this.roadList[i].latitude != "" && this.roadList[i].latitude != null) {


						this.polyline[0].points.push({
							"latitude": this.roadList[i].latitude,
							"longitude": this.roadList[i].longitude
						})
						this.latitude = this.roadList[0].latitude
						this.longitude = this.roadList[0].longitude
					}

				}
			},
			clickroad(index) {
				if (this.markers[2] != null) {
					this.markers.pop()
				}
				if (this.roadList[index].latitude != null && this.roadList[index].latitude != "") {
					console.log(this.roadList[index].place)
					this.latitude = this.roadList[index].latitude,
						this.longitude = this.roadList[index].longitude,
						this.markers.push({
							id: index,
							alpha: 0.6,
							anchor: {
								x: 1,
								y: 0
							},
							label: {
								content: this.station[index].place, //this.list1[i][1]
								color: '#0e0908',
								bgColor: '#e0e758',
								padding: 3,
								borderRadius: 4
							},
							width: 20,
							height: 20,
							latitude: this.roadList[index].latitude,
							longitude: this.roadList[index].longitude,
							iconPath: '../../static/yuandian.png'
						})
					for (var i = 0; i < this.markers.length; i++) {
						console.log(this.markers[i].latitude)
					}
				}
			}
		},

	}
</script>

<style>
	.image_view1 {
		margin-right: 10upx;
		width: 50upx;
		height: 50upx;
	}

	.for_view {
		background-color: #FFFFFF;
		margin-left: 20upx;
		width: 100%;
		margin-top: 20upx;
		padding-bottom: 5upx;
		border-bottom: solid 1upx #efefef;
	}
</style>
