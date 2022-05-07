<template>
	<view class="content" style="height: 100%;width: 100%;background-color: #FFFFFF;">
		<cu-custom :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content"  style="display: flex;flex-direction: row;align-items: center; justify-content: center;" >
				<image style="width: 40upx;height: 40upx;"
					src="http://m.qpic.cn/psc?/V12eKFrM2hLmPp/45NBuzDIW489QBoVep5mceHXTFWcyYv6UyuR2LevA2NhsrL9Ku0ZsyCNOBb5dyQznjobb8NomC6FnpU4TyOsOJAQQ59*BSRwWL3*nUe95uQ!/b&bo=mgHaAZoB2gEDJwI!&rf=viewer_4">
				态势感知
				</image>
				</block>
		</cu-custom>
		<view class="flex text-center margin-tb-sm">
			<view class="cu-item flex-sub" :class="index == activeTab?'cur text-'+themeColor.name:'text-gray'" v-for="(tab,index) in tabList" :key="index"
			 @click="tabSelect(index)" :data-id="index">
				{{tab.name}}
			</view>
		</view>
		<view v-if="activeTab==0" style="width: 100%;height: 100%;display: flex;flex-direction: column;align-items: flex-start;">
			<map_for style="height: 100%;width: 100%;"></map_for>
		</view>
		<view v-if="activeTab==1" style="width: 100%;height: 100%;display: flex;flex-direction: column;align-items: flex-start;">
			<view class="cu-bar bg-white ">
				<view class="action">
					<text class="cuIcon-titles" :class="'text-'+ themeColor.name"></text>高速态势感知
				</view>
			</view>
			<!-- broadcastType:text  模式 bottom -->
			<view style="padding-bottom: 10upx;border-bottom: solid 1upx #f0f0f0;color:gray;width: 100%;">
				<view style="margin-left: 20upx;margin-top: 10upx;" v-for="(index,item) in broadcastData">
					{{index}}
				</view>
			</view>
			<view class="cu-bar bg-white ">
				<view class="action">
					<text class="cuIcon-titles" :class="'text-'+ themeColor.name"></text>天气监测
				</view>
			</view>
			<!-- broadcastType:text  模式 bottom -->
			<view style="padding-bottom: 10upx;border-bottom: solid 1upx #f0f0f0;color:gray;width: 100%;">
				<view style="margin-left: 20upx;margin-top: 10upx;" v-for="(index,item) in broadcastData3">
					{{index}}
				</view>
			</view>
			<view class="cu-bar bg-white ">
				<view class="action">
					<text class="cuIcon-titles " :class="'text-'+ themeColor.name"></text>飞机高铁态势感知
				</view>
			</view>
			<!-- broadcastType:text  模式 bottom -->
			<view style="padding-bottom: 10upx;border-bottom: solid 1upx #f0f0f0;color:gray;width: 100%;">
				<view style="margin-left: 20upx;margin-top: 10upx;" v-for="(index,item) in broadcastData1">
					{{index}}
				</view>
			</view>
			<view class="cu-bar bg-white ">
				<view class="action">
					<text class="cuIcon-titles " :class="'text-'+ themeColor.name"></text>景区态势感知
				</view>
			</view>
			<!-- broadcastType:text  模式 bottom -->
			<view style="padding-bottom: 10upx;border-bottom: solid 1upx #f0f0f0;color:gray;width: 100%;">
				<view style="margin-left: 20upx;margin-top: 10upx;" v-for="(index,item) in broadcastData2">
					{{index}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	var _self;
	import gloalMixin from '@/mixins/global-minxin.js'
	import map_for from "../../components/map-forecast.vue"
	export default {
		mixins: [gloalMixin],
		components: {
			map_for
		},
		data() {
			return {
				tabList: [{
						index: 0,
						name: '态势地图'
					},
					{
						index: 1,
						name: '态势描述'
					}
				],
				activeTab: 0,
				title: 'Hello',
				broadcastData: [],
				broadcastData1: [],
				broadcastData2: [],
				broadcastData3: [],
				broadcastStyle: {
					speed: 15, //每秒3个字
					font_size: "32", //字体大小(rpx)
					text_color: "#f8dcc0", //字体颜色
					back_color: "#1f1d45", //背景色
					viewHeight: "600"
				},
				imgdata: [],
				roadList: [],
				roadList1: []
			}
		},
		onLoad() {
			var date=new Date()
			uni.request({
				url: "https://cyye.lbj.wiki/road/海南/"+date.getFullYear()+"-"+date.getMonth().toString().padStart(2,'0')+"-"+date.getDay().toString().padStart(2,'0'),
				success: e => {
					for (var i = 0; i < e.data.information.length; i++) {
						this.roadList.push(e.data.information[i].information +
							"\n" + e.data.information[i].using_time + "\n" + e.data.information[i].road_state)
					}
				},

			})
			uni.request({
				url: "https://cyye.lbj.wiki/fly_railway/"+date.getFullYear()+"-"+date.getMonth().toString().padStart(2,'0')+"-"+date.getDay().toString().padStart(2,'0'),
				success: e => {

					this.roadList1.push(e.data.fly_state[0].event +
						"\n" + e.data.fly_state[0].state)
					this.roadList1.push(e.data.railway[0].name + "\n" + e.data.railway[0].state)
					this.roadList1.push(e.data.railway[1].name + "\n" + e.data.railway[1].state)


				},

			})

			this.broadcastData = this.roadList


			this.broadcastData1 = this.roadList1


			this.broadcastData2 = ["所有景区正常运营"]


			this.broadcastData3 = ["海口天气白天: 多云, 风力;3 级;夜间: 暴雨, 风力;5 级 ",
				"三亚天气白天: 多云, 风力3~4 级;夜间: 多云, 风力;3 级 ",
				"儋州天气白天: 小雨, 风力3~4 级;夜间: 大雨, 风力;4 级 ",
				"陵水天气白天: 小雨, 风力;3 级;夜间: 小雨, 风力;3 级 ",
				"保亭天气白天: 小雨, 风力;3 级;夜间: 小雨, 风力;3 级 ",
				"琼海天气白天: 多云, 风力;3 级;夜间: 小雨, 风力;3 级 ",
				"五指山天气白天: 多云, 风力;3 级;夜间: 多云, 风力;3 级 "
			]

		},
		methods: {
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
				}
			},
		}
	}
</script>

<style>
</style>
