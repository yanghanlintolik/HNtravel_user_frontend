<template>
	<view style="background-color: #FFFFFF;height: 100vh;" >
		<cu-custom :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content"  style="display: flex;flex-direction: row;align-items: center; justify-content: center;" >
				<image style="width: 40upx;height: 40upx;"
					src="http://m.qpic.cn/psc?/V12eKFrM2hLmPp/45NBuzDIW489QBoVep5mceHXTFWcyYv6UyuR2LevA2NhsrL9Ku0ZsyCNOBb5dyQznjobb8NomC6FnpU4TyOsOJAQQ59*BSRwWL3*nUe95uQ!/b&bo=mgHaAZoB2gEDJwI!&rf=viewer_4">
				个人信息
				</image>
				</block>
		</cu-custom>
		<view class="head_view">
			<image class="image_view" :src="image"></image>
		</view>
		<view class="head_view1">
			<text>电话</text>
			<input placeholder="请输入手机号码" class="input" v-model="tel" value="asf" />
		</view>

		<view class="head_view1">
			<view class="uni-list-cell-left">
				生日
			</view>
			<view class="date">
				<picker mode="date" :value="date" @change="bindDateChange">
					<view class="uni-input">{{date}}</view>
				</picker>
			</view>
		</view>
		<view class="head_view1">
			<view class="uni-list-cell-left">
				职业
			</view>
			<view class="date">
				<picker @change="bindPickerChange" :value="index" :range="array">
					<view class="uni-input">{{profession}}</view>
				</picker>
			</view>
		</view>
		<view class="head_view1">
			<view class="uni-list-cell-left">
				住址
			</view>
			<view class="date">
				<gb-picker @update="update" :name="name1" @change="change">
					<text>{{text}}</text>
				</gb-picker>
			</view>
		</view>
		<view class="pc_row1">
			<text>选择标签</text>
		</view>
		<view class="pc_row2">
			<text class="pc_text">酒店</text>
			<checkbox-group class="content-class" @change="chooseMaleLike1">
				<label class="item" v-for="(item, index) in items1" :key="index" :class="{on: item.isChecked}">
					<checkbox :disabled="item.disabled" :value="item.value"></checkbox>
					<text class="item-text">{{item.text}}</text>
				</label>
			</checkbox-group>
		</view>
		<view class="pc_row2">
			<text class="pc_text">美食</text>
			<checkbox-group class="content-class" @change="chooseMaleLike2">
				<label class="item" v-for="(item, index) in items2" :key="index" :class="{on: item.isChecked}">
					<checkbox :disabled="item.disabled" :value="item.value"></checkbox>
					<text class="item-text">{{item.text}}</text>
				</label>
			</checkbox-group>
		</view>
		<view class="pc_row2">
			<text class="pc_text">景点</text>
			<checkbox-group class="content-class" @change="chooseMaleLike3">
				<label class="item" v-for="(item, index) in items3" :key="index" :class="{on: item.isChecked}">
					<checkbox :disabled="item.disabled" :value="item.value"></checkbox>
					<text class="item-text">{{item.text}}</text>
				</label>
			</checkbox-group>
		</view>
		<button @click="upload" class="button" :class="'bg-'+themeColor.name">修改</button>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	import gloalMixin from '@/mixins/global-minxin.js'
	export default {
		mixins:[gloalMixin],
		data() {
			const currentDate = this.getDate({
				format: true
			})
			return {
				array: ['在校学生', '政府/机关干部/公务员', '企业管理者(包括基层及中高层管理者)', '普通职员(办公室/写字楼工作人员)',
					'专业人员(如医生/律师/文体/记者/老师等)', '普通工人(如工厂工人/体力劳动者等)', '商业服务业职员(如销售人员/商店职员/服务员等)',
					'个体经营者/承包商', '自由职业者', '农林牧渔劳动者', '退休', '暂无职业', '其他'
				],
				index: 0,
				text:  "请选择",
				profession: "请选择",
				imgFiles: " ",
				tel:getApp().globalData.tel,
				name1:getApp().globalData.address.split("/"),
				image: getApp().globalData.image,
				date: "请选择",
				items: [{
						value: '男',
						name: '男',
						checked: 'true',
					},
					{
						value: '女',
						name: '女',
				
					},
				],
				current: 0,
				items1: [{
						text: '交通便利',
						value: '交通便利'
					},
					{
						text: '安静',
						value: '安静'
					},
					{
						text: '性价比高',
						value: '性价比高'
					}
				],
				items2: [{
						text: '服务周到',
						value: '服务周到',
					}, {
						text: '有特色',
						value: '有特色'
					},
					{
						text: '环境优雅',
						value: '环境优雅'
					}
				],
				items3: [{
						text: '风景秀丽',
						value: '风景秀丽'
					},
					{
						text: '值得去',
						value: '值得去'
					},
					{
						text: '空气清新',
						value: '空气清新'
					}
				],
				str1: "",
				str2: "",
				str3: "",
				str: "",
				
			}
		},
		onLoad() {
			console.log(getApp().globalData.address)
			if (getApp().globalData.birthday != null) {
				this.date = getApp().globalData.birthday
			}
			if (getApp().globalData.profession != null) {
				this.profession = getApp().globalData.profession
			}
			this.name1=getApp().globalData.address.split("/")
			console.log(this.name1)
		},
		methods: {
			radioChange: function(evt) {
				for (let i = 0; i < this.items.length; i++) {
					if (this.items[i].value === evt.target.value) {
						this.current = i;
						break;
					}
				}
			},
			chooseMaleLike1: function(e) {
				var flag = 2;
				var items1 = this.items1,
					values = e.detail.value;
				for (var i = 0, lenI = items1.length; i < lenI; ++i) {
					const item1 = items1[i]
					this.$set(item1, 'disabled', false)
					if (values.includes(item1.value)) {
						flag++;
						if (flag > 3) {
							this.$set(item1, 'checked', false)
							uni.showModal({
								content: "同类标签最多选择一个"
							})
							break;
						} else {
							this.$set(item1, 'checked', true)
						}
					} else {
						flag--;
						this.$set(item1, 'checked', false)
					}
				}
				this.str1 = ""
				for (var i = 0, lenI = items1.length; i < lenI; ++i) {
					if (this.items1[i].checked === true) {
						this.str1 = this.str1 + this.items1[i].value
					} else {
						console.log(flag)
						if (flag != -1)
							this.$set(items1[i], 'disabled', true)
					}
				}
				console.log(this.str1)
			},
			chooseMaleLike2: function(e) {
				var flag = 2;
				var items2 = this.items2,
					values = e.detail.value;
				for (var i = 0, lenI = items2.length; i < lenI; ++i) {
					const item2 = items2[i]
					this.$set(item2, 'disabled', false)
					if (values.includes(item2.value)) {
						flag++;
						if (flag > 3) {
							this.$set(item2, 'checked', false)
							uni.showModal({
								content: "同类标签最多选择一个"
							})
							break;
						} else {
							this.$set(item2, 'checked', true)
						}
					} else {
						flag--;
						this.$set(item2, 'checked', false)
					}
				}
				this.str2 = ""
				for (var i = 0, lenI = items2.length; i < lenI; ++i) {
					if (this.items2[i].checked === true) {
						this.str2 = this.str2 + this.items2[i].value
					} else {
						console.log(flag)
						if (flag != -1)
							this.$set(items2[i], 'disabled', true)
					}
				}
				console.log(this.str2)
			},
			chooseMaleLike3: function(e) {
				var flag = 2;
				var items3 = this.items3,
					values = e.detail.value;
				for (var i = 0, lenI = items3.length; i < lenI; ++i) {
					const item3 = items3[i]
					this.$set(item3, 'disabled', false)
					if (values.includes(item3.value)) {
						flag++;
						if (flag > 3) {
							this.$set(item3, 'checked', false)
							uni.showModal({
								content: "同类标签最多选择一个"
							})
							break;
						} else {
							this.$set(item3, 'checked', true)
						}
					} else {
						flag--;
						this.$set(item3, 'checked', false)
					}
				}
				this.str3 = ""
				for (var i = 0, lenI = items3.length; i < lenI; ++i) {
					if (this.items3[i].checked === true) {
						this.str3 = this.str3 + this.items3[i].value
					} else {
						console.log(flag)
						if (flag != -1)
							this.$set(items3[i], 'disabled', true)
					}
				}
				console.log(this.str3)
			},
			update(e) {
				this.text = e.name.join('/')
			},
			change(e) {
				console.log(e.code)
				this.text = e.name.join('/')
			},
			back() {
				uni.navigateBack({
					delta: 1
				})
			},
			bindPickerChange(e) {
				console.log(e.detail.value)
				this.profession=this.array[e.detail.value]
			},
			bindDateChange: function(e) {
				this.date = e.target.value
			},
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();

				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			},
			chooseImage() {
				uni.chooseImage({
					count: 1,
					sizeType: ['original', 'compressed'],
					sourceType: ['album'],
					success: res => {
						// 预览图片
						this.imgFiles = res.tempFilePaths[0],
							this.image = res.tempFilePaths[0]
						console.log(this.imgFiles)
					}
				});
			},
			upload: function() {
				getApp().globalData.tel=this.tel
				getApp().globalData.name = this.name
				getApp().globalData.address = this.text
				getApp().globalData.birthday = this.date
				getApp().globalData.profession=this.profession
				getApp().globalData.lable=this.str1 + "," + this.str2 + "," + this.str3
				uni.request({
					url:getApp().globalData.globalUrl+"/zqd/payment/updateMessage",
					data:{
						openId:getApp().globalData.openId,
						id:getApp().globalData.id,
						userBirthday: this.date,
						userAddress: this.text,
						userProfession: this.profession,
						userTel: this.tel,
						userLable:this.str1 + "," + this.str2 + "," + this.str3,
						
					},
					method:'POST',
					success: (res) => {
						uni.showToast({
							title:"修改成功"
						})
					}
				})
				

			},
			
			
		},
	}
</script>

<style>
	.contain_view {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-start;

	}

	.head_view {
		width: 90%;
		height: 200upx;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: flex-start;
		border-bottom: solid 1upx #C8C7CC;
		padding-left: 20upx;
	}

	.head_view1 {
		width: 90%;
		height: 100upx;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: flex-start;
		border-bottom: solid 1upx #C8C7CC;
		padding-left: 20upx;
	}

	.image_view {
		width: 100upx;
		height: 100upx;
		border-radius: 50%;
	}

	.text1 {
		margin-left: 30upx;
		font-size: 40upx;
	}

	.input {
		font-size: 35upx;
		width: 60%;
		margin-left: 40upx;
	}

	.radio_item {
		display: flex;
		flex-direction: row;
		align-items: center;
		margin-left: 20upx;
	}

	.radio {
		display: flex;
		flex-direction: row;
		align-items: center;
		margin-left: 20upx;
	}

	.date {
		margin-left: 40upx;
	}

	.button {
		margin-top: 80upx;
		width: 90%;
		height: 80upx;
		line-height: 80upx;
		text-align: center;
		
		color: #FFFFFF;
		border-radius: 10upx;
	}
	.content-class {
		width: 80%;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		margin-left: 20upx;
	}
	.pc_row {
		width: 80%;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: flex-start;
		border-bottom: solid 1upx #007AFF;
		padding-bottom: 20upx;
		margin-top: 20upx;
	}
	
	.pc_row1 {
		padding-left: 20upx;
		width: 80%;
		display: flex;
		color: #555555;
		flex-direction: row;
		align-items: center;
		justify-content: flex-start;
		font-size: 30upx;
		margin-top: 30upx;
	}
	.pc_text {
		font-size: 30upx;
		color: #007AFF;
	}
	.pc_row2 {
		padding-left: 20upx;
		margin-top: 40upx;
		width: 90%;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: flex-start;
	}
	.radio_item {
		display: flex;
		flex-direction: row;
		align-items: center;
		margin-left: 20upx;
	}
	.item {
		width: 40%;
		font-size: 30upx;
		border-radius: 30upx;
		text-align: center;
	
	}
	.radio {
		display: flex;
		flex-direction: row;
		align-items: center;
		margin-left: 20upx;
	}
	
	.on {
		border: none;
		background-color: #3f82e7;
		color: #fff;
	}
</style>
