<template>
	<view>
		<cu-custom :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content"  style="display: flex;flex-direction: row;align-items: center; justify-content: center;" >
				<image style="width: 40upx;height: 40upx;"
					src="http://m.qpic.cn/psc?/V12eKFrM2hLmPp/45NBuzDIW489QBoVep5mceHXTFWcyYv6UyuR2LevA2NhsrL9Ku0ZsyCNOBb5dyQznjobb8NomC6FnpU4TyOsOJAQQ59*BSRwWL3*nUe95uQ!/b&bo=mgHaAZoB2gEDJwI!&rf=viewer_4">
				流量预测
				</image>
				</block>
		</cu-custom>

		<view class="cu-bar search bg-white">
			<view class="search-form round">
				<text class="cuIcon-search"></text>
				<input v-model="inputData" @input="change"  @blur="InputBlur" :adjust-position="false" type="text" placeholder="请输入搜索关键字" confirm-type="search"></input>
			</view>
			<!-- <view class="action">
				<button class="cu-btn bg-green shadow-blur round">搜索</button>
			</view> -->
		</view>
		<view class="bg-white padding-sm" v-if="flag">
			<scroll-view scroll-y style="width: 80%;">
				<view @click="show(index)" class="solids-bottom padding-lr padding-tb-sm" v-for="(item,index) in list">
					<text class="text-grey">{{item.name}}</text>
				</view>
			</scroll-view>
		</view>
		<view class="page-section page-section-gap" v-if="!flag">
			<map :style="{height:pH+'px'}" scale="13" style="width: 100%;" :latitude="latitude" :longitude="longitude" :polyline="polyline">
			</map>
		</view>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	import roadData from "../../data/roadData.js"
	import roadName from "../../data/roadData.js"
	import gloalMixin from '@/mixins/global-minxin.js'
	export default {
		mixins: [gloalMixin],
		data() {
			return {
				list: [],
				inputData: "",
				roadData: roadData,
				roadName: roadName,
				data: "",
				flag: 0,
				pH: 0,
				id: 0, // 使用 marker点击事件 需要填写id
				title: 'map',
				latitude: 20.04102,
				longitude: 110.18724,
				polyline: [],
				covers: [{
					latitude: 39.909,
					longitude: 116.39742,
					iconPath: '../../static/add_image.png'
				}, {
					latitude: 39.90,
					longitude: 116.39,
					iconPath: '../../static/add_image.png'
				}]
			}
		},

		onLoad() {
			
		},
		onReady() {
			uni.getSystemInfo({ //调用uni-app接口获取屏幕高度
				success: res => { //成功回调函数
					this.pH = res.screenHeight //windoHeight为窗口高度，主要使用的是这个

				}
			})
		},
		methods: {
			back(){
				uni.navigateBack({
					delta: 1
				})
			},
			show(index){
				console.log(index)
				var midelData = this.roadData.roadData[this.list[index].id].split(",")
				this.inputData=this.roadName.roadName[this.list[index].id]
				console.log(midelData)
				var weidu = 0.000
				var polyline=[]
				polyline=[{
					"points": [],
					arrowLine: false,
					width: 5,
					"color": "#4922aa"
				}]
				for (var i in midelData) {
					if (i == 0) {
						this.longitude = midelData[0].split(" ")[0],
							this.latitude = midelData[0].split(" ")[1]
					}
					if (weidu < midelData[i].split(" ")[1]) {
						weidu = midelData[i].split(" ")[1]
					}
					polyline[0].points.push({
						"latitude": midelData[i].split(" ")[1],
						"longitude": midelData[i].split(" ")[0]
					})
				}
				console.log(polyline[0].points)
				this.polyline=polyline
				this.flag=0
			},
			change() {
				this.list = []
				console.log(this.roadName.roadName[0])
				console.log(this.inputData)
				for (var i = 0; i < this.roadName.roadName.length; i++) {
					if (this.roadName.roadName[i].search(this.inputData) != -1 && this.inputData != "") {
						console.log("查到啦===")
						this.list.push({"id":i,"name":this.roadName.roadName[i]})
						this.flag = 1
					}
				}
				console.log(this.list)
				if (this.list.length == 0) {
					this.flag = 0
				}
			},
		}
	}
</script>

<style>
	
</style>
