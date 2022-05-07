<template>
	<view>
		<cu-custom :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content"
				style="display: flex;flex-direction: row;align-items: center; justify-content: center;">
				<image style="width: 40upx;height: 40upx;"
					src="http://m.qpic.cn/psc?/V12eKFrM2hLmPp/45NBuzDIW489QBoVep5mceHXTFWcyYv6UyuR2LevA2NhsrL9Ku0ZsyCNOBb5dyQznjobb8NomC6FnpU4TyOsOJAQQ59*BSRwWL3*nUe95uQ!/b&bo=mgHaAZoB2gEDJwI!&rf=viewer_4">
					海南美食
				</image>
			</block>
		</cu-custom>
		<scroll-view scroll-y class="page margin-top" :style="[{top:CustomBar + 'px'}]">
			<view class="nav-list">
				<navigator :url="'/pages/basics/' + item.name" class="nav-li" :class="'bg-'+item.color"
					:style="[{animation: 'show ' + ((index+1)*0.2+1) + 's 1'}]" v-for="(item,index) in elements"
					:key="index" @tap="showModal(index)" :data-target="item.id">
					<image style="height: 200upx; border-radius: 20upx; margin-top: 5upx;" :src="item.url"></image>
					<view class="nav-title text-center">{{item.title}}</view>
				</navigator>
			</view>
			<!-- <view class="cu-tabbar-height"></view> -->

			<view class="cu-modal" :class="modalName != null ?'show':''">
				<view class="cu-dialog">
					<view class="bg-img" style="height:200px;" :style='{backgroundImage: foodUrl}'>
						<view class="cu-bar justify-end text-white">
							<view class="action" @tap="hideModal">
								<text class="cuIcon-close "></text>
							</view>
						</view>
					</view>
					<view class="nav-title" :class="'text-'+ foodColor" style=" text-shadow: 2px 2px 5px;">{{foodTitle}}
					</view>
					<view class="text-left nav-name padding-lr-sm" style="text-indent: 25px;">{{foodText}}</view>
					<view class="cu-bar flex justify-between margin-lr" >
						<view class="flex">
							<button class="cu-btn line-green " :class="'text-'+ foodColor" @tap="hideModal">我知道啦</button>
						</view>
						<view class="flex">
							<button class="cu-btn" :class="'light bg-'+ foodColor" open-type="share"><text
									class="cuIcon-share"></text>分享美食</button>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import gloalMixin from '@/mixins/global-minxin.js'
	export default {
		mixins: [gloalMixin],
		name: "basics",
		data() {
			return {
				foodTitle: '',
				foodUrl: '',
				foodText: '',
				foodColor: '',

				modalName: null,
				elements: [{
						id: 0,
						title: '清补凉',
						color: 'cyan',
						url: 'https://p0.meituan.net/mogu/12737cc5d752a30abc8a04d6ee0fea0c377829.jpg@600w_600h_1l',
						jzUrl: "url( 'https://p0.meituan.net/mogu/12737cc5d752a30abc8a04d6ee0fea0c377829.jpg@600w_600h_1l')",
						text: '清补凉是一种夏天清热补湿的食品，且甘甜爽口，是夏季必备的饮品。在海南的冬天也可以吃到热的清补凉。原料少则十几种，多则二十几种，其中新鲜椰肉和菠萝是海南特色水果、葡萄干是北方特色食品，通心粉是西式食品，原料千变万化。最受欢迎的是椰子水清补凉和椰奶清补凉。椰子水的清甜伴着绿豆、西瓜、薏米的味道，又是别样滋味。在海南炎热的傍晚，喝上一碗冰爽的清补凉实在是最惬意的事情。'
					}, {
						id: 1,
						title: '抱罗粉',
						color: 'blue',
						url: 'https://img.meituan.net/msmerchant/823606e570ea040d4c1974a8da29f6e5888565.png@600w_600h_1l',
						jzUrl: "url( 'https://img.meituan.net/msmerchant/823606e570ea040d4c1974a8da29f6e5888565.png@600w_600h_1l')",
						text: '抱罗粉因盛起文昌市的抱罗镇而得名，相传自明代起抱罗粉就成为抱罗镇著名的美食了。抱罗粉属汤粉类，其贵在汤好，汤质清幽、鲜美可口、香甜麻辣。抱罗粉的汤较甜，但是这是一种独特的鲜甜，甜而不腻，且甜中带酸、酸中带辣。'
					}, {
						id: 2,
						title: '文昌鸡',
						color: 'purple',
						url: 'https://p0.meituan.net/merchant/84b8c38522f21fd61d69f7ab1e59fd331836884.png@380w_214h_1e_1c',
						jzUrl: "url( 'https://img.meituan.net/msmerchant/7f48f59fe2e5b79513bb60ef76efd6fd70850.jpg@380w_214h_1e_1c')",
						text: '正宗文昌鸡因产地在文昌市而得名，是通特产家养鸡。色油亮，味醇香，骨软肉嫩，吃起来滑而不腻，香美可口，三亚各酒店均可享受该美味。'

					},
					{
						id: 3,
						title: '陵水酸粉',
						color: 'mauve',
						url: 'https://p0.meituan.net/waimaipoi/80d5c8f8528eb8a346b490a2df9b613a184320.jpg@380w_214h_1e_1c',
						jzUrl: "url( 'https://p0.meituan.net/biztone/9066b6a9cee627804ca73b5519092b8a873246.jpg@380w_214h_1e_1c')",
						text: '陵水酸粉是海南省的一种特色小吃，跟海南粉类似，不过其中添加了特制的酱汤，酸辣甜香，佐料丰富，味道极其鲜美，令人回味。第一市场里就有贩卖陵水酸粉的摊位，其他的街边小吃店面也能找到。'

					},
					{
						id: 4,
						title: '椰子饭',
						color: 'pink',
						url: 'https://img.meituan.net/msmerchant/87c9fe1323b63b01a5636c2374e92ac81268318.jpg@600w_600h_1l',
						jzUrl: "url( 'https://img.meituan.net/msmerchant/86418c3a29ecdf0eb960e82a545708849700166.jpg@600w_600h_1l')",
						text: '椰子饭是海南最具特色的一个主食，外边是椰肉，里面是粘米，加上特殊的香料放在锅里面蒸很久，一般海南各大酒店都有这一道点食，很香，是海南的特色传统之一。'

					}, {
						id: 5,
						title: '椰子鸡',
						color: 'brown',
						url: 'https://img.meituan.net/msmerchant/8b842c7cc354afd9cb761f381a7d76ba7204456.jpg@600w_600h_1l',
						jzUrl: "url( 'https://p0.meituan.net//deal/9a9e11fac3b8d1ebd387b6742d9d7f3930687.jpg@150w_150h_1e_1c')",
						text: '椰子鸡是用椰子、鸡制作的一道家乡菜，属于海南菜。此菜口味咸鲜，椰味芬芳，汤清爽口，有益气生津的效果。椰汁及椰肉含有大量蛋白质、果糖、葡萄糖、蔗糖、脂肪、维生素B1、维生素E、维生素C、钾、钙、镁等。'

					}, {
						id: 6,
						title: '嘉积鸭',
						color: 'red',
						url: 'https://img.meituan.net/msmerchant/3314534274dd1336d0aeee8390c04f911234495.jpg@600w_600h_1l',
						jzUrl: "url( 'https://img.meituan.net/msmerchant/3314534274dd1336d0aeee8390c04f911234495.jpg@600w_600h_1l')",
						text: '嘉积鸭又称“番鸭”，红冠黄蹼，羽毛黑白相间，因琼海市加积地区饲养方法独特，出笼的“番鸭”脯大、皮薄、骨软、肉嫩，入口肥而不腻，世人特赐“加积鸭”美称，以区别其它地区饲养的“番鸭”。加积鸭有3种食法，可做成白切鸭、板鸭、烧鸭，味道俱佳。三亚各酒店及街边餐馆均可吃到。'

					},
					{
						id: 7,
						title: '东山羊',
						color: 'orange',
						url: 'https://img.meituan.net/msmerchant/d5883baad665514a15cde338a595c61a129358.jpg@380w_214h_1e_1c',
						jzUrl: "url( 'https://p0.meituan.net/bbia/fe8a6c47b16365da6809445fcb7a3e281986229.png@380w_214h_1e_1c')",
						text: '东山羊是海南四大名菜之一，产于万宁市东山岭。据传是因羊食东山岭的稀有草木所致，因此肥而不腻、食无膻味，且滋补养颜防湿热，汤味浓稠乳白、气味芳香、味道鲜美、营养滋补。'

					},
					{
						id: 8,
						title: '海南萝卜糕',
						color: 'olive',
						url: 'https://qcloud.dpfile.com/pc/bBSgM5b1q7kBuNRpUWSLxZwv0lDlO5MPafxl6rZDWzVB9aT0X5ZxF7T1tsS_Ur6Y5g_3Oo7Z9EXqcoVvW9arsw.jpg',
						jzUrl: "url( 'https://qcloud.dpfile.com/pc/vROsN8WAJVnkffpegjUCklLDsQeOYq18N5YOzCEgU9gkybB_bxHDusIeinR650Z25g_3Oo7Z9EXqcoVvW9arsw.jpg')",
						text: '海南地方传统小吃，民间制法因地而异。但都须以糯米浆、白萝卜丝为主料，其它辅料可随意变换，可蒸、可煎，也可先蒸后煎而食。糕面红绿点缀，色泽鲜艳，各味相济，入口鲜嫩。'

					},

					{
						id: 9,
						title: '琼式月饼',
						color: 'green',
						url: 'https://p1.meituan.net/deal/0f7691f5a1db5811f1fbd5711e62ccdd68438.jpg@380w_214h_1e_1c',
						jzUrl: "url( 'https://p1.meituan.net/deal/6d16e01d78199cd7a54c3121e3b0790681776.jpg@380w_214h_1e_1c')",
						text: '琼式月饼有着鲜明的海南特色，首先它的皮很独特，与广式、苏式月饼都不一样，口感软酥；二是馅料的用糖和用油量都比广式月饼低；三是皮与馅的比重为2：3，广式月饼则为1：5。总之，琼式月饼吃在口里不会让人感到甜腻。'

					},

				],
			};
		},
		onShow() {
			console.log("success")
		},
		onShareAppMessage(res) {
			return {
				title: '和你分享我发现的美食',
				path: '/pages/index/food',
				type: 5
			}
		},
		methods: {
			BackHome() {
				uni.navigateTo({
					url: "/pages/index/index"
				});
			},
			showModal(index) {
				console.log(index);
				this.foodTitle = this.elements[index].title
				this.foodUrl = this.elements[index].jzUrl
				this.foodText = this.elements[index].text
				this.foodColor = this.elements[index].color
				this.modalName = index
				console.log(this.foodText + this.foodTitle + this.foodUrl);
			},
			hideModal(e) {
				this.modalName = null
			}
		}

	}
</script>

<style>
	.page {
		height: 100vh;
	}
</style>
