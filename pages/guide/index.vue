<template>
	<view style="display: flex;flex-direction: column;align-items: center;height: 100vh;">
		<cu-custom style="width: 100%;">
			<block style="width: 100%;display: flex;flex-direction: row;align-items: center;" slot="content"><image style="width: 40upx;height: 40upx;" src="http://m.qpic.cn/psc?/V12eKFrM2hLmPp/45NBuzDIW489QBoVep5mceHXTFWcyYv6UyuR2LevA2NhsrL9Ku0ZsyCNOBb5dyQznjobb8NomC6FnpU4TyOsOJAQQ59*BSRwWL3*nUe95uQ!/b&bo=mgHaAZoB2gEDJwI!&rf=viewer_4"></image><text style="height: 40upx;line-height: 40upx;text-align: center;font-size: 30upx;">陆岛城市群智慧旅游</text></block>
		</cu-custom>
		<view class="flex-direction flex justify-center align-center" :class="'bg-'+themeColor.name" style="width: 100%; height: 25%;" :style="[{top:CustomBar + 'px'}]">
			<view class="text-lg text-center " >
				快速规划旅行路线，不错过任何精彩
			</view>
			<button class="cu-btn round bg-white margin-tb-sm" @click="handleMenu('./index-big')">
				<view class="cuIcon-add" :class="'text-' +themeColor.name">创建旅行路线</view>
			</button>
		</view>
		<scroll-view scroll-y="" class="cu-card dynamic margin" style="width: 100%;height: 75%;margin: 0;">
			<view class="cu-item" v-for="(item,index) in list1">
				<view class="flex ">
					<view class="flex justify-between padding-sm" style="background-color: #FFFFFF;width: 100%;">
						<view class="flex text-lg" :class="'text-'+themeColor.name">旅行路线 {{index+1}} {{item[2]}}</view>
						<view v-if="unplayFlag[index]" class="cu-tag bg-red sm round" @click="unplaylook(index)">!</view>
						<view class="flex margin-left text-sm text-gray " @click="look(index)">点击查看<view class="cuIcon-right flex align-center"></view>
						</view>
						<view class="flex  text-sm text-gray" @click="delete1(index)">删除</view>
					</view>
				</view>
				<view class="bg-img padding-top-xl flex align-end" :style="{backgroundImage: 'url('+list[index][Math.floor(Math.random() * (list[index].length) )][2]+')'}"
				 style="height: 300upx;">
					<view class="bg-shadeBottom padding padding-top-xl flex-sub">
						<text>{{item[0]}}</text>
						<view class="flex text-gray text-sm">
							<view>共{{item[1]}}天 </view>
							<view class="padding-left-sm">{{item[1]*2+1-item[0].split("+").length}}个游玩点</view>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>

		<view style="position: absolute;bottom: 150upx;display: flex;flex-direction: column;align-items: center;width: 100%;">
			<view v-if="status==1" style="width: 50%;margin-bottom: 50upx;">	
				<progress :percent="time*(100/(duration/1000))" border-radius="10" color="white" stroke-width="4" backgroundColor="#007AFF" />
			</view>
		</view>
		<image src="../../static/zhushou.png" style="width: 120upx;height: 120upx;position: absolute;bottom: 20upx;z-index: 1000;" @touchstart="kaishi()" @touchend="tingzhi()"></image>
	</view>
</template>

<script>
	import gloalMixin from '@/mixins/global-minxin.js'
	const recorderManager = uni.getRecorderManager()
	const innerAudioContext = uni.createInnerAudioContext()
	var init
	export default {
		mixins:[gloalMixin],
	
		data() {
			return {
				status: 0,
				list: [],
				list1: [],
				
				list1: [],
				listUnplay: {
					127: [{
						'id': 127,
						'address': '天涯海角',
						'using_time': '2021-07-03',
						'event': '受天气影响，天涯海角景区，所以海上项目暂停开放'
					}, {
						'id': 127,
						'address': '蜈支洲岛',
						'using_time': '2021-07-03',
						'event': '由于设备故障，蜈支洲岛暂停开放'
					}],
					78: [{
						'id': 78,
						'address': '天涯海角',
						'using_time': '2021-04-18',
						'event': '受天气影响，天涯海角景区，所有海上项目暂停开放'
					}, {
						'id': 78,
						'address': '天涯海角',
						'using_time': '2021-04-18',
						'event': '受天气影响，天涯海角景区，所以海上项目暂停开放'
					}]
				},
				list1Id: [],
				listUnplayId: [],
				listUnplayEvent: [],
				unplayFlag: [],
				
				
				text:"",
				fileSize: 0,
				time: 0, //录音时长
				duration: 10000, //录音最大值ms 600000/10分钟
				tempFilePath: "", //音频路径
				status: 0, //录音状态 0:未开始录音 1:正在录音 2:暂停录音 3:已完成录音
				playStatus: 0, //录音播放状态 0:未播放 1:正在播放
			};
		},
		onPullDownRefresh() {
			uni.request({
				url: "https://cyye.lbj.wiki/strategy1/get_road_strategy/" + getApp().globalData.id,
				success: e => {
					console.log(e)
					this.list = e.data.date1
					this.list1 = e.data.data2.reverse()
				}
			})
		},
		onShow() {
			if (getApp().globalData.id != null) {
				uni.request({
					url:getApp().globalData.globalUrl+"/wtaishi/weather?userId="+getApp().globalData.id,
					success:e=>{
						getApp().globalData.situationList=e.data
						if(getApp().globalData.situationList.length>0){
							getApp().globalData.notice=""
							getApp().globalData.notice+=e.data[Math.floor(Math.random() * e.data.length)].time+" "+e.data[Math.floor(Math.random() * e.data.length)].city+"："+e.data[Math.floor(Math.random() * e.data.length)].road_id+"，"+e.data[Math.floor(Math.random() * e.data.length)].cweather+"。  "
						}else{
							getApp().globalData.notice="欢迎使用陆岛城市群智慧旅游小程序"
						}
					}
				})
				uni.request({
					url: "https://cyye.lbj.wiki/strategy1/get_road_strategy/" + getApp().globalData.id,
					success: e => {
						console.log(e)
						this.list = e.data.date1.reverse()
						this.list1 = e.data.data2.reverse()
						for (let i = 0; i < this.list1.length; i++) {
							this.unplayFlag.push(false);
						}
						if (this.listUnplay) {
							console.log('wojinlai ');
							for (let i = 0; i < this.list1.length; i++) {
								if (this.listUnplay[this.list1[i][3]] != undefined) {
									this.unplayFlag[i] = true;							
								}
							}
						}
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
		onReady() {
			uni.hideLoading()
		},
		onShareAppMessage() {},
		methods: {
			uploadMp3: function(){
				this.time=0
				uni.showLoading({
					title: '分析中...'
				})
				
				uni.uploadFile({
					url: getApp().globalData.globalUrl+'/zqd/getMp3', //仅为示例，非真实的接口地址
					filePath: this.tempFilePath,
					formData: {
						fileSize: this.fileSize,
						userId: getApp().globalData.id
					},
					name: 'speechMp3',
					success: (res) => {
						uni.request({
							url:getApp().globalData.globalUrl+'/strategy1/get_strategy/'+res.data,
							success: e=> {
								this.text=res.data.substring(2,res.data.length-2)
								console.log(res.data)
								getApp().globalData.travelcity=""
								for (var i = 0; i < e.data[1].length; i++) {						
									getApp().globalData.travelcity+=e.data[1][i]+"+"			
								}
								if(e.data.length<4){
								getApp().globalData.travelcity=getApp().globalData.travelcity.substring(0,getApp().globalData.travelcity.length-1)
								getApp().globalData.travelday=e.data[2]		
								getApp().globalData.strategyList=e.data[0]		
								
								uni.navigateTo({
									url: '/pages/guide/strategy-Customized?text='+this.text
								})
								}else{
									uni.showModal({
										title:"输入信息不正确，请按照，“我想去海口，三亚玩三天。”格式说出您的旅游计划~"
									})
								}
							}
						})
					}
				});
				uni.hideLoading()
			},
			kaishi: function(e) {
				this.status = 1
				clearInterval(init) //清除定时器
				//监听录音自动结束事件(如果不加，录音时间到最大值自动结束后，没获取到录音路径将无法正常进行播放)
				recorderManager.onStop((res) => {
					console.log('recorder stop', res)
					this.tempFilePath = res.tempFilePath
					this.status = 3
					this.recordingTimer(this.time)
				})

				const options = {
					duration: this.duration, //指定录音的时长，单位 ms
					sampleRate: 16000, //采样率
					format: "PCM",
					numberOfChannels: 1, //录音通道数
					encodeBitRate: 48000
				}
				this.recordingTimer()
				recorderManager.start(options)
				// 监听音频开始事件
				recorderManager.onStart((res) => {
					console.log('recorder start')
					this.status = 1
				})
				console.log(this.status);
			},
			tingzhi: function() {
				this.status = 0
				recorderManager.onStop((res) => {
					console.log('recorder stop', res)
					this.tempFilePath = res.tempFilePath
					this.fileSize = res.fileSize
					this.status = 3
					this.uploadMp3()
				})
				this.recordingTimer(this.time)
				recorderManager.stop()
				
			},
			recordingTimer: function(time) {
				var that = this
				if (time == undefined) {
					//将计时器赋值给init
					init = setInterval(function() {
						var time = that.time + 1;
						that.time = time
					}, 1000);
				} else {
					clearInterval(init)
					console.log("暂停计时")
				}
			},
			delete1(index) {
				uni.request({
					url: 'https://cyye.lbj.wiki/strategy1/delete_road_strategy/' + this.list1[index][3],
					success: e => {
						if (e.data === "成功") {
							uni.showToast({
								title: '删除成功'
							})
							this.list1 = this.list1.reverse()
							this.list1.pop()
							this.list1 = this.list1.reverse()
						}
					}
				})
			},
			look(index) {
				if (getApp().globalData.id != null) {
					getApp().globalData.strategyList = this.list[index]
					console.log(getApp().globalData.strategyList)
					uni.navigateTo({
						url: '/pages/guide/strategy-Customized?ifsave=' + false
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
			unplaylook(index) {
				console.log(this.listUnplay);
				console.log(index);
				console.log(this.listUnplay[this.list1[index][3]]);
				
				// getApp().globalData.situationData = this.listUnplay[this.list1[index][3]]
				// getApp().globalData.situationData
				uni.showModal({
					content: "受天气影响，天涯海角景区，所有海上项目暂停开放，请您重新规划。",
					cancelText: '我知道了',
					confirmText: "去规划",
					success: function(res) {
						if (res.confirm) {
							uni.switchTab({
								url: "../guide/index"
							})
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				})
				
				// uni.navigateTo({
				// 	url: "../guide/situationDetail" 
				// })
			},
			// 常用功能点击
			handleMenu(menuUrl) {
				uni.navigateTo({
					url: menuUrl
				})
			},

		},
	}
</script>

<style lang="scss">

</style>
