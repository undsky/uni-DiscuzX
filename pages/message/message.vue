<template>
	<view>
		<dx-navbar title="消息"></dx-navbar>
		<view class="u-m-t-20">
			<u-cell-group :border="false">
				<u-cell-item @click="$util.helper.goto('./atme/atme',true)" icon="volume" title="提到我的"></u-cell-item>
				<u-cell-item @click="$util.helper.goto('./comment/comment',true)" icon="chat" title="评论"></u-cell-item>
			</u-cell-group>
		</view>
		<dx-tabbar :currentTab="3"></dx-tabbar>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {

		}
	}
</script>

<style>

</style>
