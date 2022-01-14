<template>
	<view>
		<dx-navbar title="我的" :showUser="false"></dx-navbar>
		<scroll-view scroll-y="true" class="wrapper">
			<view class="u-flex user-box u-p-l-30 u-p-r-20 u-p-b-30 margin-top">
				<view class="u-m-r-10"><u-avatar :src="user ? user.avatar : ''" size="140"></u-avatar></view>
				<view class="u-flex-1 margin-left-sm">
					<template v-if="user">
						<view class="u-font-18 u-p-b-20">{{ user.userName }}</view>
						<view class="margin-bottom-xs text-gray text-sm">
							<text v-for="item in user.creditShowList" :key="item.type">
								{{ item.title }}:
								<text class="text-green margin-lr-xs">{{ item.data }}</text>
							</text>
						</view>
						<view class="text-sm text-orange">{{ user.userTitle }}</view>
					</template>
					<u-cell-item v-else @click="$util.helper.goto('../auth/auth')" title="登录" :arrow="false" :title-style="titleStyle"></u-cell-item>
				</view>
			</view>

			<view class="u-m-t-20">
				<u-cell-group :border="false">
					<u-cell-item @click="qiandao" icon="edit-pen" :arrow="false" title="签到"></u-cell-item>
					<u-cell-item @click="$util.helper.goto('./post/post', true)" icon="file-text" title="我的发表"></u-cell-item>
					<u-cell-item @click="$util.helper.goto('./reply/reply', true)" icon="chat" title="我的回复"></u-cell-item>
					<u-cell-item @click="$util.helper.goto('./star/star', true)" icon="heart" title="我的收藏"></u-cell-item>
				</u-cell-group>
			</view>
			<view class="u-m-t-20 flex justify-center"><u-link href="https://www.undsky.com" :under-line="true">联系作者</u-link></view>
			<view v-if="user" class="margin-top-lg padding"><u-button @click="logout">退出登录</u-button></view>
		</scroll-view>
		<dx-tabbar :currentTab="4"></dx-tabbar>
	</view>
</template>

<script>
import { mapState } from 'vuex';

export default {
	data() {
		return {
			titleStyle: {
				fontWeight: 'bold',
				fontSize: '32rpx'
			}
		};
	},
	computed: {
		...mapState({
			user: state => state.auth.user
		})
	},
	methods: {
		qiandao: async function() {
			const result = await this.$http.post({
				r: 'user/sign'
			});
			uni.showModal({
				title: '',
				content: result.head.errInfo,
				showCancel: false,
				cancelText: '',
				confirmText: '确定',
				success: res => {},
				fail: () => {},
				complete: () => {}
			});
		},
		logout() {
			this.$store.commit('clearUser');
		}
	}
};
</script>

<style scoped>
.wrapper {
	height: calc(100vh - 94px - var(--status-bar-height));
}
</style>
