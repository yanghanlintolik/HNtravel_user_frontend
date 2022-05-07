<template>
	<view>
		<cu-custom :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content"  style="display: flex;flex-direction: row;align-items: center; justify-content: center;" >
				<image style="width: 40upx;height: 40upx;"
					src="http://m.qpic.cn/psc?/V12eKFrM2hLmPp/45NBuzDIW489QBoVep5mceHXTFWcyYv6UyuR2LevA2NhsrL9Ku0ZsyCNOBb5dyQznjobb8NomC6FnpU4TyOsOJAQQ59*BSRwWL3*nUe95uQ!/b&bo=mgHaAZoB2gEDJwI!&rf=viewer_4">
				功能搜索
				</image>
				</block>
		</cu-custom>
		<view class="cu-bar search bg-white">
			<view class="search-form round">
				<text class="cuIcon-search"></text>
				<input v-model="data" @input="change"  @blur="InputBlur" :adjust-position="false" type="text" placeholder="请输入搜索关键字" confirm-type="search"></input>
			</view>
		</view>
		<view class="cu-list grid col-4 margin-tb-sm no-border solids-bottom">
			<view v-if="flag==0" class="cu-tag light round margin" :class="'bg-'+ themeColor.name">暂无搜索内容</view>
			<view class="cu-item" v-for="(item,index) in showMenuList" :key="index" @click="handleMenu(item.url)">
				<view :class="['cuIcon-' + item.cuIcon,'text-' + item.color]">
				</view>
				<text>{{item.name}}</text>
			</view>
		</view>
	</view>	
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	import gloalMixin from '@/mixins/global-minxin.js'
	export default {
		mixins: [gloalMixin],
		components: {
			uniNavBar
		},
		data() {
			return {
				flag:0,
				data: null,
				showMenuList: [],
				AllmenuList: [
					{
							cuIcon: 'deliver_fill',
							color: 'mauve',
							name: '出行规划',
							url: '/pages/traffic/index'
						}, {
							cuIcon: 'appreciatefill',
							color: 'orange',
							name: '专属推荐',
							url: '/pages/index/vipRecommender'
						}, {
							cuIcon: 'rechargefill',
							color: 'yellow',
							name: '消费预警',
							url: '/pages/index/relitu-consume'
						}, {
							cuIcon: 'rankfill',
							color: 'olive',
							name: '景区客流',
							url: '/pages/passengerFlow/forecast'
						}, {
							cuIcon: 'cardboardfill',
							color: 'cyan',
							name: '虚拟导览',
							url: '/pages/index/virtual'
						}, {
							cuIcon: 'discoverfill',
							color: 'blue',
							name: '态势感知',
							url: '/pages/index/culture'
						}, {
							cuIcon: 'shopfill',
							color: 'purple',
							name: '海南美食',
							url: '/pages/index/food'
						}
					],
			}
		},

		methods: {
			// 查询景点
			change() {
				this.showMenuList = []
				for (var i in this.AllmenuList) {
					console.log(this.AllmenuList[i].name)
					if (this.AllmenuList[i].name.search(this.data) != -1 && this.data != "") {
						this.showMenuList.push(this.AllmenuList[i])
						this.flag=1
					}
				}
				if(this.showMenuList.length==0){
					this.flag=0
				}
				console.log(this.showMenuList)
			},
			back(){
				uni.navigateBack({
					delta: 1
				})
			},
			// 常用功能点击
			handleMenu(menuUrl) {
				if (menuUrl == '/pages/index/vipRecommender') {
					console.log("点击啦");
					this.toRecommender()
				} else {
					uni.navigateTo({
						url: menuUrl
					})
				}
			
			},

		}
	}
</script>

<style>
	.search_view {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-start;
	}

	.search_title {
		font-size: 30upx;
	}

	.menu {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: flex-start;
		width: 100%;
		height: auto;
		padding: 20upx;
	}

	.search_input {
		color: #000000;
		background-color:#FFFFFF;
		width: 100%;
		height: 60upx;
		padding-left: 40upx;
		font-size: 30upx;
		border-radius: 10upx;
	}
	.row{
		padding-bottom: 10upx;
		width: 100%;
		margin-top: 20upx;
		border-bottom: solid 1upx #C8C7CC;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: flex-start;
	}
</style>
