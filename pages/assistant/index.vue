<template>
	<view class="container">
		<!--主体-->
		<view class="scroll" :style="{height: scrollHeight}">
			<cu-custom>
				<block slot="content"
					style="display: flex;flex-direction: row;align-items: center; justify-content: center;">
					<image style="width: 40upx;height: 40upx;"
						src="http://m.qpic.cn/psc?/V12eKFrM2hLmPp/45NBuzDIW489QBoVep5mceHXTFWcyYv6UyuR2LevA2NhsrL9Ku0ZsyCNOBb5dyQznjobb8NomC6FnpU4TyOsOJAQQ59*BSRwWL3*nUe95uQ!/b&bo=mgHaAZoB2gEDJwI!&rf=viewer_4">
						旅游小助手
					</image>
				</block>
			</cu-custom>
			<scroll-view :scroll-into-view="scrollViewId" scroll-y style="height: 90%;">
				<view class="item-space"></view>
				<view v-for="(item, index) in list" :key="index">
					<view class="item flex-row" :class="[item.source == fromUserId ? 'right' : 'left']">

						<!--处理头像-->
						<view v-if="item.source == fromUserId">
							<image :src="item.avatarUrl" class="face"></image>
						</view>
						<view v-else>
							<image src="../../static/home_jingqu.png" class="face"></image>
						</view>
						<!--文本-->
						<view v-if="item.msgType == 'text'" class="content flex-row">
							{{ item.content }}
						</view>

					</view>
					<view style="margin-top: 20px;text-align: center;margin-bottom: 20px;">
						{{item.now}}
					</view>
				</view>
				<view id="bottom"></view>
			</scroll-view>

		</view>
		<!--输入-->
		<view class="oper flex-row" @tap.prevent.stop="">
			<!--语音切换-->
			<image v-if="isEdit" @tap="toggleEdit(false)" src="../../static/voice-circle.png" class="icon"></image>
			<image v-else @tap="toggleEdit(true)" src="../../static/keyboard.png" class="icon"></image>
			<!--语音切换-->
			<input v-if="isEdit" @focus="inputFocus" :focus="isFocus" :cursor-spacing="8" :adjust-position="false"
				type="text" v-model="content" class="input" adjust-position="true" placeholder="请输入内容" />
			<view v-else @touchstart="startVoice" @touchend="endVoice" class="input" style="text-align: center;">按住说话
			</view>
			<!--清空信息-->
			<image @tap="delectChat()" src="../../static/de.jpg" class="icon"></image>
			<!--发送-->
			<view @touchend.prevent="send"  class="btn">发送</view>

		</view>
		<!--语音-->
		<my-voice v-show="showVoice"></my-voice>
	</view>
</template>

<script>
	import currentDate from '@/data/getDate.js'
	import myVoice from '@/components/self-voice/index.vue'
	const innerAudioContext = uni.createInnerAudioContext()
	const recorderManager = uni.getRecorderManager()
	innerAudioContext.autoplay = true;
	export default {
		components: {
			myVoice
		},
			
		data() {
			return {
				fileSize: 0,
				now: '',
				avatarUrl: getApp().globalData.image,
				isEdit: true,
				isFocus: false,
				showVoice: false,
				scrollHeight: 'auto', // 内容区域高度
				statusBarHeight: 0, // 状态栏高度
				scrollViewId: '', // 滚动到最底部
				voicePlayingId: '', // 正在播放的消息ID
				content: '',
				list: [],
				socketOpen: false,
				socketMsgQueue: [],
				fromUserId: uni.getStorageSync('userId'),
				fromUserFace: uni.getStorageSync('userFace'),
				toUserId: '',
				toUserName: '',
				time: 0,
				duration: 600000, //录音最大值ms 600000/10分钟
				tempFilePath: "" //音频路径
			}
		},
		onLoad(option) {
			// 初始化内容高度
			this.setScrollHeight()
			//console.log("fromUserId--"+this.fromUserId)
			// 初始化状态栏高度
			uni.getSystemInfo({
				success: res => {
					this.statusBarHeight = res.statusBarHeight
				}
			})

			console.log("avatarUrl1---" + this.avatarUrl)
			// 结束播放
			innerAudioContext.onEnded(res => {
				this.voicePlayingId = ''
			})

			// 设置标题
			uni.setNavigationBarTitle({
				title: option.toUserName
			})

			// 获取参数
			this.toUserId = option.toUserId
			this.toUserName = option.toUserName

			// 获取消息记录
			this.getList()

		},
		onHide() {
			innerAudioContext.stop()
		},
		/* onBackPress() {
			if (this.showEmoji) {
				this.showEmoji = false
				this.setScrollHeight(0)
				return true
			}
			return false
		}, */
		methods: {
			// 初始化滚动
			initScrollBar() {
				setTimeout(() => {
					this.scrollViewId = ''
					setTimeout(() => {
						this.scrollViewId = 'bottom'
						setTimeout(() => {
							this.scrollViewId = ''
						}, 100)
					}, 100)
				}, 100)
			},
			// 监听输入聚焦
			inputFocus(e) {
				this.setScrollHeight(e.detail.height)
				this.initScrollBar()

				uni.onKeyboardHeightChange(res => {
					this.setScrollHeight(res.height)
					this.initScrollBar()
				})
			},
			// 设置scroll的高度
			setScrollHeight(descHeight = 0) {

				this.scrollHeight = `calc(100vh - 110rpx - ${descHeight}px)`
				this.scrollHeight = `calc(100vh - 110upx - ${descHeight}px)`
				this.scrollHeight = `calc(100vh - 110upx - 88rpx - ${descHeight}px)`
			},
			// 切换语音与编辑
			toggleEdit(bool) {
				this.isEdit = bool
				this.isFocus = bool
				this.setScrollHeight(0)
			},
			// 开始录音
			startVoice() {
				this.showVoice = true
				const options = {
					duration: this.duration, //指定录音的时长，单位 ms
					sampleRate: 16000, //采样率
					format: "PCM",
					numberOfChannels: 1, //录音通道数
					encodeBitRate: 48000
				}

				//this.recordingTimer()
				recorderManager.start(options)
				// 监听音频开始事件
				recorderManager.onStart((res) => {
					console.log('recorder start')
				})
			},
			// 结束录音
			endVoice() {
				this.showVoice = false
				recorderManager.onStop((res) => {
					console.log('recorder stop', res)
					this.tempFilePath = res.tempFilePath
					this.fileSize = res.fileSize

				})
				console.log(this.tempFilePath)
				console.log(this.fileSize)
				//this.send(this.tempFilePath)
				uni.uploadFile({
					url: 'https://cyye.lbj.wiki/zqd/getMp3', //仅为示例，非真实的接口地址
					filePath: this.tempFilePath,
					formData: {
						fileSize: this.fileSize,
						userId: 1
					},
					name: 'speechMp3',
					success: (res) => {
						console.log(res)
					}
				})
				recorderManager.stop()
			},
			// 发送消息
			send() {
				uni.showLoading({
					title:'loading...'
				})
				this.now = currentDate.getDate()
				console.log(this.content)
				if (this.content == '出行规划') {
					console.log("出行规划");
					uni.navigateTo({
						url: '/pages/traffic/index'
					})
				} else if (this.content == '专属推荐') {
					console.log("专属推荐");
					uni.navigateTo({
						url: '/pages/index/vipRecommender'
					})
				} else if (this.content == '消费预警') {
					console.log("消费预警");
					uni.navigateTo({
						url: '/pages/index/relitu-consume'
					})
				} else if (this.content == '景区客流') {
					console.log("景区客流");
					uni.navigateTo({
						url: '/pages/passengerFlow/forecast'
					})
				} else if (this.content == '虚拟导览') {
					console.log("虚拟导览");
					uni.navigateTo({
						url: '/pages/index/virtual'
					})
				} else if (this.content == '虚拟导览') {
					console.log("虚拟导览");
					uni.navigateTo({
						url: '/pages/index/virtual'
					})
				} else if (this.content == '态势感知') {
					console.log("态势感知");
					uni.navigateTo({
						url: '/pages/index/culture'
					})
				} else if (this.content == '海南美食') {
					console.log("海南美食");
					uni.navigateTo({
						url: '/pages/index/food'
					})
				} else {

					this.pushMessage(this.content, 'text', () => {
						this.content = ''
					})
				}
			},
			// 推送消息
			pushMessage(content, type = 'text', cb = () => {}) {
				// 组合消息体：需要保存在本地数据库的数据
				let msgData = {
					fromUserId: this.fromUserId,
					userFace: uni.getStorageSync('userFace'),
					toUserId: this.toUserId,
					type,
					content
				}

				// 加入信息
				this.list.push({
					source: this.fromUserId,
					target: this.toUserId,
					content: msgData.content,
					userFace: uni.getStorageSync('userFace'),
					type: 'single',
					msgType: type,
					avatarUrl: this.avatarUrl,
					now: this.now
				})
				// 初始化滚动条
				this.initScrollBar()
				cb ? cb() : this.togglePicker(0, 'file')

				var apiUrl = 'https://cyye.lbj.wiki/query?value=' + encodeURI(
					content);
				uni.request({
					url: apiUrl,
					success: (res) => {
						uni.hideLoading()
						//this.bus.$emit('loading', false);
						console.log('request success:', res.data.answer);
						console.log("avatarUrl2---" + this.avatarUrl)
						// 加入信息
						this.list.push({
							source: this.fromUserId + 1,
							target: this.toUserId,
							content: res.data.answer,
							userFace: uni.getStorageSync('userFace'),
							type: 'single',
							msgType: type,
							avatarUrl: this.avatarUrl,
							now: this.now
						})
						//console.log("source--" + this.fromUserId)
						// 初始化滚动条
						this.initScrollBar()
						cb ? cb() : this.togglePicker(0, 'file')
					},
					fail: (err) => {
						console.log('request fail', err);
						uni.showModal({
							content: err.errMsg,
							showCancel: false
						})
					}
				});
			},
			delectChat: function() {
				let that = this
				that.content = ''
			},

			// 获取记录
			getList() {
				setTimeout(() => {
					this.scrollViewId = 'bottom'
					setTimeout(() => {
						this.scrollViewId = ''
					}, 100)
				}, 100)

			}
		}
	}
</script>

<style lang="scss" scoped>
	.flex-row {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
	}

	.container {
		height: 100vh;
		overflow: hidden;
	}

	/* #ifdef H5 */
	.container {
		height: calc(100vh - 88upx);
	}

	/* #endif */

	.status_bar,
	.container,
	.header,
	.file {
		background-color: #F3F3F3;
	}

	.header {
		border-bottom: 2upx solid #EEE;

		.center {
			font-weight: bold;
		}
	}

	.map {
		width: 60%;
		height: 300upx;
		background-color: #FFF !important;

		&::before {
			border-right: 30upx solid #FFF !important;
		}

		.title {
			height: 80upx;
			font-size: 28upx;
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 2;
			-webkit-box-orient: vertical;
		}

		.box {
			width: 100%;
			height: 170upx;
			margin-top: 10upx;
		}
	}  

	.file {
		padding: 30upx 20upx;

		.list {
			overflow: hidden;
			padding-left: 10upx;
			justify-content: flex-start;
		}

		.item {
			float: left;
			width: 110upx;
			height: 110upx;
			border-radius: 10upx;
			margin-right: 40upx;
			background-color: #FFF;

			.icon {
				width: 50upx;
			}

			.da {
				position: absolute;
				margin-top: 200rpx;
			}

			.text {
				font-size: 24upx;
				margin-top: 4upx;
			}
		}
	}

	.oper {
		height: 110upx;
		padding: 0 20upx;
		box-sizing: border-box;
		border-top: 2upx solid #EEE;
		border-bottom: 2upx solid #EEE;

		.input {
			height: 68upx;
			line-height: 68upx;
			padding: 0 20upx;
			font-size: 28upx;
			border-radius: 10upx;
			background-color: #fff;
			width: calc(100% - 120upx - 20upx - 40upx - 60upx);
		}

		.icon {
			width: 60upx;
			height: 60upx;
		}

		.btn {
			color: #fff;
			width: 90upx;
			height: 52upx;
			font-size: 24upx;
			line-height: 52upx;
			text-align: center;
			border-radius: 10upx;
			background-color: #2BA245;
		}
	}

	.scroll {
		overflow-y: auto;
		transition: all 0.1s ease;
		height: calc(100vh - 88upx - 110upx - var(--status-bar-height));

		/* #ifdef MP-WEIXIN */
		height: calc(100vh - 88upx - var(--status-bar-height));
		/* #endif */
		/* #ifdef H5 */
		height: calc(100vh - 88upx - 110upx - var(--status-bar-height));
		/* #endif */

		.item-space {
			height: 30upx;
		}

		.time {
			color: #666;
			font-size: 24upx;
			text-align: center;
			margin-bottom: 20upx;
		}

		.cancel {
			width: 100%;
			height: 40upx;
			text-align: center;
			margin-bottom: 30upx;

			.text {
				color: #999;
				font-size: 24upx;
			}
		}

		.item {
			margin: 0 30upx 30upx;
			align-items: flex-start;
			justify-content: flex-start;

			.face {
				width: 80upx;
				height: 80upx;
				border-radius: 10upx;
			}

			.content {
				color: #000;
				font-size: 32upx;
				// min-height: 80upx;
				border-radius: 10upx;
				padding: 20upx 24upx;
				background-color: #fff;
				word-break: break-all;
				word-wrap: break-word;
				max-width: calc(100% - 100upx - 120upx);
				position: relative;

				&::before {
					content: '';
					width: 0;
					height: 0;
					border-right: 30upx solid #FFF;
					border-top: 20upx solid transparent;
					border-bottom: 20upx solid transparent;
					position: absolute;
					top: 24upx;
				}

				.voice-icon {
					width: 32upx;
					height: 40upx;
					margin-right: 180upx;
					margin-bottom: -8upx;
				}
			}

			&.left {
				.face {
					margin-right: 30upx;
				}

				.content::before {
					left: -20upx;
				}
			}

			&.right {
				flex-direction: row-reverse;

				.face {
					margin-left: 30upx;
				}

				.content {
					background-color: #A0EA6F;

					&::before {
						right: -20upx;
						transform: rotate(180deg);
						border-right: 30upx solid #A0EA6F;
					}

					.voice-icon {
						margin-right: 0;
						margin-left: 180upx;
						transform: rotate(180deg);
					}
				}
			}
		}

		#bottom {
			height: 0;
		}
	}
</style>
