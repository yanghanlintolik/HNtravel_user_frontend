<template>
	<view v-if="flag==='true'">
		<view class="margin-top-sm" :class="'text-'+ themeColor.name">{{name}}</view>
		<view class="cu-bar bg-white solids-bottom ">
			<view class="cuIcon-title" :class="'text-'+ themeColor.name">当前时间</view>
			<button @click="refreshdata()" class="cu-btn text-sm round light margin-right-lg"
				:class="'bg-'+themeColor.name">
				<view class="cuIcon-refresh"></view> 刷新
			</button>
		</view>
		<view class="cu-bar bg-white solids-bottom ">
			<view class="action">
				{{timeNow}}
			</view>
		</view>
		<view
			style="display: flex;flex-direction: column;align-items: center;justify-content: center;width: 100%;padding: 20upx;">
			<view class="qiun-charts">
				<canvas canvas-id="canvasLineA" id="canvasLineA" class="charts" :width="cWidth*pixelRatio"
					:height="cHeight*pixelRatio" :style="{'width':cWidth+'px','height':cHeight+'px'}"
					disable-scroll=true @touchstart="touchLineA" @touchmove="moveLineA"
					@touchend="touchEndLineA"></canvas>
			</view>
		</view>
	</view>
</template>

<script>
	import uCharts from '@/components/u-charts/u-charts.js';
	import gloalMixin from '@/mixins/global-minxin.js'

	import {
		isJSON
	} from '@/common/checker.js';
	var _self;
	var canvaLineA = null;

	export default {
		name: "lineChart",
		props: {
			name: ""
		},
		mixins: [gloalMixin],
		data() {
			return {
				flag:'false',
				data1: [],
				timeNow: "",
				all_row_time: [1, 2, 3],
				row_time: "",
				cWidth: '',
				cHeight: '',
				pixelRatio: 1,
				textarea: '',
				showItem: 1,
				pH: 0, //窗口高度
				navHeight: 0, //元素的所需高度
			}
		},

		onReady() {
			let that = this;
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
		methods: {
			start(name) {
				this.flag='true'
				console.log(this.name)
				uni.request({
					url: "https://cyye.lbj.wiki/jqyc/" + name,
					success: e => {
						console.log(e);
						if (e.data[0] != null) {
							for (var i = 0; i < 9; i++) {
								this.data1[i] = e.data[i]
							}
							console.log("this.data1:" + this.data1);
						} else {
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

				this.show2()
				this.row_time1 = this.getTime()
				this.timeNow = this.getTime()
				console.log(this.row_time1)
				for (var i = 0; i < 9; i++) {
					this.all_row_time[i] = this.getrowTime(this.row_time1)
					this.row_time1 = this.getrowTime(this.row_time1)
					console.log(this.row_time1)
				}
			},
			end(){
				this.flag='false'
				console.log("false============")
			},
			refreshdata() {
				this.getTime()
				this.timeNow = this.getTime()
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
			getrowTime(time) {
				var time1 = [],
					time1 = time.toString().split(":")
				var hour = parseInt(time1[0])
				var minute = parseInt(time1[1])
				if (minute < 15) {
					minute += 15
					return hour + ":" + 15
				}
				if (minute >= 15 & minute < 30) {
					minute += 15
					return hour + ":" + 30
				}
				if (minute >= 30 & minute < 45) {
					minute += 15
					return hour + ":" + 45
				} else {
					hour += 1
					minute += 15
					return hour + ":" + "00"
				}

			},
			show2() {
				this.showItem = 1;
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
				this.cWidth = uni.upx2px(650);
				this.cHeight = uni.upx2px(500);
				this.getServerData();
			},
			getServerData() {
				console.log("进来啦");
				let LineA = {
					categories: [],
					series: []
				};
				//这里我后台返回的是数组，所以用等于，如果您后台返回的是单条数据，需要push进去
				LineA.categories = this.all_row_time,
					LineA.series = [{
						"name": "预测值",
						"data": this.data1
					}];
				_self.textarea = JSON.stringify(LineA);
				console.log("LineA:" + JSON.stringify(LineA));
				_self.showLineA("canvasLineA", LineA);

			},
			showLineA(canvasId, chartData) {
				console.log("haha:" + JSON.stringify(chartData));
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
						splitNumber: 10,
						min: 0,
						max: 3600,
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
				console.log("haha2:" + JSON.stringify(chartData));
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
			}
		}
	}
</script>

<style>
	/*样式的width和height一定要与定义的cWidth和cHeight相对应*/
	.qiun-charts {
		width: 650upx;
		height: 500upx;
		background-color: #66ccff;
	}

	.image {
		width: 55%;
		height: 200upx;
	}

	.charts {
		width: 100%;
		height: 40%;
		background-color: #FFFFFF;
	}
</style>
