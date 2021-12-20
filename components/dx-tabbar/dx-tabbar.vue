<template>
	<view><u-tabbar v-model="index" :list="tabbar" :mid-button="true" @change="tabbarChange"></u-tabbar></view>
</template>

<script>
import { mapState } from 'vuex';

export default {
	name: 'dx-tabbar',
	props: {
		currentTab: {
			type: Number,
			default: 0
		}
	},
	data() {
		return {
			index: this.currentTab
		};
	},
	computed: {
		...mapState({
			tabbar: state => state.tabbar.tabbar,
			user: state => state.auth.user
		})
	},
	methods: {
		tabbarChange(index) {
			if (2 == index) {
				if (this.user) {
					uni.navigateTo({
						url: '/pages/post/post'
					});
				} else {
					uni.navigateTo({
						url: '/pages/auth/auth'
					});
				}
			}
			this.index = index;
		}
	}
};
</script>

<style></style>
