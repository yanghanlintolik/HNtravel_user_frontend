<template>
	<view>
		<view class="bg-white nav border-shadow " style="position:fixed;top: 0upx; width: 100%;z-index: 1000;">
			<cu-custom :isBack="true">
				<block slot="backText">返回</block>
				<block slot="content"  style="display: flex;flex-direction: row;align-items: center; justify-content: center;" >
					<image style="width: 40upx;height: 40upx;"
						src="http://m.qpic.cn/psc?/V12eKFrM2hLmPp/45NBuzDIW489QBoVep5mceHXTFWcyYv6UyuR2LevA2NhsrL9Ku0ZsyCNOBb5dyQznjobb8NomC6FnpU4TyOsOJAQQ59*BSRwWL3*nUe95uQ!/b&bo=mgHaAZoB2gEDJwI!&rf=viewer_4">
					出行规划
					</image>
					</block>
			</cu-custom>
			<view class="flex text-center">
				<view class="cu-item flex-sub cur" :class="index == activeTab?'text-'+themeColor.name:'text-gray'"
					v-for="(tab,index) in tabList" :key="index" @click="tabSelect(index)" :data-id="index">
					{{tab.name}}
				</view>
			</view>
		</view>
		<!-- <scroll-view :style="{height:navHeight+'px'} " scroll-y="" class="scroll" style="margin-top: 180upx;"> -->
		<view class="flex justify-center align-center flex-direction" style="width: 100%;margin-top: 220upx;">
			<!-- <view class="cu-bar margin-top bg-white solid-bottom">
				<button class="cu-btn round text-xs light" :class="'bg-'+themeColor.name">保存路线</button>
				<button class="cu-btn round text-xs light" :class="'bg-'+themeColor.name">查看路线</button>
			</view> -->

			<view v-if="activeTab==0" class="justify-center" style="width: 100%;">
				<view class="bg-white padding radius-lg"
					style="flex-direction: row;padding-left: 60upx;padding-right: 60upx;">
					<view class="flex" style="width: 100%;">
						<view class="flex flex-direction" style="width: 100%;">
							<view class="flex align-center">
								<view class="text-green margin-right">从</view>
								<input @input="startName()" class="solids-bottom" v-model="start_place"
									placeholder="请输入起始地点" />
							</view>
							<view class="flex align-center margin-tb-sm">
								<view class="text-red margin-right">到</view>
								<input @input="endName()" class="solids-bottom" v-model="end_place"
									placeholder="请输入终止地址" />
							</view>
						</view>
						<view class="flex align-center cuIcon-order text-black justify-end" style="font-size: 40upx;"
							@click="change_road()"></view>
					</view>
					<view class="flex" style="width: 80%;">
						<view class="flex align-center cuIcon-time text-blue text-xxl"></view>
						<view class="margin-left solids-bottom" style="width: 50%;">
							<picker mode="date" :value="date" @change="bindDateChange">
								<view class="text-lg text-grey">{{date}}</view>
							</picker>
						</view>
						<view class="margin-left solids-bottom" style="width: 40%;">
							<picker mode="time" :value="time" @change="bindTimeChange">
								<view class="text-lg text-grey">{{time}}</view>
							</picker>
						</view>
					</view>
					<view class="padding-top-sm flex justify-between">
						<view @click="handleMenu('/pages/traffic/road-list')" :class="'text-'+ themeColor.name">
							<text class="cuIcon-title "></text>
							<text class="text-sm">查看已保存的路线</text>
						</view>
						<view class="cu-btn sm round" :class="'bg-'+ themeColor.name" v-if="button_content == '重新规划'"
							@click="saveRoad()">
							<text class="cuIcon-file"></text>
							<text class="text-sm margin-left-sm">保存路线</text>
						</view>
					</view>
				</view>

				<!-- 单选出行方式 -->
				<view class="flex justify-between bg-white padding margin-top-sm">
					<view class="flex align-center" :class="'text-'+ themeColor.name" style="flex-direction:row;">
						<view class="cuIcon-titles text-xxl">优先：</view>
					</view>
					<view @click="methond_changed(index)" v-for="(item, index) in itemsWay">
						<text :class="item.flag==true?'bg-blue padding radius-lg':'text-gray'">{{item.name}}</text>
					</view>
				</view>

				<!-- 地址选择提示 -->
				<view class="margin-top-sm bg-white text-lg" style="height: 100%;" v-if="flag">
					<scroll-view style="height: 100%;" scroll-y>
						<view @click="clickstart(index)" class="margin-sm solid-bottom"
							v-for="(item,index) in startlist">
							<text class="text-gray">{{item}}</text>
						</view>
					</scroll-view>
				</view>
				<view class="margin-top-sm bg-white text-lg" style="height: 100%;" v-if="flag1">
					<scroll-view style="height: 100%;" scroll-y>
						<view @click="clickend(index)" class="margin-sm solid-bottom" v-for="(item,index) in endlist">
							<text class="text-gray">{{item}}</text>
						</view>
					</scroll-view>
				</view>
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
				<button v-if="!flag && !flag1" :class="'bg-'+ themeColor.name" style="width: 100%;" :disabled="guihua"
					:style="!guihua?'':'bg-gray'" @click="search">{{button_content}}</button>
			</view>
			<view v-if="activeTab==1" class="justify-center" style="width: 100%;">
				<view class="bg-white  padding " style="width: 100%;">

					<input @input="changeList()" style="width: 80%;" v-model="road" class="solids-bottom"
						placeholder="请输入道路名称" />

					<view style="width: 80%;" class="flex justify-between align-center margin-top-sm solids-bottom">
						<text :class="'text-'+ themeColor.name">选择日期</text>
						<picker mode="date" :value="date" @change="bindDateChange">
							<view>{{date}}</view>
						</picker>
						<picker mode="time" :value="time" @change="bindTimeChange">
							<view>{{time}}</view>
						</picker>
						<view @click="yuce" class="cuIcon-search " :class="'text-'+ themeColor.name"
							style="font-size: 40upx;"></view>
					</view>
				</view>
				<view v-if="flag_tai" style="background-color: #FFFFFF;">
					<scroll-view class="scroll" scroll-y>
						<view @click="confir(index)" class="for_view" v-for="(item,index) in theList">
							<text class="text1">{{item.name}}</text>
						</view>
					</scroll-view>
				</view>
				<map_real :roadData="roadData" :roadName="roadName" ref="child" style="width: 100%;height: 300upx;">
				</map_real>
				<view class="bg-white" style="width: 750upx;margin-top: 20upx;">
					<canvas canvas-id="canvasLineA" id="canvasLineA" :width="cWidth*pixelRatio"
						:height="cHeight*pixelRatio" :style="{'width':cWidth+'px','height':cHeight+'px'}"
						disable-scroll=true @touchstart="touchLineA" @touchmove="moveLineA"
						@touchend="touchEndLineA"></canvas>
				</view>

				<!-- 流量预测与实时路况 -->

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
	import gloalMixin from '@/mixins/global-minxin.js'
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
				cuIconList: [{
					cuIcon: 'location',
					color: 'orange',
					name: '实施路况',
					url: './map-forecast'
				}],
				tabList: [{
						index: 0,
						name: '交通规划'
					},
					{
						index: 1,
						name: '交通态势感知'
					}
				],
				activeTab: 0,
				guihua: false,
				id: '',
				button_content: "开始规划",
				startlist: [],
				endlist: [],
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
				data: [0, 0, 0, 0, 0, 0, 0],
				data1: [0, 0, 0, 0, 0, 0],
				methondflag: 0,
				itemsWay: [{
						value: '飞机',
						name: '飞机',
						flag: false
					},
					{
						value: '火车',
						name: '火车',
						flag: false
					},
					{
						value: '高铁',
						name: '高铁',
						flag: false
					},
					{
						value: '高速',
						name: '高速',
						flag: false
					},
					{
						value: '国道',
						name: '国道',
						flag: false
					}
				],

				str1: '',
				traffic_classification: '',

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
			if (options.start != null) {
				this.start_place = options.start
				this.end_place = options.end
				this.city = options.city
				this.search1()
			}
			uni.getLocation({
				type: 'gcj02',
				success: res => {
					this.longitude = res.longitude
					this.latitude = res.latitude
				}
			})
			let date = new Date().toISOString().slice(0, 10)
			this.date = date
			let time = new Date().toString().slice(16, 21)
			this.time = time
			console.log(time)
			this.id = getApp().globalData.id
			console.log(this.id);
			this.row_time1 = this.getTime()
			this.row_time = this.getTime()
			for (var i = 4; i > -1; i--) {
				this.all_row_time[i] = this.getrowTime1(this.row_time)
				this.row_time = this.getrowTime1(this.row_time)
			}
			this.all_row_time[5] = this.row_time1
			for (var i = 6; i < 7; i++) {
				this.all_row_time[i] = this.getrowTime(this.row_time1)
				this.row_time1 = this.getrowTime(this.row_time1)
			}
			console.log()
		},
		methods: {
			saveRoad() {
				console.log("-----------------------------")
				if (getApp().globalData.id != null) {
					uni.showLoading({
						title: "保存中..."
					})
					uni.request({
						url: getApp().globalData.globalUrl + "/zqd/userRoad/insert",
						method: 'POST',
						data: {
							'userId': getApp().globalData.id,
							'roadData': this.start_place + "&" + this.end_place + "&" + this
								.traffic_classification,
							'date': this.date + ' ' + this.time,

						},
						success: res => {
							uni.$emit(event.REFRESH_GENERAL_ROAD_LIST);
							uni.hideLoading(),
								uni.showToast({
									title: "保存成功"
								})
						}
					})
				} else {
					uni.showModal({
						content: "请登录",

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
			confir(index) {
				this.flag_tai = 0
				this.road = this.theList[index].name
				this.road_flag = this.theList[index].id
			},
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
			// 顶部tab切换
			tabSelect(index) {
				this.activeTab = index;
				if (this.activeTab == 1) {
					_self = this;
					//#ifdef MP-ALIPAY
					uni.getSystemInfo({
						success: function(res) {
							if (res.pixelRatio > 1) {
								//正常这里给2就行，如果pixelRatio=3性能会降低一点
								//_self.pixelRatio =res.pixelRatio;
								_self.pixelRatio = 2;
							}
						}
					});
					//#endif
					this.cWidth = uni.upx2px(750);
					this.cHeight = uni.upx2px(500);
					this.getServerData();
				}
			},
			change_road() {
				var road = this.start_place
				this.start_place = this.end_place
				this.end_place = road
			},

			clickstart(index) {
				this.start_place = this.startlist[index]
				this.flag = 0
			},
			startName() {
				if (this.start_place != "") {
					uni.showLoading({
						title: '加载中'
					})
					this.flag = 1
					uni.request({
						url: "https://cyye.lbj.wiki/path/associate?place=" + this.start_place,
						success: res => {
							if (res.data.result.length > 0) {
								uni.hideLoading()
								console.log(res.data)
								this.startlist = Array.from(new Set(res.data.result))
							} else {
								this.flag = 0
							}
						}
					})
				} else {
					this.flag = 0
				}
			},

			clickend(index) {
				this.end_place = this.endlist[index]
				this.flag1 = 0
			},
			endName() {
				if (this.end_place != "") {
					uni.showLoading({
						title: '加载中'
					})
					this.flag1 = 1
					uni.request({
						url: "https://cyye.lbj.wiki/path/associate?place=" + this.end_place,
						success: res => {
							if (res.data.result.length > 0) {
								uni.hideLoading()

								this.endlist = Array.from(new Set(res.data.result))
							} else {
								this.flag = 0
							}
						}
					})
				} else {
					this.flag1 = 0
				}
			},
			back() {
				uni.navigateBack({
					delta: 1
				})
			},
			getrowTime(time) {
				var time1 = [],
					time1 = time.toString().split(":")
				var hour = parseInt(time1[0])
				var minute = parseInt(time1[1])
				if (50 - minute > 0) {
					minute = minute + 10
					return hour.toString() + ":" + minute.toString()
				} else {
					minute = minute - 50
					hour = hour + 1
					return hour.toString() + ":0" + minute.toString()
				}

			},
			getrowTime1(time) {
				var time1 = [],
					time1 = time.toString().split(":")
				var hour = parseInt(time1[0])
				var minute = parseInt(time1[1])
				if (minute > 10 && minute < 20) {
					minute = minute - 10
					return hour.toString() + ":0" + minute.toString()
				} else if (minute >= 20) {
					minute = minute - 10
					return hour.toString() + ":" + minute.toString()
				} else {
					minute = minute
					hour = hour - 1
					return hour.toString() + ":5" + minute.toString()
				}

			},
			getTime() {
				var date = new Date(),
					year = date.getFullYear(),
					month = date.getMonth() + 1,
					day = date.getDate(),
					hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours(),
					minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes(),
					second = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
				month >= 1 && month <= 9 ? (month = "0" + month) : "";
				day >= 0 && day <= 9 ? (day = "0" + day) : "";
				var timer = hour + ':' + minute
				return timer;
			},
			yuce() {
				console.log(this.road_flag)
				this.$refs.child.show(this.road_flag);
				var road1 = []
				road1 = this.road.split("->")
				var roadName = road1[0] + ":" + road1[1] + "," + road1[2]
				roadName = roadName.toString()
				console.log(roadName + " " + this.date + " " + this.time + ":00")
				uni.request({
					url: 'https://cyye.lbj.wiki/jtyc/' + roadName + "/" + this.date + " " + this.time +
						":00", //仅为示例，并非真实接口地址。
					success: (res) => {
						for (var i = 0; i < 7; i++) {
							this.data[i] = parseFloat(res.data[i]).toFixed(2)
							if (i < 6) {
								this.data1[i] = parseFloat(res.data[i]).toFixed(2)
							}
						}

						this.row_time1 = this.getTime()
						this.row_time = this.getTime()
						for (var i = 4; i > -1; i--) {
							this.all_row_time[i] = this.getrowTime1(this.row_time)
							this.row_time = this.getrowTime1(this.row_time)
						}
						this.all_row_time[5] = this.row_time1
						for (var i = 6; i < 7; i++) {
							this.all_row_time[i] = this.getrowTime(this.row_time1)
							this.row_time1 = this.getrowTime(this.row_time1)
						}
						this.show3();
					}
				})
			},
			bindDateChange: function(e) {
				this.date = e.target.value
			},
			bindTimeChange: function(e) {
				this.time = e.target.value

			},
			search1() {
				let jsondata = JSON.parse('{"data":[{"date": "' + "2021-3-11" + '", "path": [{"startPlace": "' + this
					.start_place +
					'", "endPlace": "' + this.end_place + '", "stayTime": 180, "city": "海口市"}]}]}')
				console.log(jsondata)
				console.log(JSON.stringify(jsondata))
				this.searchInit()
				uni.request({
					url: "https://cyye.lbj.wiki/spot/getPath",
					data: {
						'date1': this.date,
						'startPlace1': this.start_place,
						'endPlace1': this.end_place,
						'stayTime1': "180",
						'city1': this.city
					},
					method: 'POST',
					success: (e) => {

						Object.keys(e.data.result).forEach(key => {
							var value = []
							value = e.data.result[key];
							var map = {
								"data": {
									"result": value,
									"code": e.data.code
								}
							}

							this.dealResult(map)
						});
					},
					fail() {
						this.guihua = false
						uni.hideLoading()
					}

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
						"&dateTime=" + this.date + " " + this.time + "&priority=" + this.traffic_classification,
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
					this.button_content = "重新规划"
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
			show1() {
				this.showItem = 0;
			},
			show2() {
				this.showItem = 1;
			},
			show3() {
				this.showItem = 2;
				_self = this;
				//#ifdef MP-ALIPAY
				uni.getSystemInfo({
					success: function(res) {
						if (res.pixelRatio > 1) {
							//正常这里给2就行，如果pixelRatio=3性能会降低一点
							//_self.pixelRatio =res.pixelRatio;
							_self.pixelRatio = 2;
						}
					}
				});
				//#endif
				this.cWidth = uni.upx2px(750);
				this.cHeight = uni.upx2px(500);
				this.getServerData();
			},


			getServerData() {

				let LineA = {
					categories: [],
					series: []
				};
				//这里我后台返回的是数组，所以用等于，如果您后台返回的是单条数据，需要push进去
				LineA.categories = this.all_row_time
				LineA.series = [{
					"name": "预测值",
					"data": this.data
				}, {
					"name": "真实值",
					"data": this.data1
				}];
				_self.textarea = JSON.stringify(LineA);
				_self.showLineA("canvasLineA", LineA);

			},
			showLineA(canvasId, chartData) {
				canvaLineA = new uCharts({
					$this: _self,
					canvasId: canvasId,
					type: 'line',
					fontSize: 11,
					padding: [15, 15, 0, 15],
					legend: {
						show: true,
						padding: 5,
						lineHeight: 11,
						margin: 5,
					},
					dataLabel: true,
					dataPointShape: true,
					dataPointShapeType: 'hollow',
					background: '#FFFFFF',
					pixelRatio: _self.pixelRatio,
					categories: chartData.categories,
					series: chartData.series,
					animation: true,
					enableScroll: true, //开启图表拖拽功能
					xAxis: {
						disableGrid: false,
						type: 'grid',
						gridType: 'dash',
						itemCount: 5,
						scrollShow: true,
						scrollAlign: 'left'
					},
					yAxis: {
						//disabled:true
						gridType: 'dash',
						splitNumber: 4,
						min: 0,
						max: 4,
						format: (val) => {
							return val.toFixed(0)
						} //如不写此方法，Y轴刻度默认保留两位小数
					},
					width: _self.cWidth * _self.pixelRatio,
					height: _self.cHeight * _self.pixelRatio,
					extra: {
						line: {
							type: 'straight'
						}
					},
				});

			},
			touchLineA(e) {
				canvaLineA.scrollStart(e);
			},
			moveLineA(e) {
				canvaLineA.scroll(e);
			},
			touchEndLineA(e) {
				canvaLineA.scrollEnd(e);
				//下面是toolTip事件，如果滚动后不需要显示，可不填写
				canvaLineA.touchLegend(e);
				canvaLineA.showToolTip(e, {
					format: function(item, category) {
						return category + ' ' + item.name + ':' + item.data
					}
				});
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

			////单选出行方式
			methond_changed(index) {
				if (this.itemsWay[index].flag == false) {
					this.itemsWay[this.methondflag].flag = false
					this.itemsWay[index].flag = true
					this.methondflag = index
				} else {
					this.itemsWay[index].flag = false
					this.methondflag = index
				}
				this.traffic_classification = index

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
			/////////////////////////////////
			// chooseMaleLike2: function(e) {
			// 	var flag = 2;
			// 	var items2 = this.items2,
			// 		values = e.detail.value;
			// 	for (var i = 0, lenI = items2.length; i < lenI; ++i) {
			// 		const item2 = items2[i]
			// 		this.$set(item2, 'disabled', false)
			// 		if (values.includes(item2.value)) {
			// 			flag++;
			// 			if (flag > 3) {
			// 				this.$set(item2, 'checked', false)
			// 				uni.showModal({
			// 					content: "同类标签最多选择一个"
			// 				})
			// 				break;
			// 			} else {
			// 				this.$set(item2, 'checked', true)
			// 			}
			// 		} else {
			// 			flag--;
			// 			this.$set(item2, 'checked', false)
			// 		}
			// 	}
			// 	this.str2 = ""
			// 	for (var i = 0, lenI = items2.length; i < lenI; ++i) {
			// 		if (this.items2[i].checked === true) {
			// 			this.str2 = this.str2 + this.items2[i].value
			// 		} else {
			// 			console.log(flag)
			// 			if (flag != -1)
			// 				this.$set(items2[i], 'disabled', true)
			// 		}
			// 	}
			// 	console.log(this.str2)
			// }
			////////////////////////////////

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
