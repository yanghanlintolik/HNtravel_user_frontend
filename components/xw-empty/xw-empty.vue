<template>
	<view class="nodata" v-if="show">
		<image :src="img" mode="widthFix" class="empty_image"></image>
		<text :style="{color:textColor}">{{ text }}</text>
	</view>
</template>

<script>
	export default {
		name: 'xw-empty',
		props: {
			//text
			text: {
				type: String,
				default: '暂无数据'
			},
			img: {
				type: String,
				default: '/static/common/empty.png'
			},
			textColor: {
				type: String,
				default: '#999999'
			},
			show: {
				type: Boolean,
				default: true
			}
		},
		data() {
			return {};
		},
		methods: {}
	};
</script>

<style lang="scss" scoped>
	.nodata {
		position: fixed;
		display: flex;
		flex-direction: column;
		justify-content: center;
		height: 400rpx;
		width: 100%;
		top: 250rpx;
		align-items: center;
		color: #555555;
		font-size: 24rpx;

	}

	.empty_image {
		width: 200rpx !important;
		margin-bottom: 50rpx;
	}
</style>
