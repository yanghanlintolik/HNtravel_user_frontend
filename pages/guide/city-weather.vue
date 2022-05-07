<template>
	<view>
		<cu-custom :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content"  style="display: flex;flex-direction: row;align-items: center; justify-content: center;" >
				<image style="width: 40upx;height: 40upx;"
					src="http://m.qpic.cn/psc?/V12eKFrM2hLmPp/45NBuzDIW489QBoVep5mceHXTFWcyYv6UyuR2LevA2NhsrL9Ku0ZsyCNOBb5dyQznjobb8NomC6FnpU4TyOsOJAQQ59*BSRwWL3*nUe95uQ!/b&bo=mgHaAZoB2gEDJwI!&rf=viewer_4">
				天气预报
				</image>
				</block>
		</cu-custom>
		<view class="radius-lg">
			<!-- //选择图像显示方式 -->
			<view class="cu-bar text-lg ">
				<view class="action" :class="'text-'+themeColor.name">
					<text class="cuIcon-titles" ></text> 多天预报
				</view>			
				<picker @change="examinationType" :range="examinationTypeArray" class="margin-right" :class="'text-'+themeColor.name">
					<label style="font-size: 35upx;">{{ examinationTypeArrayType }}</label>
					<text class="cuIcon-triangledownfill"></text>
				</picker>
			</view>
			<view class="bg-white">
				<view style="width: 100%;">
					<view class="flex justify-between" style="width: 100%; position: relative; flex-direction: row;">
						<view class="solid-right flex flex-direction text-center" style="width: 15%;" v-for="(item, index) in cityWeathers"
						 :key="index">
							<view class="text-bold bg-green light text-lg" style="height: 90upx;line-height: 90upx;">{{ item.dayWeek}}</view>
							<view class="bg-purple light text-cut" style="height: 70upx; line-height: 70upx;">{{ item.weatherLabel}}</view>
							<view class="bg-orange light text-cut" style="height: 70upx; line-height: 70upx;">{{ item.max }}</view>
							<view class="bg-blue light text-cut" style="height: 70upx; line-height: 70upx;">{{ item.min }}</view>							
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="cu-bar bg-white text-lg">
			<view class="action" :class="'text-'+themeColor.name">
				<text class="cuIcon-titles"></text> 温度变化图
			</view>
			<picker @change="bindPickerChange" :value="weatherTypeIndex" :range="weatherTypeArray" class="margin-right"  :class="'text-'+themeColor.name">
				<label style="font-size: 35upx;">{{ weatherTypeArray[weatherTypeIndex] }}</label>
				<text class="cuIcon-triangledownfill"></text>
			</picker>
		</view>
		<view class="mckou-weather-content solid-bottom" >
			<view class="more-day-report">
				<view class="body-module">
					<view class="body-weather-line" v-if="weatherTypeIndex == 0">
						<canvas :style="{ width: cWidth + 'px', height: '100px' }" canvas-id="weather-canvas"></canvas>
					</view>
					<view v-if="weatherTypeIndex == 1" class="zhuzhuangtu">
						<view class="zhuzhuangtu-item" v-for="(item, index) in pillarArray" :key="index">
							<view class="item-bg">
								<view class="item" :style="{ top: item.top + 'px', height: item.height + 'px' }"></view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import gloalMixin from '@/mixins/global-minxin.js'
	export default {
		mixins:[gloalMixin],
		data() {
			return {
				weatherTypeArray: ['折线', '柱状'],
				weatherTypeIndex: 0,
				cityWeathers: [],
				nameWeatherMap: {},
				examinationTypeArray: ['海口', '三亚', '保亭', '陵水', '琼海', '文昌', '万宁', '琼中', '儋州', '五指山', '定安', '澄迈', '屯昌', '昌江', '临高',
					'乐东', '白沙', '东方'
				],
				examinationTypeIndex: 0,
				examinationTypeArrayType: '海口',
				cWidth: 345,
				pillarArray: []
			}
		},

		filters: {
			showDate(d) {
				console.log(d);
				console.log(d.replace(/\（.*?\）/g, ''));
				return d.replace(/\（.*?\）/g, '');
				//       return d.replace(/\(|\)/g,'');
				// console.log(d.replace(/\(|\)/g,''));
			}
		},

		onLoad() {
			uni.showLoading({
			    title: '请稍后'
			});
			console.log('+++++++++++++');
			this.loadData()
			setTimeout(function () {
			    uni.hideLoading();
			}, 3000);
		},
		methods: {
			init() {
				var that = this;
				uni.getSystemInfo({
					success: function(res) {
						that.cWidth = Math.round(res.windowWidth * 0.92);
					}
				});
				
				// that.doLineOrPiller();
			},
			// doLineOrPiller() {
			// 	if (this.weatherTypeIndex == 1) {
			// 		this.initWeatherPiller();
			// 	} else {
			// 		this.initWeatherPointLine();
			// 	}
			// },
			examinationType(e) {
				this.examinationTypeIndex = e.target.value;
				this.examinationTypeArrayType = this.examinationTypeArray[this.examinationTypeIndex]
				this.cityWeathers = this.nameWeatherMap[this.examinationTypeArrayType]
				console.log(this.cityWeathers);
			},
			//处理折线图
			initWeatherPointLine() {	
				console.log('开始绘制');
				
				var maxArry = this.cityWeathers.map(item => {
					return Number(item.max.replace("℃",""));
					console.log(item.max);
				});
				var minArry = this.cityWeathers.map(item => {
					return Number(item.min.replace("℃",""));
				});
				var max = [];
				var min = [];
				var maxWeather = Math.max(...maxArry);
				var minWeather = Math.min(...minArry);
				var diff = maxWeather - minWeather;
				for (var i = 0; i < maxArry.length; i++) {
					var height = Math.round(((maxArry[i] - minArry[i]) / diff) * 80);

					max[i] = 50 - Math.round((80 / diff) * (maxWeather - maxArry[i]) + 10);
					min[i] = max[i] - height;
				}

				var section7width = Math.round(this.cWidth / 7);
				var cvs = uni.createCanvasContext('weather-canvas', this);
				cvs.setStrokeStyle('#FB7821');
				cvs.setLineWidth(1);
				cvs.beginPath();
				for (var i = 0; i < max.length; i++) {
					var wendu = max[i];
					var x = Math.round(section7width / 2) + Math.round(section7width * i);
					var y = 50 - wendu;
					cvs.arc(x, y, 5, 0, 2 * Math.PI);
					cvs.setFillStyle('#FB7821');
					cvs.fill();
					cvs.moveTo(x, y);
					if (i < max.length - 1) {
						var nextX = x + section7width;
						var nextY = 50 - max[i + 1];
						cvs.lineTo(nextX, nextY);
					}
					cvs.stroke();
					cvs.beginPath();
				}

				cvs.setStrokeStyle('#1B9DFF');
				cvs.setLineWidth(1);
				for (var i = 0; i < min.length; i++) {
					var wendu = min[i];
					var x = Math.round(section7width / 2) + Math.round(section7width * i);
					var y = 50 - wendu;
					cvs.arc(x, y, 5, 0, 2 * Math.PI);
					cvs.setFillStyle('#1B9DFF');
					cvs.fill();
					cvs.moveTo(x, y);
					if (i < min.length - 1) {
						var nextX = x + section7width;
						var nextY = 50 - min[i + 1];
						cvs.lineTo(nextX, nextY);
					}
					cvs.stroke();
					cvs.beginPath();
				}
				
				cvs.draw();

			},
			//处理柱状图
			initWeatherPiller() {
				var maxArry = this.cityWeathers.map(item => {
					return Number(item.max.replace("℃",""));
					console.log(item.max);
				});
				var minArry = this.cityWeathers.map(item => {
					return Number(item.min.replace("℃",""));
				});
				
				var pillarArray = [];

				var max = Math.max(...maxArry);
				var min = Math.min(...minArry);
				var diff = max - min;
				for (var i = 0; i < maxArry.length; i++) {
					var height = Math.round(((maxArry[i] - minArry[i]) / diff) * 80);
					pillarArray.push({
						top: Math.round((80 / diff) * (max - maxArry[i])) + 10,
						height: height
					});
				}
				this.pillarArray = pillarArray;
			},
			bindPickerChange(e) {
				
				var index = e.target.value;
				console.log(index);
				this.weatherTypeIndex = index;
				if (index == 1) {
					this.initWeatherPiller();
				} else {
					console.log('点击切换');
					//this.loadData();
					setTimeout(() => {
						 this.initWeatherPointLine();
					}, 1000)				
				}				
			},
			loadData() {
				uni.request({
					url: getApp().globalData.globalUrl + "/strategy1/get_city_weather",
					success: (e) => {
						console.log(e.data);
						// this.cityWeathers = e.data
						// console.log(e.data[0][0])
						// setTimeout(() => {
						// 	uni.hideLoading();
						// }, 1000)
						for (let i = 0; i < e.data.length; i++) {
							
							let weatherList = [];
							this.nameWeatherMap[e.data[i].city] = weatherList
							for (let j = 0; j < e.data[i].date.length; j++) {
								let date = e.data[i].date[j];
								let weather = e.data[i].weather[j];
								let hight_temperature = e.data[i].hight_temperature[j];
								let low_temperature = e.data[i].low_temperature[j];
								// if (weather.length > 2) {
								// 	weather = weather.substr(0, 1);
								// }
								if (weather == '多云转小雨') {
									weather = '阴转雨'
								}
								if (weather =='小雨转多云') {
									weather = '雨转阴'
								}
								if (weather == '雷阵雨转多云') {
									weather = '雨转阴'
								}
								if (weather == '多云转雷阵雨') {
									weather = '阴转雨'
								}
								if (weather == '雷阵雨转小雨') {
									weather = '雨'
								}
								if (weather == '小雨转雷阵雨') {
									weather = '雨'
								}
								// let temperature = e.data[i].temperature[j].split("/");
								// temperature[1] = temperature[1].replace("℃", "");
								let element = {
									dayWeek: date.replace(/\（.*?\）/g, ''),
									//dayLabel: "8/11",
									weatherLabel: weather,
									//weatherIcon: "http://file.powerecs.com/fileserver/fileserver/icon1.png",
									max: hight_temperature == "" ? "30℃":hight_temperature,
									min: low_temperature == "" ? "20℃":low_temperature,
									//wind: "西南风",
									//air: "良"
								}
								weatherList.push(element)								
							}
							this.cityWeathers = weatherList;
						}
						console.log(this.nameWeatherMap);
						this.cityWeathers = this.nameWeatherMap['海口'];
						
						this.initWeatherPointLine();
					}
				})


			}
		},


	}
</script>

<style lang="scss">
	.mckou-weather-content {
		width: 750rpx;

		.more-day-report {
			// 690
			width: 92%;
			padding: 10rpx 4%;

			.top-module {
				width: 100%;
				padding: 16rpx 0;
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				align-items: center;
				border-bottom: 1px solid #f3f3f3;

				.title {
					font-size: 32rpx;
					font-weight: bold;
					color: #262628;
				}

				.change {
					display: flex;
					flex-direction: row;
					justify-content: center;
					align-items: center;
					border: 1px solid #e4e4e4;
					padding: 6rpx 20rpx;
					border-radius: 40rpx;
					font-size: 28rpx;

					.label {
						color: #373739;
					}

					image {
						width: 26rpx;
						height: 26rpx;
						margin-left: 20rpx;
					}

					.down-arrow {
						width: 10px;
						height: 10px;
						margin-left: 10rpx;
					}

					.down-arrow:after {
						content: '';
						display: block;
						width: 5px;
						height: 5px;
						border-right: 2px solid #373739;
						border-top: 2px solid #373739;
						-webkit-transform: rotate(135deg);
						/*箭头方向可以自由切换角度*/
						transform: rotate(135deg);
					}
				}
			}

			.body-module {
				width: 100%;
				padding: 20rpx 0;
				display: flex;
				flex-direction: row;
				position: relative;

				.body-weather-line {
					position: absolute;
					width: 100%;
					height: 100px;
					left: 0;
					top: 10rpx;
					z-index: 1;
				}

				.zhuzhuangtu {
					position: absolute;
					width: 100%;
					height: 80px;
					left: 0;
					top: 10rpx;
					z-index: 1;
					display: flex;
					flex-direction: row;

					.zhuzhuangtu-item {
						width: 98rpx;
						display: flex;
						justify-content: center;
						align-items: center;

						.item-bg {
							height: 80px;
							width: 20rpx;
							background-color: #f9f9f9;
							position: relative;

							.item {
								position: absolute;
								width: 100%;
								background: linear-gradient(to bottom, #a818cb, #4aa2f9);
								border-radius: 20rpx;
							}
						}
					}
				}

				.body-item {
					width: 98rpx;
					border-right: 1px solid #f3f3f3;
					display: flex;
					flex-direction: column;

					.day-font {
						height: 50rpx;
						line-height: 50rpx;
						color: #3a3a3b;
						font-size: 28rpx;
						font-weight: bold;
						text-align: center;
					}

					.day-time {
						height: 50rpx;
						line-height: 50rpx;
						color: #3a3a3b;
						font-size: 24rpx;
						text-align: center;
					}

					.weather-font {
						height: 50rpx;
						line-height: 50rpx;
						color: #3a3a3b;
						font-size: 28rpx;
						text-align: center;
					}

					.weather-image {
						height: 50rpx;
						display: flex;
						justify-content: center;

						image {
							width: 50rpx;
							height: 50rpx;
						}
					}

					.max-weather {
						height: 50rpx;
						line-height: 50rpx;
						color: #3a3a3b;
						font-size: 28rpx;
						text-align: center;
					}

					.min-weather {
						height: 50rpx;
						line-height: 50rpx;
						color: #3a3a3b;
						font-size: 28rpx;
						text-align: center;
					}

					.weather-line {
						height: 100px;
					}

					.feng-font {
						height: 50rpx;
						line-height: 50rpx;
						color: #3a3a3b;
						font-size: 28rpx;
						text-align: center;
					}

					.feng-type {
						height: 50rpx;
						line-height: 50rpx;
						color: #3a3a3b;
						font-size: 28rpx;
						text-align: center;
					}

					.day-state {
						height: 50rpx;
						color: #ffffff;
						display: flex;
						justify-content: center;
						align-items: center;

						label {
							width: 80%;
							height: 40rpx;
							line-height: 40rpx;
							font-size: 28rpx;
							text-align: center;
							background-color: #0fa28e;
							border-radius: 40rpx;
						}
					}

					&:last-child {
						border-right: none;
					}
				}
			}
		}
	}
</style>
