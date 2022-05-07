<template>
	<view>
		<map scale="13" style="width: 100%;height: 400upx;" :latitude="latitude" :longitude="longitude" :polyline="polyline"
		 :markers="markers">
		</map>
		<view v-if="!flag && !flag1">
			<view class="margin-tb-sm flex justify-start align-start bg-white padding" style=" flex-direction: row;">
				<view class="margin-left" style="width: 20%;">
					<text class="text-green" v-if="!!minute">{{hour}}小时{{minute}}分钟</text>
				</view>
				<scroll-view scroll-y="" class="margin-left flex-direction align-start solids-left padding-lr" style="height: 500upx;">
					<view v-for="(item,index) in station">
						<view v-if="item.disable===1" class="flex align-center" @click="clickroad(index)">
							<image v-if="item.type===2&&item.flag==1" src='../../static/jiaotong.png' class="image_view1"></image>
							<image v-else-if="item.type===1&&item.flag==1" src='../../static/gaotie.png' class="image_view1"></image>
							<image v-else-if="item.type===3&&item.flag==1" src="../../static/jipiao.png" class="image_view1"></image>
							<image v-else-if="item.type===4&&item.flag==1" src="../../static/xunhuan.png" class="image_view1"></image>
							<image v-else-if="item.type===5&&item.flag==1" src="../../static/car.png" class="image_view1"></image>
							<image class="image_view1" v-else></image>
							<text @click="change(index)">{{item.flag===1?item.place+" "+item.classNo:item.place}}</text>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"traffic-map",
		data() {
			return {
				startMark
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
			};
		},
		onLoad() {
			this.dealResult()
			//发送请求
			// uni.request({
			// 	//外网可用
			// 	// url: "http://47.106.207.183:32221/best_path?startPlace="+this.start_place+"&endPlace="+this.end_place,
			// 	//内网http://192.168.1.130:8888/bestPath?startPlace=海大北门&endPlace=三亚&dateTime=2020-10-01 10:10
			// 	url: "https://cyye.lbj.wiki/path/bestPath?startPlace=" + this.start_place + "&endPlace=" + this.end_place +
			// 		"&dateTime=" + this.date + " " + this.time + "&priority=" + this.traffic_classification,
			// 	success: (e) => {
			// 		this.dealResult(e)
			// 		console.log('我是最终的搜索 结果');
			// 	},
			// 	fail() {
			// 		this.guihua = false
			// 		uni.hideLoading()
			// 	}
			
			// })
		},
		methods: {
			
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
			//处理返回结果
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
			
			
			
		}
		
	}
</script>

<style lang="scss">
.image_view1 {
		margin-right: 10upx;
		width: 50upx;
		height: 50upx;
	}
</style>
