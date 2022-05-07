<template>
	<view>
		<view class="bg-white padding border-shadow radius" :class="cls">
			<view class="skeleton-line skeleton-active"></view>
			<view class="skeleton-line skeleton-line-short50 skeleton-active margin-top"></view>
			<view class="skeleton-line skeleton-line-short50 skeleton-active margin-top-sm"></view>
		</view>
	</view>
</template>

<script>
	import gloalMixin from '@/mixins/global-minxin.js';
	var _this;
	export default {
		mixins: [gloalMixin],
		props: {
			cls: {
				type: String,
				required: false
			}
		},
		data() {
			return {
				description: '通用的列表页骨架屏'
			}
		},
		created() {
			_this = this;
		}
	}
</script>

<style lang="scss" scoped>
	@import '/common/skeleton.css'
</style>
