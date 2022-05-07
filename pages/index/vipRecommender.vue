<template>
	<view>
		<view  class="bg-white nav border-shadow" style="position:fixed;top: 0upx; width: 100%;z-index: 1000;" >
			<cu-custom :isBack="true">
				<block slot="backText">返回</block>
				<block slot="content"  style="display: flex;flex-direction: row;align-items: center; justify-content: center;" >
					<image style="width: 40upx;height: 40upx;"
						src="http://m.qpic.cn/psc?/V12eKFrM2hLmPp/45NBuzDIW489QBoVep5mceHXTFWcyYv6UyuR2LevA2NhsrL9Ku0ZsyCNOBb5dyQznjobb8NomC6FnpU4TyOsOJAQQ59*BSRwWL3*nUe95uQ!/b&bo=mgHaAZoB2gEDJwI!&rf=viewer_4">
					专属推荐
					</image>
					</block>
			</cu-custom>
			<view class="flex text-center" >
				<view class="cu-item flex-sub" :class="index == activeTab?'cur text-' +themeColor.name:'text-gray'" v-for="(tab,index) in tabList" :key="index" @click="tabSelect(index)"
				 :data-id="index">
					{{tab.name}}
				</view>
			</view>
		</view>
		<!-- 列表卡片 -->
		<view style="margin-top: 220upx;">
			<view class="cu-card article " v-if="activeTab==0">
				<view class="cu-item shadow-orange" v-for="(item,index) in meishi">
					<view class="title flex justify-between">
						<view class="text-cut">{{item[1]}}</view>
					</view>
					<view class="content">
						<image :src="item[7]" mode="aspectFill"></image>
						<view class="desc">
							<view>类型：<view class="cu-tag bg-red light sm round">{{item[4]}}</view>
							</view>
							<view>评分：<view class="cu-tag bg-green light sm round">{{item[2]}}分</view>
							</view>
							
							<view>地址：<text class="text-content">{{item[3]}}</text></view>
						</view>
					</view>
				</view>
			</view>
			<view class="cu-card article" v-if="activeTab==1">
				<view class="cu-item shadow-orange" v-for="(item,index) in jingdian">
					<view class="title">
						<view class="text-cut">{{item[1]}}</view>
					</view>
					<view class="content">
						<image :src="item[6]" mode="aspectFill"></image>
						<view class="desc">
							<view>类型：<view class="cu-tag bg-red light sm round">{{item[4]}}</view>
							</view>
							<view>评分：<view class="cu-tag bg-green light sm round">{{item[2]}}分</view>
							</view>
							<view>地址：<text class="text-content">{{item[3]}}</text></view>
						</view>
					</view>
				</view>
			</view>
			<view class="cu-card article" v-if="activeTab==2">
				<view class="cu-item shadow-orange" v-for="(item,index) in jiudian">
					<view class="title">
						<view class="text-cut">{{item[1]}}</view>
					</view>
					<view class="content">
						<image :src="item[6]" mode="aspectFill"></image>
						<view class="desc">
							<view>星级：<view class="cu-tag bg-red light sm round">{{item[4]}}</view>
							</view>
							<view>评分：<view class="cu-tag bg-green light sm round">{{item[2]}}分</view>
							</view>
							
							<view>地址：<text class="text-content">{{item[3]}}</text></view>
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
		mixins: [gloalMixin],
		data() {
			return {
				
				tabList: [{
						index: 0,
						name: '美食'
					},
					{
						index: 1,
						name: '景点'
					},
					{
						index: 2,
						name: '酒店'
					}
				],
				activeTab: 0,
				id: "",
				itemId: "",
				title: "",
				meishi: [],
				jingdian: [],
				jiudian: [],
			}
		},
		onReady() {
			let that = this;
		},
		onLoad() {
			uni.showLoading({
				title: '加载中...',
			});
			this.id = getApp().globalData.id
			uni.request({
				url: getApp().globalData.globalUrl+"/based_user_recommend?inputUserID=" + this.id + "&classification=2",
				success: (e) => {
					this.meishi = e.data
					console.log(e.data[0])
					setTimeout(() => {
						uni.hideLoading();
					}, 2000)
				}
			})
		},
		methods: {
			// 顶部tab切换
			tabSelect(index) {
				this.activeTab = index;
				if(this.activeTab ==0) {
					uni.request({
						url: getApp().globalData.globalUrl+"/based_user_recommend?inputUserID=" + this.id + "&classification=2",
						success: (e) => {
							this.meishi = e.data
							console.log(e.data[0][0])
							this.flagLikeMeishi.push(false)
						}
					})
				}
				if(this.activeTab ==1) {
					uni.request({
						url: getApp().globalData.globalUrl+"/based_user_recommend?inputUserID=" + this.id + "&classification=1",
						success: (e) => {
							this.jingdian = e.data
							console.log(e.data[0])
						}
					})
				}
				if(this.activeTab ==2) {
					uni.request({
						url: getApp().globalData.globalUrl+"/based_user_recommend?inputUserID=" + this.id + "&classification=3",
						success: (e) => {
							this.jiudian = e.data
							console.log(e.data[0])
						}
					})
				}
			}
			
		}
	}
</script>

<style>

</style>
