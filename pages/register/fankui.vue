<template>
	<view style="background-color: #FFFFFF;">
		<cu-custom :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content"  style="display: flex;flex-direction: row;align-items: center; justify-content: center;" >
				<image style="width: 40upx;height: 40upx;"
					src="http://m.qpic.cn/psc?/V12eKFrM2hLmPp/45NBuzDIW489QBoVep5mceHXTFWcyYv6UyuR2LevA2NhsrL9Ku0ZsyCNOBb5dyQznjobb8NomC6FnpU4TyOsOJAQQ59*BSRwWL3*nUe95uQ!/b&bo=mgHaAZoB2gEDJwI!&rf=viewer_4">
				问题反馈
				</image>
				</block>
		</cu-custom>
	<easy-upload
	    :dataList="imageList" uploadUrl="https://cyye.lbj.wiki/zhangqidi/zqd/feedback/saveimage" :types="category"
	    :uploadCount="4"
	    @successImage="successImage" @successVideo="successvideo"
	    ></easy-upload>
		</view>
</template>

<script>
	export default {
	   data() {
	        return {
	            imageList: [],
	            category: 'image'
	        }
	    },
		onLoad() {
			console.log("a")
		},
		methods:{
	
		}
		}
</script>

<style>
	
</style>
