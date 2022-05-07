<template>
	<view class="content">
		<cu-custom :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content"  style="display: flex;flex-direction: row;align-items: center; justify-content: center;" >
				<image style="width: 40upx;height: 40upx;"
					src="http://m.qpic.cn/psc?/V12eKFrM2hLmPp/45NBuzDIW489QBoVep5mceHXTFWcyYv6UyuR2LevA2NhsrL9Ku0ZsyCNOBb5dyQznjobb8NomC6FnpU4TyOsOJAQQ59*BSRwWL3*nUe95uQ!/b&bo=mgHaAZoB2gEDJwI!&rf=viewer_4">
				问卷调查
				</image>
				</block>
		</cu-custom>
		<check-xi @nextAnswer="nextAnswer" @checkOption="checkOption" :questionList="questionList"></check-xi>
	</view>
</template>

<script>
	import checkXi from '@/components/xi-check/xi-check.vue'
	export default {
		components: {
			checkXi
		},
		data() { //模拟数据
			return {
				userid: "",
				strify: "",
				listnum: [4, 4, 7, 8, 8, 4, 6, 4, 10, 5],
				data: ["", "", "", "", "", "", "", "", "", ""],
				id: "",
				id: "",
				sex: "",
				age: "",
				highestEducation: "",
				profession: "",
				monthlyIncome: "",
				hotelType: "",
				hotelReservation: "",
				cookingFood: "",
				typesFood: "",
				foodConsumption: "",
				scenicSpot: "",
				colorStyle: { // 颜色修改自定义 -- 若需修改必须全部都要有！！！
					nextBac: '#39b8ef', //下一题按钮背景色
					nextCol: '#FFFFFF', //下一题按钮背字体颜色
					optBac: '#90c0ff', //选项按钮背景色
					optCol: '#232131', //选项按钮字体颜色
					optBacActive: '#1296db', //选项按钮背景色 - 选中
					optColActive: '#FFFFFF', //选项按钮字体颜色-选中
				},
				questionList: [
					// {
					// 	id: 1, //题目id
					// 	type: 'radio', //单选 checkbox - 多选 ； write - 填空 
					// 	number: 1, //题目序号 - 非必要
					// 	title: '您的性别? ', //题目名称
					// 	question_option: [{
					// 			id: 1, //答案id
					// 			name: 'A',
					// 			content: '男', //答案内容
					// 			active: 0 //选中状态
					// 		},
					// 		{
					// 			id: 2,
					// 			name: 'B',
					// 			content: '女',
					// 			active: 0
					// 		},

					// 	] //选项集
					// },
					// {
					// 	id: 2,
					// 	type: 'radio',
					// 	number: 2,
					// 	title: '您的年龄是? ',
					// 	question_option: [{
					// 			id: 1,
					// 			name: 'A',
					// 			content: '20岁及以下',
					// 			active: 0
					// 		},
					// 		{
					// 			id: 2,
					// 			name: 'B',
					// 			content: '21-25岁',
					// 			active: 0
					// 		},
					// 		{
					// 			id: 3,
					// 			name: 'C',
					// 			content: '26-30岁',
					// 			active: 0
					// 		},
					// 		{
					// 			id: 4,
					// 			name: 'D',
					// 			content: '40岁以上',
					// 			active: 0
					// 		},
					// 	]
					// },
					// {
					// 	id: 3,
					// 	type: 'radio',
					// 	number: 3,
					// 	title: '您目前的职业是? ',
					// 	question_option: [{
					// 			id: 1,
					// 			name: 'A',
					// 			content: '在校学生',
					// 			active: 0
					// 		},
					// 		{
					// 			id: 2,
					// 			name: 'B',
					// 			content: '政府/机关干部/公务员',
					// 			active: 0
					// 		},
					// 		{
					// 			id: 3,
					// 			name: 'C',
					// 			content: '企业管理者(包括基层及中高层管理者)',
					// 			active: 0
					// 		},
					// 		{
					// 			id: 4,
					// 			name: 'D',
					// 			content: '普通职员(办公室/写字楼工作人员)',
					// 			active: 0
					// 		},
					// 		{
					// 			id: 5,
					// 			name: 'E',
					// 			content: '专业人员(如医生/律师/文体/记者/老师等)',
					// 			active: 0
					// 		},
					// 		{
					// 			id: 6,
					// 			name: 'F',
					// 			content: '普通工人(如工厂工人/体力劳动者等)',
					// 			active: 0
					// 		},
					// 		{
					// 			id: 7,
					// 			name: 'G',
					// 			content: '商业服务业职员(如销售人员/商店职员/服务员等)',
					// 			active: 0
					// 		},
					// 		{
					// 			id: 8,
					// 			name: 'H',
					// 			content: '个体经营者/承包商',
					// 			active: 0
					// 		},
					// 		{
					// 			id: 9,
					// 			name: 'I',
					// 			content: '自由职业者',
					// 			active: 0
					// 		},
					// 		{
					// 			id: 10,
					// 			name: 'J',
					// 			content: '农林牧渔劳动者',
					// 			active: 0
					// 		},
					// 		{
					// 			id: 11,
					// 			name: 'K',
					// 			content: '退休',
					// 			active: 0
					// 		},
					// 		{
					// 			id: 12,
					// 			name: 'L',
					// 			content: '暂无职业',
					// 			active: 0
					// 		},
					// 		{
					// 			id: 13,
					// 			name: 'M',
					// 			content: '其他',
					// 			active: 0
					// 		},
					// 	]
					// },

					{
						id: 1, //题目id
						type: 'checkbox', //单选 checkbox - 多选 ； write - 填空 
						number: 1, //题目序号 - 非必要
						title: '您一般会选择什么类型的酒店? ', //题目名称
						question_option: [{
								id: 1,
								name: 'A',
								content: '5星级及以上酒店',
								active: 0
							},
							{
								id: 2,
								name: 'B',
								content: '4星级酒店',
								active: 0
							},
							{
								id: 3,
								name: 'C',
								content: '品牌连锁经济型酒店',
								active: 0
							},
							{
								id: 4,
								name: 'D',
								content: '家庭旅游客栈/民宿',
								active: 0
							},
						] //选项集
					},
					{
						id: 2, //题目id
						type: 'checkbox', //单选 checkbox - 多选 ； write - 填空 
						number: 2, //题目序号 - 非必要
						title: '您预订的酒店一般在什么位置？ ', //题目名称
						question_option: [{
								id: 1,
								name: 'A',
								content: '机场火车站附近',
								active: 0
							},
							{
								id: 2,
								name: 'B',
								content: '景区附近',
								active: 0
							},
							{
								id: 3,
								name: 'C',
								content: '学校周边',
								active: 0
							},
							{
								id: 4,
								name: 'D',
								content: '商业区周边',
								active: 0
							},

						] //选项集
					},
					{
						id: 3, //题目id
						type: 'checkbox', //单选 checkbox - 多选 ； write - 填空 
						number: 3, //题目序号 - 非必要
						title: '一般而言,选择酒店您会优先考虑一下那些因素? ', //题目名称
						question_option: [{
								id: 1,
								name: 'A',
								content: '人员服务',
								active: 0
							},
							{
								id: 2,
								name: 'B',
								content: '酒店价格',
								active: 0
							},
							{
								id: 3,
								name: 'C',
								content: '地理位置',
								active: 0
							},
							{
								id: 4,
								name: 'D',
								content: '周边环境',
								active: 0
							},
							{
								id: 5,
								name: 'E',
								content: '点评情况',
								active: 0
							},
							{
								id: 6,
								name: 'F',
								content: '餐饮质量',
								active: 0
							},
							{
								id: 7,
								name: 'G',
								content: '配套设备(如健身房、游泳池、SPA等)',
								active: 0
							},

						] //选项集
					},
					{
						id: 4, //题目id
						type: 'checkbox', //单选 checkbox - 多选 ； write - 填空 
						number: 4, //题目序号 - 非必要
						title: '您最喜欢吃那个菜系的美食? ', //题目名称
						question_option: [{
								id: 1,
								name: 'A',
								content: '东北菜',
								active: 0
							},
							{
								id: 2,
								name: 'B',
								content: '粤菜',
								active: 0
							},
							{
								id: 3,
								name: 'C',
								content: '海南菜',
								active: 0
							},
							{
								id: 4,
								name: 'D',
								content: '东南亚菜',
								active: 0
							},
							{
								id: 5,
								name: 'E',
								content: '江浙菜',
								active: 0
							},
							{
								id: 6,
								name: 'F',
								content: '川湘菜',
								active: 0
							},
							{
								id: 7,
								name: 'G',
								content: '川菜',
								active: 0
							},
							{
								id: 8,
								name: 'H',
								content: '其他',
								active: 0
							},
						] //选项集
					},
					{
						id: 5, //题目id
						type: 'checkbox', //单选 checkbox - 多选 ； write - 填空 
						number: 5, //题目序号 - 非必要
						title: '您喜欢吃什么类型的美食? ', //题目名称
						question_option: [{
								id: 1,
								name: 'A',
								content: '蛋糕甜点',
								active: 0
							},
							{
								id: 2,
								name: 'B',
								content: '西餐',
								active: 0
							},
							{
								id: 3,
								name: 'C',
								content: '日韩料理',
								active: 0
							},
							{
								id: 4,
								name: 'D',
								content: '火锅',
								active: 0
							},
							{
								id: 5,
								name: 'E',
								content: '烧烤烤肉',
								active: 0
							},
							{
								id: 6,
								name: 'F',
								content: '海鲜',
								active: 0
							},
							{
								id: 7,
								name: 'G',
								content: '面包或饮品',
								active: 0
							},
							{
								id: 8,
								name: 'H',
								content: '其他',
								active: 0
							},
						] //选项集
					},
					{
						id: 6, //题目id
						type: 'checkbox', //单选 checkbox - 多选 ； write - 填空 
						number: 6, //题目序号 - 非必要
						title: '您选择美食一般会考虑什么因素？ ', //题目名称
						question_option: [{
								id: 1,
								name: 'A',
								content: '人员服务',
								active: 0
							},
							{
								id: 2,
								name: 'B',
								content: '美食特色',
								active: 0
							},
							{
								id: 3,
								name: 'C',
								content: '地理位置',
								active: 0
							},
							{
								id: 4,
								name: 'D',
								content: '周边环境',
								active: 0
							},
						] //选项集
					},
					{
						id: 7, //题目id
						type: 'checkbox', //单选 checkbox - 多选 ； write - 填空 
						number: 7, //题目序号 - 非必要
						title: '您每次的吃饭人均消费一般是多少元? ', //题目名称
						question_option: [{
								id: 1,
								name: 'A',
								content: '20以内',
								active: 0
							},
							{
								id: 2,
								name: 'B',
								content: '20-50',
								active: 0
							},
							{
								id: 3,
								name: 'C',
								content: '50-100',
								active: 0
							},
							{
								id: 4,
								name: 'D',
								content: '100-150',
								active: 0
							},
							{
								id: 5,
								name: 'E',
								content: '150-200',
								active: 0
							},
							{
								id: 6,
								name: 'F',
								content: '200以上',
								active: 0
							},
						] //选项集
					},
					{
						id: 8, //题目id
						type: 'checkbox', //单选 checkbox - 多选 ； write - 填空 
						number: 8, //题目序号 - 非必要
						title: '您选择旅游景点的时候最看重? ', //题目名称
						question_option: [{
								id: 1,
								name: 'A',
								content: '景点热度',
								active: 0
							},
							{
								id: 2,
								name: 'B',
								content: '地理位置',
								active: 0
							},
							{
								id: 3,
								name: 'C',
								content: '游客评论',
								active: 0
							},
							{
								id: 4,
								name: 'D',
								content: '景点类型',
								active: 0
							},
						] //选项集
					},
					{
						id: 9, //题目id
						type: 'checkbox', //单选 checkbox - 多选 ； write - 填空 
						number: 9, //题目序号 - 非必要
						title: '您最喜欢选择什么类型的景点? ', //题目名称
						question_option: [{
								id: 1,
								name: 'A',
								content: '自然风光',
								active: 0
							},
							{
								id: 2,
								name: 'B',
								content: '水上项目',
								active: 0
							},
							{
								id: 3,
								name: 'C',
								content: '动物园',
								active: 0
							},
							{
								id: 4,
								name: 'D',
								content: '温泉',
								active: 0
							},
							{
								id: 5,
								name: 'E',
								content: '潜水',
								active: 0
							},
							{
								id: 6,
								name: 'F',
								content: '城市风光',
								active: 0
							},
							{
								id: 7,
								name: 'G',
								content: '文物古迹',
								active: 0
							},
							{
								id: 8,
								name: 'H',
								content: '采摘/农家乐',
								active: 0
							},
							{
								id: 9,
								name: 'I',
								content: '植物园',
								active: 0
							},
							{
								id: 10,
								name: 'J',
								content: '海滨沙滩',
								active: 0
							},
						] //选项集
					},
					{
						id: 10, //题目id
						type: 'checkbox', //单选 checkbox - 多选 ； write - 填空 
						number: 10, //题目序号 - 非必要
						title: '您旅游人均花费多少? ', //题目名称
						question_option: [{
								id: 1,
								name: 'A',
								content: '500元以下',
								active: 0
							},
							{
								id: 2,
								name: 'B',
								content: '500-1000元',
								active: 0
							},
							{
								id: 3,
								name: 'C',
								content: '1000-1500元',
								active: 0
							},
							{
								id: 4,
								name: 'D',
								content: '1500-2000元',
								active: 0
							},
							{
								id: 5,
								name: 'E',
								content: '2000元以上',
								active: 0
							},
						] //选项集
					},
					// {
					//                    id:2,
					//                    type:'checkbox',
					//                    number:2,
					//                    title:'生物大灭绝是指大规模的集群灭绝，生物灭绝又叫生物绝种。历史上一共有几次大灭绝？',
					//                    imageList:[],
					//                    question_option:[
					//                        {id:1,name:'A',content:'一次',active:0},
					//                        {id:2,name:'B',content:'二次',active:0},
					//                        {id:3,name:'C',content:'三次',active:0},
					//                        {id:4,name:'D',content:'四次',active:0},
					//                        ]
					//                }, {
					//                    id: 3,
					//                    type: 'write',
					//                    number: 3,
					//                    title: '生物大灭绝是指大规模的集群灭绝，生物灭绝又叫生物绝种。历史上一共有_____次大灭绝？',
					//                    imageList: [
					//                        'https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1588056060&di=67dc5595a44e90101f524bae2273cc0a&src=http://a3.att.hudong.com/14/75/01300000164186121366756803686.jpg'
					//                    ],
					//                    question_key: '' //绑定的答案输入字段
					//                }
				]
			}
		},
		methods: {
			/**
			 * 绑定选择答案事件
			 */

			nextAnswer(e) {
				if (e.isEnd == true) {
					console.log(this.data);
					this.send()
				}
			},
			checkOption(e) {
				console.log(e)
				var num = 0
				for (var i = 0; i < e.id - 1; i++) {
					num += this.listnum[i]
				}

				console.log(num)
				console.log(num + parseInt(e.value))
				this.data[e.id - 1] = num + parseInt(e.value)
				// this.questionList.question_option.id = e.value
				//console.log(this.questionList[e.id - 1].question_option[e.value - 1].content)
				// this.data[e.id - 1] = this.questionList[e.id - 1].question_option[e.value - 1].content
				// var str = '';
				// for ( var i = 0; i < this.data.length; i++){

				//     str = str +","+ this.data[i];
				// }

				// console.log(str.substring(1));

				this.strify = JSON.stringify(this.data)
				console.log(this.strify)


			},
			send() {
				uni.showModal({
					title: '提交确认',
					content: '是否确定提交选择的答案？',
					confirmText: '确定',
					success: r => {
						if (r.confirm) {
							uni.request({
								url: getApp().globalData.globalUrl+'/user_portrait/init_interest/'+getApp().globalData.id+"/"+this.strify,
								success: (res) => {
									console.log(res)
									wx.showToast({
										title: "提交成功"
									})
									getApp().globalData.if_user_image = 1
									uni.switchTab({
										url: "../index/index",

									})
								},
							})

						}
					}
				})
			}
		},
		onLoad() {

		}
	}
</script>

<style>

</style>
