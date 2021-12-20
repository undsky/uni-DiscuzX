<template>
	<u-navbar :background="background" :is-back="false">
		<view class="flex flex-sub justify-between">
			<view v-if="showUser" class="margin-left">
				<u-image v-if="user" :src="user.avatar" shape="circle" width="44" height="44">
				</u-image>
				<navigator v-else url="../../pages/auth/auth" hover-class="none">
					<u-icon name="account" color="#FFFFFF" size="38"></u-icon>
				</navigator>
			</view>
			<view class="flex flex-sub justify-center text-lg text-white text-bold">
				{{title}}
			</view>
			<navigator url="../../pages/search/search" hover-class="none" class="margin-right">
				<u-icon name="search" color="#FFFFFF" size="38"></u-icon>
			</navigator>
		</view>
	</u-navbar>
</template>

<script>
	import {
		mapState
	} from 'vuex'

	export default {
		name: "dx-navbar",
		props: {
			title: String,
			showUser: {
				type: Boolean,
				default: true
			}
		},
		data() {
			return {
				background: {
					backgroundColor: "#606266"
				}
			};
		},
		computed: {
			...mapState({
				user: state => state.auth.user
			})
		}
	}
</script>

<style>

</style>
