<template>
	<view>
		<view class="bg-white nav border-shadow" style="position:fixed;top: 0upx; width: 100%;z-index: 1000;">
			<cu-custom :isBack="true">
				<block slot="backText">返回</block>
				<block slot="content">我的信息</block>
			</cu-custom>
		</view>

		<view style="margin-top: 200upx;">
			
				<view class="cu-timeline " v-for="(item,index) in situationList ">
					<view class="cu-time"></view>
					<view class="cu-item text-red">
						<view class="content">
							<view class="cu-capsule radius">
								<view class="cu-tag bg-cyan">{{item.time}}</view>
								<view class="cu-tag line-cyan">{{item.city}}</view>
							</view>
							<view class="margin-top">{{item.road_id}}:{{item.cweather}}</view>
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
				activeTab: 0,
				id: "",
				itemId: "",
				title: "",
				
				jingdian: [],
				jiudian: [],
				situationList: []
			};
		},
		onLoad(options) {
			if(getApp().globalData.situationList.length>0){
				this.situationList = getApp().globalData.situationList
			}else{
				var date=new Date()
				this.situationList=[{"id":null,"road_id":"小程序助手","user_id":"1108933679","time":date.getFullYear()+"-"+date.getMonth().toString().padStart(2,'0')+"-"+date.getDay().toString().padStart(2,'0'),"city":"小程序助手","cweather":"欢迎使用陆岛城市群智慧旅游小程序"}]
				console.log(this.situationList)
			}
		},
		methods: {
			
			
			
		
		}

	}
</script>

<style>

</style>
