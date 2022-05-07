<template>
	<view class="sound-recording">
		<view class="time">{{status==0?'录音时长':(status==3?'录音已完成':'正在录音中')}}：{{time}} 秒</view>
		<view class="progress">
			<text class="txt">最大录音时长（{{duration/1000}}秒 = {{duration/60000}}分钟）</text>
			<progress :percent="time*(100/(duration/1000))" border-radius="10" color="green" stroke-width="10" backgroundColor="#fff" />
		</view>
		<view class="anniu">
			<view :class="status==0?'row':'no-clicking'" @click="kaishi" hover-class="jump-hover">开始</view>

			<view :class="status==1 || status==2?'row':'no-clicking'" @tap="tingzhi" hover-class="jump-hover">停止</view>
		</view>
		<button @click="uploadMp3()">文件上传</button>
	</view>
</template>

<script>
	const recorderManager = uni.getRecorderManager()
	const innerAudioContext = uni.createInnerAudioContext()
	var init
	export default {
		data() {
			return {
				fileSize:0,
				time: 0, //录音时长
				duration: 60000,//录音最大值ms 600000/10分钟
				tempFilePath: "", //音频路径
				status: 0, //录音状态 0:未开始录音 1:正在录音 2:暂停录音 3:已完成录音
				playStatus: 0, //录音播放状态 0:未播放 1:正在播放
			}
		},
		methods: {
			uploadMp3(){
				const option = {
				        url: 'http://192.168.31.226:8080/zqd/getMp3',
				        filePath:this.tempFilePath,
				        formData: {
							fileSize:this.fileSize,
				            userId:"10213132"
				        },
				        name: 'speechMp3',
				    }
				    uni.showLoading({
				        title: '录音上传中...'
				    })
				    uni.uploadFile(option)
				    uni.hideLoading()
			},
			kaishi: function() {
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
					format:"PCM",
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
				recorderManager.onStop((res) => {
					console.log('recorder stop', res)
					this.tempFilePath = res.tempFilePath
					this.fileSize=res.fileSize
					this.status = 3
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
		}
	}
</script>

<style>
	.sound-recording {
		background-color: rgb(234, 234, 234);
		margin: 10rpx 30rpx;
		border-radius: 20rpx;
		padding: 5rpx 0rpx;
	}

	.btn {
		margin: 0rpx 100rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.btn .show {
		padding: 10rpx;
		width: 200rpx;
		font-size: 25rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: rgb(178, 228, 228);
		border-radius: 20rpx;
		border: 5rpx solid rgb(127, 204, 214);
	}

	.btn .hide {
		padding: 10rpx;
		width: 200rpx;
		font-size: 25rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 20rpx;
		border: 5rpx solid #eee;
		pointer-events: none;
		background-color: rgba(167, 162, 162, 0.445);
	}

	.time {
		line-height: 70rpx;
		text-align: center;
		font-size: 30rpx;
	}

	.progress {
		margin: 20rpx;
	}

	.play {
		margin: 0rpx 20rpx;
	}

	.txt {
		display: flex;
		justify-content: center;
		line-height: 60rpx;
		font-size: 25rpx;
	}

	.anniu {
		margin: 10rpx 50rpx;
		display: flex;
		justify-content: space-between;
	}

	.row {
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 50%;
		font-size: 25rpx;
		width: 80rpx;
		height: 80rpx;
		background-color: rgb(178, 228, 228);
		border: 5rpx solid rgb(127, 204, 214);
	}

	.jump-hover {
		transform: scale(0.9);
	}

	/*禁止点击*/

	.anniu .no-clicking {
		pointer-events: none;
		background-color: rgba(167, 162, 162, 0.445);
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 50%;
		font-size: 25rpx;
		width: 80rpx;
		height: 80rpx;
		border: 5rpx solid rgb(241, 244, 245);
	}
</style>
