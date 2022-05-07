<template>
	<view>
		<cu-custom :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content"  style="display: flex;flex-direction: row;align-items: center; justify-content: center;" >
				<image style="width: 40upx;height: 40upx;"
					src="http://m.qpic.cn/psc?/V12eKFrM2hLmPp/45NBuzDIW489QBoVep5mceHXTFWcyYv6UyuR2LevA2NhsrL9Ku0ZsyCNOBb5dyQznjobb8NomC6FnpU4TyOsOJAQQ59*BSRwWL3*nUe95uQ!/b&bo=mgHaAZoB2gEDJwI!&rf=viewer_4">
				景区攻略
				</image>
				</block>
		</cu-custom>
		<map show-location="true"  @markertap="markClick" :latitude="latitude" :longitude="longitude" :polyline="map1"
			:markers="markers" :style="{height:2*pH/5+'px'}" :scale="scale" style="width: 100%;">
		</map>
		<scroll-view class="flex flex-direction align-center justify-start flex-wrap bg-white padding-lr"
			style="width: 100%;height: 120upx;" enable-flex="true" scroll-x>
			<view style="width: 25%;height: 50upx;" v-for="(item,index) in list1" :key="index" @tap="TabSelect(index)"
				:data-id="index">
				<view class="padding-tb-sm" v-if='item[1].search("转点")' style="width: 100%;">
					<view class="cuIcon-title text-cut">{{item[1]}}</view>
				</view>
			</view>
		</scroll-view>
		<view class="cu-bar bg-white margin-top-sm">
			<view class="action" :class="'text-'+themeColor.name">
				<text class="cuIcon-titles"></text>景点介绍
			</view>
		</view>
		<view class="bg-white flex align-center padding-lr-sm" style="flex-direction: row;">
			<image :src="list1[theDetail][5]" style="width: 40%;height: 180upx;"></image>
			<scroll-view scroll-y="" class="bg-white padding-sm" style="width: 60%;height: 200upx;">
				<view style="display: flex;flex-direction: row;align-items: center;justify-content: space-between;">
					<text style="font-size: 30upx;" :class="'text-'+themeColor.name">{{list1[theDetail][1]}}\n</text>
					<image :src="src[theDetail]" style="width: 50upx;height: 50upx;" @click="select(theDetail)"></image>
				</view>
				<text class="text-gray text-sm" style="font-size: 30upx;">{{list1[theDetail][7]}}</text>
			</scroll-view>
		</view>
		<view class="cu-bar bg-white margin-top-sm">
			<view class="action" :class="'text-'+themeColor.name">
				<text class="cuIcon-titles"></text>路径规划
			</view>
		</view>

		<view
			style="width: 100%;height: 80upx;display: flex;flex-direction: row;align-items: center;justify-content: space-between;background-color: #FFFFFF;">
			<view style="width: 75%;display: flex;flex-direction: row;align-items: center;justify-content: flex-start;">
				<text class="margin-left text-lg">从</text>
				<input v-model="start_place" @input="searchChange()" confirm-type="search"
					class="padding-left margin-left-sm solids-bottom" style="width: 30%;" placeholder="出发地" />
				<text class="margin-left text-lg">到</text>
				<input v-model="end_place" @input="searchChange1()" confirm-type="search" style="width: 30%;"
					class="padding-left margin-left-sm solids-bottom" placeholder="目的地" />
			</view>
			<button class="cu-btn text-sm round margin-right-lg" :class="'bg-'+themeColor.name" @click="showPath()">
				<view class="cuIcon-repeal"></view> 规划
			</button>
		</view>
		<view class="margin-top-sm bg-white text-lg" style="height: 100%;" v-if="flag">
			<scroll-view style="height: 100%;" scroll-y>
				<view @click="clickstart(index)" class="margin-sm solid-bottom" v-for="(item,index) in showMenuList">
					<text class="text-gray">{{item}}</text>
				</view>
			</scroll-view>
		</view>
		<view class="margin-top-sm bg-white text-lg" style="height: 100%;" v-if="flag1">
			<scroll-view style="height: 100%;" scroll-y>
				<view @click="clickend(index)" class="margin-sm solid-bottom" v-for="(item,index) in showMenuList">
					<text class="text-gray">{{item}}</text>
				</view>
			</scroll-view>
		</view>
		<scroll-view enable-flex="true" v-if="!!theroad">
			<view class="cu-bar bg-white text-df">
				<view class="action" :class="'text-'+themeColor.name">
					<text class="cuIcon-title"></text>{{theroad}}
				</view>
			</view>
			<view class="cu-bar bg-white">
				<view class="action" :class="'text-'+themeColor.name">
					<text
						class="cuIcon-title "></text>距离:{{parseInt(mydistance)}}m&emsp;&emsp;步行大约:{{(mydistance/1.5/60).toFixed(1)}}分钟
				</view>
			</view>
		</scroll-view>
		<view class="cu-bar bg-white margin-top-sm"
			style="display: flex;flex-direction: row;align-items: center;justify-content: space-between;">
			<view class="action" :class="'text-'+themeColor.name">
				<text class="cuIcon-titles "></text>专属推荐
			</view>
			<button class="cu-btn text-sm round light margin-right-lg" :class="'bg-'+themeColor.name"
				@click="tuijianNow()">
				<view class="cuIcon-activity"></view> 推荐
			</button>
		</view>
		<view class="cu-bar bg-white margin-top-sm"
			style="display: flex;flex-direction: row;align-items: center;justify-content: space-between;">
			<view class="action" :class="'text-'+themeColor.name">
				<text class="cuIcon-titles "></text>实时推荐
			</view>
			<button @click="refreshdata()" class="cu-btn text-sm round light margin-right-lg"
				:class="'bg-'+themeColor.name">
				<view class="cuIcon-refresh"></view> 刷新
			</button>
		</view>
		<view class="cu-bar bg-white" v-if="showItem ===1">
			<view class="action" style="display: flex;flex-direction: row;align-items: flex-start;">
				<text class="cuIcon-titles "></text>tips:
				<text style="font-size: 25upx;">流量排序功能主要展示景区内景点的受欢迎程度，通过采集游客游览景区的情况与驻足时间来反应景区热度。</text>
			</view>
		</view>
		<view class="cu-bar bg-white" v-else-if="showItem ===2">
			<view class="action" :class="'text-'+themeColor.name"
				style="display: flex;flex-direction: row;align-items: flex-start;">
				<text class="cuIcon-titles "></text>tips:
				<text style="font-size: 25upx;">景点选取后,显示所选取景点附近景点的距离情况。</text>
			</view>
		</view>
		<view class="cu-bar bg-white" v-else>
			<view class="action" :class="'text-'+themeColor.name"
				style="display: flex;flex-direction: row;align-items: flex-start;">
				<text class="cuIcon-titles "></text>tips:
				<text style="font-size: 25upx;">景点选取后,显示结合流量排序与距离优先两种情况的综合排序,以便游客选择合适的景点观光。</text>
			</view>
		</view>
		<view class="show_view">
			<view :class="[showItem===1?'show_text1':'show_text']" v-on:click="show1">流量排序</view>
			<view :class="[showItem===2?'show_text1':'show_text']" v-on:click="show2">距离优先</view>
			<view :class="[showItem===3?'show_text1':'show_text']" v-on:click="show3">综合推荐</view>
		</view>
		<view class="qiun-charts" v-if="showItem==1||showItem==2">
			<!--#ifdef MP-ALIPAY -->
			<canvas canvas-id="canvasColumn" id="canvasColumn" class="charts" :width="cWidth*pixelRatio"
				:height="cHeight*pixelRatio" :style="{'width':cWidth+'px','height':cHeight+'px'}" disable-scroll=true
				@touchstart="touchColumn" @touchmove="moveColumn" @touchend="touchEndColumn"></canvas>
			<!--#endif-->
			<!--#ifndef MP-ALIPAY -->
			<canvas canvas-id="canvasColumn" id="canvasColumn" class="charts" disable-scroll=true
				@touchstart="touchColumn" @touchmove="moveColumn" @touchend="touchEndColumn"></canvas>
			<!--#endif-->
		</view>
		<view class="qiun-charts" v-if="showItem==3">
			<canvas canvas-id="canvasPie" id="canvasPie" class="charts" :width="cWidth*pixelRatio"
				:height="cHeight*pixelRatio" :style="{'width':cWidth+'px','height':cHeight+'px'}"
				@touchstart="touchPie"></canvas>
		</view>
	</view>
</template>

<script>
	import gloalMixin from '@/mixins/global-minxin.js'
	const innerAudioContext = uni.createInnerAudioContext();
	import uCharts from '@/components/u-charts/u-charts.js';
	import {
		isJSON
	} from '@/common/checker.js';
	var _self;
	var canvaColumn = null;
	var canvaPie = null;
	var _self;
	export default {
		mixins: [gloalMixin],

		data() {
			return {
				scenic_name: "",
				flag: 0,
				flag1: 0,
				showMenuList: [],
				cWidth: '',
				cHeight: '',
				pixelRatio: 1,
				textarea: '',
				mydistance: 0,
				start_place: "",
				end_place: "",
				latitude: 0,
				longitude: 0,
				G: {
					"vexs": [],
					"arc": [],
					"numVertexes": 0,
					"numEdges": 0
				},
				ShortPathTable: [],
				Pathmatirx: [],
				numEdges: 0,
				Arr1: [],
				pH: 0,
				map: [],
				map1: [],
				markers: [],
				list: [],
				list1: [],
				scale: 18,
				index: 0,
				theroad: "",
				theDetail: 0,
				showItem: 1,
				animation: '',
				timer: "",
				isStop: 0,
				trafficData: [],
				src: [],
				src1: "../../static/bofang1.png",
				src2: "../../static/zanting.png",
				is_start: false,
				isRoate: false,
				if_view: false,
				animation: '',
				musicIndex: -1,
				animationData: {},
				nameFlagIndex: 0
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
			this.scenic_name = options.name
			uni.showLoading({
				title: "加载中",
			})
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


			uni.request({
				url: getApp().globalData.globalUrl + "/xiaogonglue/getPolyline/" + options.name,
				success: e => {
					if (e.data.length > 0) {
						console.log(e.data)
						this.list = e.data
						uni.request({
							url: getApp().globalData.globalUrl + "/xiaogonglue/getPosition/" + options
								.name,
							success: res => {
								console.log(res.data)
								this.list1 = res.data
								for (var i in this.list1) {
									this.src.push(this.src1)
								}
								uni.hideLoading()
								this.initPoint()
								this.show1();

							}
						})
					} else {
						uni.hideLoading()
						uni.showModal({
							title: '提示',
							content: '暂无数据',
							cancelText: "取消", // 取消按钮的文字  
							confirmText: "确定", // 确认按钮文字  
							showCancel: true, // 是否显示取消按钮，默认为 true
							confirmColor: '#f55850',
							cancelColor: '#39B54A',
							success: (res) => {
								if (res.confirm) {
									uni.navigateBack({

									})
								} else {
									uni.navigateBack({

									})
								}
							}
						})
					}
				}
			})
		},
		methods: {
			refreshdata() {
				if (this.showItem === 1) {
					this.show1()
				}
				if (this.showItem === 2) {
					this.show2()
				}
				if (this.showItem === 3) {
					this.show3()
				}

			},
			tuijianNow() {
				uni.navigateTo({
					url: "../index/index-jingqu?index=0"
				})
			},
			clickstart(index) {
				this.start_place = this.showMenuList[index]
				this.flag = 0
			},
			clickend(index) {
				this.end_place = this.showMenuList[index]
				this.flag1 = 0
			},
			searchChange() {
				this.showMenuList = []
				for (var i in this.list1) {
					console.log(this.list1[i][1])
					if (this.list1[i][1].search(this.start_place) != -1 && this.start_place != "" && this.list1[i][1]
						.search("转点") == -1) {
						this.showMenuList.push(this.list1[i][1])
						this.flag = 1
					}
				}
				if (this.showMenuList.length == 0) {
					this.flag = 0
				}
				console.log(this.showMenuList)
			},
			searchChange1() {
				this.showMenuList = []
				for (var i in this.list1) {
					console.log(this.list1[i][1])
					if (this.list1[i][1].search(this.end_place) != -1 && this.end_place != "" && this.list1[i][1].search(
							"转点") == -1) {
						this.showMenuList.push(this.list1[i][1])
						this.flag1 = 1
					}
				}
				if (this.showMenuList.length == 0) {
					this.flag1 = 0
				}
				console.log(this.showMenuList)
			},
			markClick(e) {
				console.log("点击了")
				this.markers[this.nameFlagIndex].label = null
				console.log(e)
				this.theDetail = e.detail.markerId

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
			bofang(index) {
				console.log(this.list1[index])
				this.isStop = 1
				this.src[this.musicIndex] = this.src1
				this.src[index] = this.src2
				this.musicIndex = index
				this.is_start = true
				this.isRoate = true
				this.if_view = true
				innerAudioContext.src = this.list1[index][6]
				innerAudioContext.play();

			},
			donghua() {
				this.animation.rotate(18000).step()
				this.animationData = this.animation.export()
				this.animation
			},
			show1() {
				this.showItem = 1;
				this.getServerData1()

			},
			show2() {
				this.showItem = 2;
				this.getServerData2()

			},
			show3() {
				this.showItem = 3;
				this.getServerData3()

			},
			getServerData1() {
				uni.request({
					url: 'https://cyye.lbj.wiki/xiaogonglue/getScenicTrafficList/2020-12-16%2011:25/' + this
						.scenic_name,
					success: res => {
						console.log(res.data)
						let Column = {
							categories: [],
							series: [{
								name: "热度",
								data: []
							}]
						};
						this.trafficData = res.data
						res.data = res.data.reverse()
						for (var k = 1; k < res.data.length; k++) {
							Column.categories.push(res.data[k][0])
							Column.series[0].data.push(res.data[k][1])
						}
						_self.showColumn("canvasColumn", Column, 0, 300, "热度");
						console.log(Column)
					},
					fail: () => {
						_self.tips = "网络错误，小程序端请检查合法域名";
					},
				});
			},
			getServerData2() {
				console.log("-----------------------")
				
						console.log("-----------------------")
						var lng = getApp().globalData.longitude
						var lat = getApp().globalData.latitude
						let list = JSON.parse(JSON.stringify(this.list1))
						for (let i = 0; i < list.length - 1; i++) {
							console.log(!list[i][1].includes("转点"))
							if(list[i][4]==1){//此处判断
							console.log(list[i][1])
							let dis1 = 0
							let dis2 = 0
							let dis = dis1
							for (let j = i + 1; j < list.length; j++) {
								if(list[j][4]==1){
								dis1 = this.distance(lat, lng, list[i][2].split(",")[1], list[i][2].split(",")[
									0])
								dis2 = this.distance(lat, lng, list[j][2].split(",")[1], list[j][2].split(",")[
									0])
								if (dis1 > dis2) {
									let n = 0
									n = dis1
									dis1 = dis2
									dis2 = n
									let middleList = []
									middleList = list[j]
									list[j] = list[i]
									list[i] = middleList
								}
								}
							}
							if (i === list.length - 2) {
								list[i + 1].push(dis2)
							}
							list[i].push(dis1)
							}
						}
						console.log(list)
						let Column = {
							categories: [],
							series: [{
								name: "距离",
								data: []
							}]
						};
						for (var k = 0; k < list.length; k++) {
							if(list[k][4]==1){
								Column.categories.push(list[k][1])
							    Column.series[0].data.push(parseInt(list[k][8]))
								}
						}
						this.showColumn("canvasColumn", Column, 0, 1000, "米");
				

			},

			getServerData3() {
				let Pie = {
					series: []
				};
				let pieList = []
				
						var lng = getApp().globalData.longitude
						var lat = getApp().globalData.latitude
						let list = JSON.parse(JSON.stringify(this.list1))
						for (let i = 0; i < list.length - 1; i++) {
							if(list[i][4]==1){
							let dis1 = 0
							let dis2 = 0
							let dis = dis1
							for (let j = i + 1; j < list.length; j++) {
								if(list[j][4]==1){
								dis1 = this.distance(lat, lng, list[i][2].split(",")[1], list[i][2].split(",")[
									0])
								dis2 = this.distance(lat, lng, list[j][2].split(",")[1], list[j][2].split(",")[
									0])
								if (dis1 > dis2) {
									let n = 0
									n = dis1
									dis1 = dis2
									dis2 = n
									let middleList = []
									middleList = list[j]
									list[j] = list[i]
									list[i] = middleList
								}
								}
							}
							if (i === list.length - 2) {
								list[i + 1].push(dis2)
							}
							list[i].push(dis1)
							}
						}
						console.log(list)
						for (let i = 0; i < list.length; i++) {
							if(list[i][4]==1){
							let k = 0;
							for (let j = 0; j < this.trafficData.length; j++) {
								if (list[i][1] === this.trafficData[j][0]) {
									k++;
									let num = parseInt(list[i][8]) + parseInt(this.trafficData[j][1]) * 6
										pieList.push([list[i][1], num])					
								}
							}
							if (k === 0) {
								pieList.push([list[i][1], list[i][8]])						
							}
							}
						}
						let finallPie = []
						for (let n = 0; n < 5; n++) {
							for (let m = n + 1; m < pieList.length; m++) {
								if (pieList[n][1] > pieList[m][1]) {
									let middleList = []
									middleList = pieList[n]
									pieList[n] = pieList[m]
									pieList[m] = middleList
								}
							}
							finallPie.push(pieList[n])

						}
						console.log(finallPie)
						for (var i = 0; i < finallPie.length; i++) {
							Pie.series.push({
								"name": finallPie[4 - i][0],
								"data": parseInt(finallPie[i][1])
							})
						}
						_self.showPie("canvasPie", Pie);
			
			},
			showPie(canvasId, chartData) {
				canvaPie = new uCharts({
					$this: _self,
					canvasId: canvasId,
					type: 'pie',
					fontSize: 11,
					padding: [15, 15, 0, 15],
					legend: {
						show: true,
						padding: 5,
						lineHeight: 11,
						margin: 0,
					},
					background: '#FFFFFF',
					pixelRatio: _self.pixelRatio,
					series: chartData.series,
					animation: true,
					width: _self.cWidth * _self.pixelRatio,
					height: _self.cHeight * _self.pixelRatio,
					dataLabel: true,
					extra: {
						pie: {
							border: true,
							borderColor: '#FFFFFF',
							borderWidth: 3
						}
					},
				});
			},
			touchPie(e) {
				canvaPie.showToolTip(e, {
					format: function(item) {
						return item.name + ':' + item.data
					}
				});
				canvaPie.touchLegend(e, {
					animation: true
				});
			},

			showColumn(canvasId, chartData, min, max, name) {
				canvaColumn = new uCharts({
					$this: _self,
					canvasId: canvasId,
					type: 'column',
					fontSize: 11,
					padding: [5, 15, 15, 15],
					legend: {
						show: true,
						position: 'top',
						float: 'center',
						itemGap: 30,
						padding: 5,
						margin: 5,
						//backgroundColor:'rgba(41,198,90,0.2)',
						//borderColor :'rgba(41,198,90,0.5)',
						borderWidth: 1
					},
					dataLabel: true,
					dataPointShape: true,
					background: '#FFFFFF',
					pixelRatio: _self.pixelRatio,
					categories: chartData.categories,
					series: chartData.series,
					animation: true,
					enableScroll: true,
					xAxis: {
						disableGrid: false,
						type: 'grid',
						gridType: 'dash',
						itemCount: 5,
						scrollShow: true,
						scrollAlign: 'left',
					},
					yAxis: {
						//disabled:true
						gridType: 'dash',
						splitNumber: 4,
						min: min,
						max: max,
						format: (val) => {
							return val.toFixed(0) + name
						} //如不写此方法，Y轴刻度默认保留两位小数
					},
					width: _self.cWidth * _self.pixelRatio,
					height: _self.cHeight * _self.pixelRatio,
					extra: {
						column: {
							type: 'group',
							width: _self.cWidth * _self.pixelRatio * 0.45 / chartData.categories.length
						}
					},
				});

			},
			touchColumn(e) {
				canvaColumn.scrollStart(e);
			},
			moveColumn(e) {
				canvaColumn.scroll(e);
			},
			changeData() {
				if (isJSON(_self.textarea)) {
					let newdata = JSON.parse(_self.textarea);
					canvaColumn.updateData({
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
			touchEndColumn(e) {
				canvaColumn.scrollEnd(e);
				canvaColumn.touchLegend(e, {
					animation: true,
				});
				canvaColumn.showToolTip(e, {
					format: function(item, category) {
						return category + ' ' + item.name + ':' + item.data
					}
				});
			},
			TabSelect(index) {
				this.markers[this.nameFlagIndex].label = null
				
				console.log(this.list1[index]);
				this.theDetail = index
				this.nameFlagIndex = index
				this.latitude = this.list1[index][2].split(",")[1]
				this.longitude = this.list1[index][2].split(",")[0]
				this.markers[index].label = {
						content: this.list1[index][1], //this.list1[i][1]
						color: '#0e0908',
						bgColor:'#fdfdfd',
						padding: 3,
						borderRadius: 4,
						fontSize: 8,
					}


			},
			initPoint() {
				uni.showLoading({
					title: "生成路线中..."
				})
				for (var i = 0; i < this.list1.length; i++) {
					var Arr2 = []
					for (var j = 0; j < this.list1.length; j++) {
						Arr2.push(0)
					}
					this.Arr1.push(Arr2)
				}
				for (var i = 0; i < this.list1.length; i++) {
					for (var j = 0; j < this.list1.length; j++) {
						if (i < j) {
							var n = 0
							for (var k = 0; k < this.list.length; k++) {

								if (this.list1[i][1] + "-" + this.list1[j][1] === this.list[k][0] || this.list1[j][1] +
									"-" + this.list1[i][1] ===
									this.list[k][0]) {
									n++
									var point = this.list[k][1].split(":")
									var distance1 = 0
									console.log(point)
									for (var n = 0; n < point.length - 1; n++) {
										if (n < point.length - 1) {
											distance1 += this.distance(point[n].split(",")[0], point[n].split(",")[1],
												point[n + 1].split(",")[0], point[
													n + 1].split(",")[1])
										}
									}
									console.log(this.list[k][0])
									console.log(distance1)
									this.Arr1[i][j] = parseInt(distance1)
									this.Arr1[j][i] = parseInt(distance1)
									this.numEdges++
								}
							}
							if (n == 0) {
								this.Arr1[i][j] = 10000000
								this.Arr1[j][i] = 10000000
							}

						}
						if (i === j) {
							this.Arr1[i][j] = 0

						}
					}
				}
				uni.hideLoading()
				this.showAll()
				this.createMGraph()
				this.Floyd();
				//this.PrintAll();
				//this.showAll()
			},
			toRad(d) {
				return d * Math.PI / 180;
			},
			distance(lat1, lng1, lat2, lng2) {
				var dis = 0;
				var radLat1 = this.toRad(lat1);
				var radLat2 = this.toRad(lat2);
				var deltaLat = radLat1 - radLat2;
				var deltaLng = this.toRad(lng1) - this.toRad(lng2);
				var dis = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(deltaLat / 2), 2) + Math.cos(radLat1) * Math.cos(
						radLat2) *
					Math.pow(Math.sin(deltaLng / 2), 2)));
				return dis * 6378137;
			},



			//创建图
			createMGraph() {
				let Arr2 = JSON.parse(JSON.stringify(this.Arr1))
				this.G.numVertexes = this.list1.length; //设置顶点数
				this.G.numEdges = this.numEdges; //设置边数

				//录入顶点信息
				for (let i = 0; i < this.G.numVertexes; i++) {
					this.G.vexs[i] = 'V' + i; //scanf('%s'); //ascii码转字符 //String.fromCharCode(i + 65);
				}

				//邻接矩阵初始化
				for (let i = 0; i < this.G.numVertexes; i++) {
					this.G.arc[i] = [];
					for (let j = 0; j < this.G.numVertexes; j++) {
						this.G.arc[i][j] = Arr2[i][j]; //INFINITY; 
					}
				}
				console.log(this.G.arc); //打印邻接矩阵
			},



			Floyd() {

				let w, k;
				for (let v = 0; v < this.G.numVertexes; ++v) { //初始化 Pathmatirx ShortPathTable
					this.Pathmatirx[v] = [];
					this.ShortPathTable[v] = [];
					for (let w = 0; w < this.G.numVertexes; ++w) {
						this.ShortPathTable[v][w] = this.G.arc[v][w];
						this.Pathmatirx[v][w] = w;
					}
				}

				for (let k = 0; k < this.G.numVertexes; ++k) {
					for (let v = 0; v < this.G.numVertexes; ++v) {
						for (let w = 0; w < this.G.numVertexes; ++w) {
							if (this.ShortPathTable[v][w] > (this.ShortPathTable[v][k] + this.ShortPathTable[k][w])) {
								//如果经过下标为k顶点路径比原两点间路径更短，当前两点间权值设为更小的一个
								this.ShortPathTable[v][w] = this.ShortPathTable[v][k] + this.ShortPathTable[k][w];
								this.Pathmatirx[v][w] = this.Pathmatirx[v][k]; //路径设置经过下标为k的顶点
							}
						}
					}
				}
			},
			showPath() {
				
				// uni.getLocation({
				// 	type: 'gcj02',
				// 	success: res => {
				// 		let dis = 999999
				// 		let mykey = -1
				// 		let lng1 = 0
				// 		let lat1 = 0
				// 		var lng = res.longitude
				// 		var lat = res.latitude
				// 		for (var i = 0; i < this.list1.length; i++) {
				// 			if (this.end_place === this.list1[i][1]) {
				// 				lng1 = this.list1[i][2].split(",")[0]
				// 				lat1 = this.list1[i][2].split(",")[1]
				// 			}
				// 		}
				// 		for (var i = 0; i < this.list1.length; i++) {
				// 			console.log("asdasdasd")
				// 			if ((this.list1[i][2].split(",")[0] - lng) * (this.list1[i][2].split(",")[0] - lng1) < 0 && (this.list1[i][2]
				// 					.split(",")[1] - lat) * (this.list1[i][2].split(",")[1] - lat1) < 0) {
				// 				console.log(this.list1[i][1] + ".............")
				// 				let dis1 = this.distance(this.list1[i][2].split(",")[1], this.list1[i][2].split(",")[0], lat, lng)
				// 				if (dis1 < dis) {
				// 					dis = dis1
				// 					mykey = i
				// 				}
				// 			}
				// 		}
				// 		this.list1.push([this.list1.length + 1, "我", lng + "," + lat])
				// 		if (mykey != -1) {
				// 			this.list.push(["我-" + this.list1[mykey][1], lat + "," + lng + ":" + this.list1[mykey][2].split(",")[1] + "," +
				// 				this.list1[mykey][2].split(",")[0]
				// 			])
				// 		} else {
				// 			this.list.push(["我-" + this.end_place, lat + "," + lng + ":" + lat1 + "," + lng1])
				// 		}
				//		this.initPoint()
				// 		console.log(this.list)
				// 		console.log(this.list1)

				this.theroad = ""
				this.mydistance = 0
				let flag = 0
				this.map = this.map.slice(0, this.numEdges)
				this.map1 = []
				this.map = []
				let w = 0
				let v = 0
				let pathValue = []
				let forflag = 0
				this.showAll()
				for (var i = 0; i < this.list1.length; i++) {

					if (this.start_place === this.list1[i][1]) {
						v = i
						forflag++
					}

					if (this.end_place === this.list1[i][1]) {
						w = i
						forflag++
					}
					if (forflag == 2) {
						break;
					}
				}

				if (v > -1 && w > -1) {

					let k = this.Pathmatirx[v][w];
					console.log(this.list1[v][1])
					this.theroad += this.list1[v][1] + "->"
					pathValue.push(this.list1[v][1]);
					while (k != w) {
						pathValue.push(this.list1[k][1]);
						console.log(this.list1[k][1])
						if (this.list1[k][1].search("转点"))
							this.theroad += this.list1[k][1] + "->"
						k = this.Pathmatirx[k][w];
					}
					console.log(this.list1[w][1])
					this.theroad += this.list1[w][1]
					pathValue.push(this.list1[w][1]);

					for (var j = 0; j < pathValue.length - 1; j++) {
						var str = pathValue[j] + "-" + pathValue[j + 1]
						var str1 = pathValue[j + 1] + "-" + pathValue[j]
						for (var l = 0; l < this.list.length; l++) {
							if (str === this.list[l][0] || str1 === this.list[l][0]) {
								var point = this.list[l][1].split(":")
								var points = []
								for (var i = 0; i < point.length; i++) {
									if (i < point.length - 1) {
										this.mydistance += this.distance(point[i].split(",")[0], point[i].split(",")[1],
											point[i + 1].split(",")[
												0],
											point[
												i + 1].split(",")[1])
									}
									if (i === parseInt(point.length / 2)) {
										this.latitude = point[i].split(",")[0]
										this.longitude = point[i].split(",")[1]
									}
									points.push({
										"latitude": point[i].split(",")[0],
										"longitude": point[i].split(",")[1]
									})
								}
								if (v < w) {
									this.map.push({
										"points": points,
										"arrowLine": true,
										"width": 5,
										"color": "#8b83ed"
									})
								} else {
									this.map.push({
										"points": points.reverse(),
										"arrowLine": true,
										"width": 3,
										"color": "#8b83ed"
									})
								}


							}
						}
						this.map1 = this.map
					}
				} else {
					uni.showModal({
						content: "输入位置信息有误"
					})
				}
				// 	},
				// })
			},
			showAll() {
				this.scale = 16
				this.map = []
				this.map1 = []
				this.map.push({
					"points": [],
					"arrowLine": false,
					"width": 4,
					"color": "#f5942f"
				})
				this.markers = []
				for (var i = 0; i < this.list1.length; i++) {
					var point = this.list1[i][2].split(",")
					this.latitude = point[1]
					this.longitude = point[0]
					if (this.list1[i][1].search("转点")) {
						console.log("不是转点：" + this.list1[i][1])
						this.markers.push({
							id: i,
							alpha: 1,
							anchor: {
								x: 1,
								y: 0
							},
							// label: {
							// 	content: i.toString(), //this.list1[i][1]
							// 	color: '#0e0908',

							// 	padding: 3,
							// 	borderRadius: 4,
							// 	fontSize:8,
							// },
							callout: {
								content: this.list1[i][1],
								color: '#0e0908',
								fontSize: '10',
								bgColor: '#fdfdfd',
								padding: 6,
								display: 'BYCLICK',
								borderRadius: 10
							},
							width: 15,
							height: 15,
							latitude: point[1],
							longitude: point[0],
							iconPath: this.list1[i][1].toString().search('卫生间') != -1 ? '../../static/wc.png' :
								this.list1[i][1].toString().search('医务室') != -1 ? '../../static/yiliao.png' : this
								.list1[i][1].toString().search('贩卖机') != -1 ? '../../static/fanmai.png' :
								'../../static/yuandian.png'
						})
					} else {
						console.log("我是转点：" + this.list1[i][1])
					}

				}
				for (var j = 0; j < this.list.length; j++) {
					var point = this.list[j][1].split(":")
					this.map.push({
						"points": [],
						"arrowLine": false,
						"width": 4,
						"color": "#f5942f"
					})

					for (var i = 0; i < point.length; i++) {
						if (i == 0) {
							this.latitude = point[i].split(",")[0]
							this.longitude = point[i].split(",")[1]
						}

						this.map[j].points.push({
							"latitude": point[i].split(",")[0],
							"longitude": point[i].split(",")[1]
						})

					}

				}
				this.map1 = this.map
				this.scale = 15
			}

		}
	}
</script>

<style>
	.qiun-charts {
		width: 100%;
		height: 500upx;
		background-color: #FFFFFF;
	}

	.show_text {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 33%;
		font-size: 35upx;
	}

	.show_view {
		width: 100%;
		height: 80upx;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		background-color: #FFFFFF;
	}

	.show_text1 {
		display: flex;
		width: 33%;
		color: #aaaaff;
		align-items: center;
		justify-content: center;
		font-size: 35upx;
		height: 85upx;
		border-bottom: 5upx solid #AAAAFF;
	}

	.charts {
		width: 100%;
		height: 500upx;
		background-color: #FFFFFF;
	}
</style>
