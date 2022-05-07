<template>
	<view>
		<cu-custom :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content"  style="display: flex;flex-direction: row;align-items: center; justify-content: center;" >
				<image style="width: 40upx;height: 40upx;"
					src="http://m.qpic.cn/psc?/V12eKFrM2hLmPp/45NBuzDIW489QBoVep5mceHXTFWcyYv6UyuR2LevA2NhsrL9Ku0ZsyCNOBb5dyQznjobb8NomC6FnpU4TyOsOJAQQ59*BSRwWL3*nUe95uQ!/b&bo=mgHaAZoB2gEDJwI!&rf=viewer_4">
				旅游攻略
				</image>
				</block>
		</cu-custom>
		<scroll-view scroll-y class="DrawerPage" :class="modalName=='viewModal'?'show':''">
			
			<view class="cu-bar bg-white solid-bottom ">
				<view class="action">
					<text class="cuIcon-titles" :class="'text-'+themeColor.name"></text> 请选择旅游天数
				</view>
				<view class="action" @click="handleMenu('/pages/guide/city-weather')">
				
					<view class="cu-tag light sm round" :class="'bg-'+themeColor.name">点击查看天气</view>
				</view>
			</view>
			<view class="padding bg-white solid-bottom ">
				<view class="flex">
					<view class="flex-sub text-center padding-sm margin-xs radius" :class="dayChoose==3?'bg-'+themeColor.name:'bg-grey'" @click="handleChoose3()">3日游</view>
					<view class="flex-sub text-center  padding-sm margin-xs radius" :class="dayChoose == 5 ? 'bg-'+themeColor.name:'bg-grey'" @click="handleChoose5()">5日游</view>
				</view>
			</view>
			<view v-if="dayChoose == 3">
				<view class="cu-bar bg-white solid-bottom " @tap="showModal3" data-target="viewModal">
					<view class="action">
						<text class="cuIcon-roundadd" :class="'text-'+themeColor.name"></text> 选择您想去的城市
					</view>
				</view>
				<view class="bg-white grid col-4 padding-sm" v-if="!!nameList.length">
					<view class="margin-tb-sm text-center" v-for="(item,index) in nameList" :key="index">
						<button class="cu-btn round light" :class="'bg-'+themeColor.name">{{item}}</button>
					</view>
				</view>
				<view class="padding flex flex-direction" v-if="!!nameList.length">
					<button class="cu-btn margin-tb-sm lg" :class="'bg-'+themeColor.name" @click="sendChoose()">提交</button>
				</view>
			</view>
			<view v-if="dayChoose == 5">
				<view class="cu-bar bg-white solid-bottom " @tap="showModal5" data-target="viewModal">
					<view class="action">
						<text class="cuIcon-roundadd " :class="'text-'+themeColor.name"></text> 选择您想去的城市
					</view>
				</view>
				<view class="bg-white grid col-4 padding-sm" v-if="!!nameList.length">
					<view class="margin-tb-sm text-center" v-for="(item,index) in nameList" :key="index">
						<button class="cu-btn round " :class="'bg-'+themeColor.name">{{item}}</button>
					</view>
				</view>
				<view class="padding flex flex-direction" v-if="!!nameList.length">
					<button class="cu-btn margin-tb-sm lg" :class="'bg-'+themeColor.name" @click="sendChoose()">提交</button>
				</view>
			</view>
		</scroll-view>
		<view class="DrawerClose" :class="modalName=='viewModal'?'show':''" @tap="hideModal">
			<text class="cuIcon-pullright"></text>
		</view>
		<scroll-view scroll-y class="DrawerWindow margin-top-lg" :class="modalName=='viewModal'?'show':''">
			<checkbox-group class="block text-black" @change="CheckboxChange" v-for="(item,index) in list" :key="index" @click="getSelectedItems();">
				<!-- #ifndef MP-ALIPAY -->
				<view class="cu-form-group solid-bottom">
					<view class="text-grey cuIcon-github title">{{item.name}}</view>
					
					<checkbox class='round' :class="list[index].checked?'checked':''" :checked="list[index].checked" :disabled="(!list[index].checked)&&(getSelectedNum() >= maxSelectNum)" :value="item.id"></checkbox>
				</view>
				<!-- #endif -->
			</checkbox-group>
		</scroll-view>
	</view>
</template>

<script>
	import gloalMixin from '@/mixins/global-minxin.js'
	export default {
		mixins:[gloalMixin],
		
		data() {
			return {
				modalName: null,
				maxSelectNum: 2,
				dayChoose: '',
				idList: [],
				nameList: [],
				listAll: [],
				weatherListColor: [],
				nameWeatherMap:{},
				list: [{
						id: '1',
						name: '海口',
						checked: false
					},
					{
						id: '2',
						name: '三亚',
						checked: false
					},
					{
						id: '3',
						name: '保亭',
						checked: false
					},
					{
						id: '4',
						name: '陵水',
						checked: false
					},
					{
						id: '5',
						name: '琼海',
						checked: false
					},
					{
						id: '6',
						name: '文昌',
						checked: false
					},
					{
						id: '7',
						name: '万宁',
						checked: false
					},
					{
						id: '8',
						name: '琼中',
						checked: false
					},
					{
						id: '9',
						name: '儋州',
						checked: false
					},
					{
						id: '10',
						name: '五指山',
						checked: false
					},
					{
						id: '11',
						name: '定安',
						checked: false
					},
					{
						id: '12',
						name: '澄迈',
						checked: false
					},
					{
						id: '13',
						name: '屯昌',
						checked: false
					},
					{
						id: '14',
						name: '昌江',
						checked: false
					},
					{
						id: '15',
						name: '临高',
						checked: false
					},
					{
						id: '16',
						name: '乐东',
						checked: false
					},
					{
						id: '17',
						name: '白沙',
						checked: false
					},
					{
						id: '18',
						name: '东方',
						checked: false
					},
				],
			};
		},
		methods: {
			// 常用功能点击
			handleMenu(menuUrl) {
				uni.navigateTo({
					url: menuUrl
				})	
			},
			showModal3(e) {
				this.maxSelectNum = 2;
				this.dayChoose = 3;
				this.modalName = e.currentTarget.dataset.target
			},
			showModal5(e) {
				this.maxSelectNum = 4;
				this.dayChoose = 5;
				this.modalName = e.currentTarget.dataset.target
			},
			handleChoose3() {
				console.log("****************");
				this.dayChoose = 3;
				getApp().globalData.travelday=3
				this.list.checked = false
				this.refreshSelect()
			},
			handleChoose5() {
				this.dayChoose = 5;
				getApp().globalData.travelday=5
				this.list.checked = false
				this.refreshSelect()
			},
			hideModal(e) {
				this.modalName = null
			},
			getSelectedNum() {
				var result = 0;
				for (var i = 0; i < this.list.length; i++) {
					if (this.list[i].checked == true) {
						result += 1;
					}
				}
				return result;
			},
			refreshSelect(){
				for (var i = 0; i < this.list.length; i++) {
					this.list[i].checked = false;
					
				}
				this.idList = []
				this.nameList = []
			},
			getSelectedItems() {
				this.idList = []
				this.nameList = []
				getApp().globalData.travelcity=""
				for (var i = 0; i < this.list.length; i++) {
					if (this.list[i].checked == true) {
						this.idList.push(this.list[i].id);
						this.nameList.push(this.list[i].name);
						
							getApp().globalData.travelcity+=this.list[i].name+"+"
		
					}
				}
				getApp().globalData.travelcity=getApp().globalData.travelcity.substring(0,getApp().globalData.travelcity.length-1)
				//return idList, nameList;
				console.log(this.idList);
				console.log(this.nameList);
			},
			// 复选
			CheckboxChange(e) {
				//console.log(e);
				//debugger;
				var items = this.list;
				var value = e.detail.value;
				var offsetTop = e.target.offsetTop;3
				if (value.length == 0 && offsetTop >= 0) {
					var id = parseInt(offsetTop / 50);
					items[id].checked = false;
					return;
				}
				console.log(e.target.offsetTop);	
				if (this.getSelectedNum() >= (this.maxSelectNum -1)) {
					uni.showToast({
						title: this.dayChoose + "日游最多选" + this.maxSelectNum + "个城市",
						 icon : 'none'		
					});
				}
				for (var i = 0, lenI = items.length; i < lenI; ++i) {
					if (items[i].id == value) {
						//debugger;
						items[i].checked = !items[i].checked;
						this.getSelectedItems();
						break;
					}
				}			
				//console.log(this.list);
			},
			sendChoose() {				
				console.log(this.dayChoose + this.idList);
				getApp().globalData.dayChoose = this.dayChoose
				getApp().globalData.idList = this.idList
				uni.request({
					url: getApp().globalData.globalUrl+"/strategy1/sight_strategy/" + this.dayChoose +"/"+ "["+this.idList + "]"+"/" + 0,
					success: res => {
						console.log(res.data)
						getApp().globalData.strategyList = res.data
						uni.navigateTo({
							url: "./strategy-like"
						})
					}
				})
			}
		}
	}
</script>

<style>
	page {
		background-image: var(--gradualBlue);
		width: 100vw;
		overflow: hidden;
	}

	.DrawerPage {
		position: fixed;
		width: 100vw;
		height: 100vh;
		left: 0vw;
		background-color: #f1f1f1;
		transition: all 0.4s;
	}

	.DrawerPage.show {
		transform: scale(0.9, 0.9);
		left: 85vw;
		box-shadow: 0 0 60upx rgba(0, 0, 0, 0.2);
		transform-origin: 0;
	}

	.DrawerWindow {
		position: absolute;
		width: 85vw;
		height: 100vh;
		left: 0;
		top: 0;
		transform: scale(0.9, 0.9) translateX(-100%);
		opacity: 0;
		pointer-events: none;
		transition: all 0.4s;
		padding: 100upx 0;
	}

	.DrawerWindow.show {
		transform: scale(1, 1) translateX(0%);
		opacity: 1;
		pointer-events: all;
	}

	.DrawerClose {
		position: absolute;
		width: 40vw;
		height: 100vh;
		right: 0;
		top: 0;
		color: transparent;
		padding-bottom: 30upx;
		display: flex;
		align-items: flex-end;
		justify-content: center;
		background-image: linear-gradient(90deg, rgba(0, 0, 0, 0.01), rgba(0, 0, 0, 0.6));
		letter-spacing: 5px;
		font-size: 50upx;
		opacity: 0;
		pointer-events: none;
		transition: all 0.4s;
	}

	.DrawerClose.show {
		opacity: 1;
		pointer-events: all;
		width: 15vw;
		color: #fff;
	}

	.DrawerPage .cu-bar.tabbar .action button.cuIcon {
		width: 64upx;
		height: 64upx;
		line-height: 64upx;
		margin: 0;
		display: inline-block;
	}

	.DrawerPage .cu-bar.tabbar .action .cu-avatar {
		margin: 0;
	}

	.DrawerPage .nav {
		flex: 1;
	}

	.DrawerPage .nav .cu-item.cur {
		border-bottom: 0;
		position: relative;
	}

	.DrawerPage .nav .cu-item.cur::after {
		content: "";
		width: 10upx;
		height: 10upx;
		background-color: currentColor;
		position: absolute;
		bottom: 10upx;
		border-radius: 10upx;
		left: 0;
		right: 0;
		margin: auto;
	}

	.DrawerPage .cu-bar.tabbar .action {
		flex: initial;
	}
</style>
