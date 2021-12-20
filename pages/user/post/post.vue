<template>
	<view style="height: 100vh;">
		<dx-post-paging auth :hasAvatar="false" :params="params"></dx-post-paging>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				params: {
					r: 'user/topiclist',
					type: 'topic'
				}
			};
		}
	};
</script>

<style></style>
