<template>
	<view>
		<dx-navbar title="首页"></dx-navbar>
		<view class="wrapper">
			<dx-post-paging :params="params"></dx-post-paging>
		</view>
		<dx-tabbar :currentTab="0"></dx-tabbar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				params: {
					r: 'forum/topiclist',
					sortby: 'new',
					boardId: 0,
					filterType: 'typeid',
					filterId: 0
				}
			};
		}
	};
</script>

<style scoped>
	.wrapper {
		height: calc(100vh - 94px - var(--status-bar-height));
	}
</style>
