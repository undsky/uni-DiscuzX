<template>
	<view>
		<u-grid :col="4">
			<u-grid-item>
				<u-icon name="weixin-fill" color="#3FCF00" :size="46"></u-icon>
				<view class="grid-text">微信</view>
			</u-grid-item>
			<u-grid-item>
				<u-icon name="moments" color="#40B4B2" :size="46"></u-icon>
				<view class="grid-text">朋友圈</view>
			</u-grid-item>
			<u-grid-item>
				<u-icon name="qq-fill" color="#66B8EF" :size="46"></u-icon>
				<view class="grid-text">QQ</view>
			</u-grid-item>
			<u-grid-item>
				<u-icon name="weibo" color="#E12202" :size="46"></u-icon>
				<view class="grid-text">微博</view>
			</u-grid-item>
		</u-grid>
	</view>
</template>

<script>
	export default {
		name: "dx-share",
		data() {
			return {

			};
		}
	}
</script>

<style>

</style>
