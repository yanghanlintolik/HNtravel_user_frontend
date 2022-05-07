<template>
	<view>
		<view class="cu-custom" :style="[{height:CustomBar + 'px'}]">
			<view class="cu-bar fixed" :style="style" :class="[bgImage!=''?'none-bg text-white bg-img':'',dynamicBgColor]">
				<view class="action" @tap="BackPage" v-if="isBack">
					<text class="cuIcon-back"></text>
					<slot name="backText" v-if="$slots.default"></slot>
					<text v-else>{{backText}}</text>
				</view>
				<view class="content" :style="[{top:StatusBar + 'px'}]">
					<slot name="content"></slot>
				</view>
				<slot name="right"></slot>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar
			};
		},
		name: 'cu-custom',
		computed: {
			style() {
				var StatusBar = this.StatusBar;
				var CustomBar = this.CustomBar;
				var bgImage = this.bgImage;
				var style = `height:${CustomBar}px;padding-top:${StatusBar}px;`;
				if (this.bgImage) {
					style = `${style}background-image:url(${bgImage});`;
				}
				return style
			},
			dynamicBgColor() {
				// 若给定颜色，则显示指定颜色，否则显示主题色
				if (!!this.bgColor) {
					return this.bgColor;
				}

				return 'bg-' + this.$store.state.themeColor.name
			}
		},
		props: {
			bgColor: {
				type: String,
				default: ''
			},
			isBack: {
				type: [Boolean, String],
				default: false
			},
			backText: {
				type: String,
				default: '返回'
			},
			bgImage: {
				type: String,
				default: ''
			}
		},
		methods: {
			BackPage() {
				uni.navigateBack({
					delta: 1
				});
			}
		}
	}
</script>

<style>

</style>
