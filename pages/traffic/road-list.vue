<template>
	<view>
		<cu-custom :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content"  style="display: flex;flex-direction: row;align-items: center; justify-content: center;" >
				<image style="width: 40upx;height: 40upx;"
					src="http://m.qpic.cn/psc?/V12eKFrM2hLmPp/45NBuzDIW489QBoVep5mceHXTFWcyYv6UyuR2LevA2NhsrL9Ku0ZsyCNOBb5dyQznjobb8NomC6FnpU4TyOsOJAQQ59*BSRwWL3*nUe95uQ!/b&bo=mgHaAZoB2gEDJwI!&rf=viewer_4">
				我的路线列表
				</image>
				</block>
		</cu-custom>
		<view>
			<view class="bg-white margin-lr-sm margin-tb-lg padding radius border-shadow" v-for="(o,index) in roadList" :key="index"  >
				<view class="flex align-center flex-between">
					<view class="flex-sub">
						<view class="flex align-center justify-between">
							<text :class="'text-'+themeColor.name" >{{o.startPlace}}—{{o.endPlace}}</text>
							<text v-if="o.id == 1" class="cuIcon-warnfill  text-red" @click="warn(index)">警告</text> 
						</view>
						<view class="text-gray text-sm flex justify-between">
							路线时间：{{o.date}}
							<view class="text-gray text-sm">
								<text class="cuIcon-attentionfill margin-lr-xs" @click="look(index)">查看</text>
								<text class="cuIcon-deletefill margin-lr-xs" @click="delete1(index)">删除</text> 
							</view>
						</view>					
					</view>
				</view>
			</view>
		</view>
	<view v-if="roadList.length == 0 " class="cu-load over"></view>
	</view>
</template>

<script>
	import gloalMixin from '@/mixins/global-minxin.js';	
	import event from '@/common/event.js';
	var _this;
	export default {
		mixins: [gloalMixin],
		data() {
			return {
				description: '我的路线列表',
				// 所有路线
				roadList: [],
				id: ""
			}
		},
		created() {
			_this = this;
			this.id = getApp().globalData.id
			// 监听事件，刷新列表
			uni.$on(event.REFRESH_GENERAL_ROAD_LIST, (status) => {
				_this.loadData();
			});
		},
		methods: {
			// 加载数据
			loadData() {
				console.log(this.id);
				uni.showLoading({
					title: '加载中...',
				});				
				uni.request({
					url: getApp().globalData.globalUrl+"/zqd/userRoad1/getAll/" + this.id,
					success: (e) => {
						// console.log(e.data[0]);
						this.roadList = e.data	
						console.log(this.roadList);
						for (var i = 0; i < this.roadList.length; i++) {
							var temp = this.roadList[i];
							var names = temp.roadData.split("&");
							var times = temp.date.split(" ");
							temp.startPlace = names[0];
							temp.endPlace = names[1];
							temp.priority = names[2];	
							temp.time = times[1];	
							temp.dateDay = times[0]					
						}						
						
							uni.hideLoading();
					
					}
				})
				
			
			},
			delete1(index) {				
				// this.roadList.splice(index,1); 				
				console.log(this.roadList[index].start_place);
				uni.request({
					url: 'https://cyye.lbj.wiki/zqd/userRoad2/delete?userId=' + this.id + '&date=' + this.roadList[index].date,
					success: e => {
						uni.$emit(event.REFRESH_GENERAL_ROAD_LIST);
							uni.showToast({
								title: '删除成功'
							})					
					}
				})
			},
			look(index) {				
					uni.navigateTo({
						url: '/pages/traffic/road-detail?start_place=' + this.roadList[index].startPlace + '&end_place=' + this.roadList[index].endPlace + "&date=" + this.roadList[index].dateDay + "&time=" + this.roadList[index].time + "&priority=" + this.roadList[index].priority,
					})
									
			},
			warn(index) {
				uni.showModal({
					title: '警告',
					content: '路线存在风险，请重新规划',
					success(r) {
						if (r.confirm) {
							uni.navigateTo({
								url: '/pages/traffic/index'
							})
						}
					}
				})
			}
		},
		onLoad() {

			 this.loadData();
		}
	
	}
</script>

<style lang="scss" scoped>

</style>
