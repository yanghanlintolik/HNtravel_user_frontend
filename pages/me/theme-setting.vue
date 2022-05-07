<template>
	<view :class="'bg-'+themeColor.name" style="height: 100vh;">
		<cu-custom :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content"  style="display: flex;flex-direction: row;align-items: center; justify-content: center;" >
				<image style="width: 40upx;height: 40upx;"
					src="http://m.qpic.cn/psc?/V12eKFrM2hLmPp/45NBuzDIW489QBoVep5mceHXTFWcyYv6UyuR2LevA2NhsrL9Ku0ZsyCNOBb5dyQznjobb8NomC6FnpU4TyOsOJAQQ59*BSRwWL3*nUe95uQ!/b&bo=mgHaAZoB2gEDJwI!&rf=viewer_4">
				设置主题颜色
				</image>
				</block>
		</cu-custom>
		<view class="cu-bar solid-bottom" :class="'bg-'+themeColor.name">
			<view class="action">
				<text class='cuIcon-title text-blue'></text>深色背景
			</view>
		</view>
		<view class="grid col-3 padding-sm">
			<view class="padding-sm" v-for="(item,index) in ColorList" :key="index" v-if="index<15" @click="SetColor(item)">
				<view class="padding radius text-center light" :class="'bg-' + item.name">
					<view class="text-lg">{{item.title}}</view>
					<view class="margin-top-sm text-Abc">{{item.name}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import gloalMixin from '@/mixins/global-minxin.js';

	export default {
		name: 'theme-setting',
		mixins: [gloalMixin],
		props: {
			show: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				description: '设置主题',
				ColorList: this.ColorList
			}
		},
		methods: {
			SetColor(item) {
				this.$store.commit('setThemeColor', item);
				this.$emit('ok');
			},
			close() {
				this.$emit('ok')
			}
		},
	}
</script>

<style lang="scss" scoped>

</style>
