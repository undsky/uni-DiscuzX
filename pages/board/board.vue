<template>
	<view>
		<dx-navbar title="板块"></dx-navbar>
		<view v-for="(item, index) in boardList" :key="item.board_category_id">
			<view class="cu-bar bg-white">
				<view class="action">
					<text class="cuIcon-titles text-orange"></text>
					<text class="text-lg text-bold">{{ item.board_category_name }}</text>
				</view>
			</view>
			<u-grid :border="false" :col="4">
				<u-grid-item @click="$util.helper.goto('./list/list?board_id='+board.board_id)"
					v-for="board in item.board_list" :key="board.board_id">
					<u-badge :count="board.td_posts_num" :offset="[20, 20]"></u-badge>
					<u-icon :color="board.td_posts_num ? '#f37b1d' : '#8799a3'" :name="board.board_img || 'chat-fill'"
						:size="64"></u-icon>
					<view class="grid-text text-grey margin-top-sm">{{ board.board_name }}</view>
				</u-grid-item>
			</u-grid>
		</view>
		<dx-tabbar :currentTab="1"></dx-tabbar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				boardList: []
			};
		},
		methods: {},
		onLoad: async function(options) {
			const result = await this.$http.post({
				r: 'forum/forumlist'
			}, {
				custom: {
					auth: false
				}
			});

			this.boardList = result.list;
		}
	};
</script>

<style>
</style>
