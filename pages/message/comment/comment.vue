<template>
	<view style="height: 100vh;"><dx-post-paging auth :params="params"></dx-post-paging></view>
</template>

<script>
export default {
	data() {
		return {
			params: {
				r: 'message/notifylist',
				type: 'post'
			}
		};
	},
	methods: {}
};
</script>

<style></style>
