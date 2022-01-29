<template>
	<view>
		<u-navbar :background="background" back-icon-color="#FFFFFF" :title="forumName" title-bold title-color="#FFFFFF">
			<view @click="showAction" class="margin-right flex" slot="right"><u-icon name="more-dot-fill" color="#FFFFFF" size="38"></u-icon></view>
		</u-navbar>
		<view class="cu-card">
			<view class="cu-item">
				<view class="title text-bold text-lg">{{ topic.title }}</view>
				<view class="flex justify-between margin-top">
					<view class="text-gray text-sm text-left">{{ $u.timeFrom(topic.create_date) }}</view>
					<view class="text-gray text-sm text-right">
						<text class="cuIcon-attentionfill margin-lr-xs"></text>
						{{ topic.hits }}
						<text class="cuIcon-messagefill margin-lr-xs"></text>
						{{ topic.replies }}
					</view>
				</view>
			</view>
		</view>
		<view class="cu-list menu-avatar">
			<view class="cu-item cur">
				<view class="cu-avatar round lg" :style="'background-image:url(' + topic.icon + ');'"></view>
				<view class="content">
					<view>
						<view class="text-cut">{{ topic.user_nick_name }}</view>
					</view>
					<view class="text-orange text-sm">{{ topic.userTitle }}</view>
				</view>
				<view class="action">
					<view class="text-blue text-xs">楼主</view>
					<view @click="zan(0)" class="cuIcon-appreciatefill text-gray"></view>
				</view>
			</view>
		</view>
		<view class="padding-sm"><mp-html lazy-load :content="content" /></view>
		<z-paging ref="paging" use-page-scroll v-model="commentList" autowire-query-name="zQuery">
			<view class="cu-list menu-avatar comment">
				<view v-for="(item, index) in commentList" :key="item.reply_posts_id" class="cu-item">
					<view class="cu-avatar round" :style="'background-image:url(' + item.icon + ');'"></view>
					<view class="content">
						<view class="text-grey">{{ item.reply_name }}</view>
						<view class="text-gray text-content text-df"><mp-html lazy-load :content="$util.mobcent.content(item.reply_content)" /></view>
						<view v-if="item.quote_content" class="bg-grey padding-sm radius margin-top-sm  text-sm">
							<mp-html lazy-load :content="$util.mobcent.phiz(item.quote_content)" />
						</view>
						<view class="margin-top-sm flex justify-between">
							<view class="text-gray text-df">{{ $u.timeFrom(item.posts_date) }}</view>
							<view><view @click="zan(item.reply_posts_id)" class="cuIcon-appreciatefill text-gray"></view></view>
						</view>
					</view>
				</view>
			</view>
		</z-paging>
		<view class="cu-tabbar-height"></view>
		<dx-chatbar ref="chatbar"></dx-chatbar>
		<u-popup v-model="showShare" mode="bottom" safe-area-inset-bottom><dx-share></dx-share></u-popup>
	</view>
</template>

<script>
import { setClipboardData } from '@/uni_modules/u-clipboard/js_sdk';
import ZPagingMixin from '@/uni_modules/z-paging/components/z-paging/js/z-paging-mixin';
import { mapState } from 'vuex';

let _id;

export default {
	mixins: [ZPagingMixin],
	data() {
		return {
			background: {
				backgroundColor: '#606266'
			},
			firstLoaded: false,
			topic: {},
			boardId: 0,
			forumName: '',
			forumTopicUrl: '',
			commentList: [],
			showShare: false
		};
	},
	computed: {
		...mapState({
			user: state => state.auth.user
		}),
		content: function() {
			return this.$util.mobcent.content(this.topic.content);
		}
	},
	onUnload: function() {
		uni.$off('reply');
	},
	onLoad: async function(options) {
		_id = options.id;

		uni.$on('reply', async data => {
			try {
				if (this.user) {
					const result = await this.$http.post({
						r: 'forum/topicadmin',
						act: 'reply',
						json: JSON.stringify({
							body: {
								json: {
									isHidden: 0,
									isQuote: 0,
									isAnonymous: 0,
									isOnlyAuthor: 0,
									fid: this.boardId,
									tid: _id,
									replyId: this.topic.reply_posts_id,
									content: JSON.stringify([
										{
											type: 0,
											infor: data
										}
									])
								}
							}
						})
					});

					this.$refs.chatbar.replytext = '';
					uni.showToast({
						title: result.errcode
					});
					this.$refs.paging.reload();
				} else {
					uni.navigateTo({
						url: '../auth/auth',
						success: res => {},
						fail: () => {},
						complete: () => {}
					});
				}
			} catch (e) {
				//TODO handle the exception
			} finally {
				uni.hideLoading();
			}
		});
	},
	methods: {
		zQuery: async function(page, pageSize) {
			const result = await this.$http.get(
				{
					r: 'forum/postlist',
					topicId: _id,
					authorId: 0,
					order: 1,
					page,
					pageSize
				},
				{
					custom: {
						auth: false
					}
				}
			);
			if (!this.firstLoaded) {
				this.boardId = result.boardId;
				this.forumName = result.forumName;
				this.forumTopicUrl = result.forumTopicUrl;
				this.topic = result.topic;
			}
			this.$refs.paging.complete(result.list);
			this.firstLoaded = true;
		},
		zan: async function(pid) {
			const result = await this.$http.post({
				r: 'forum/support',
				tid: _id,
				pid,
				type: pid ? 'post' : 'thread'
			});
			uni.showToast({
				title: result.errcode
			});
		},
		showAction: async function() {
			uni.showActionSheet({
				itemList: ['收藏', '分享', '复制链接'],
				success: async res => {
					switch (res.tapIndex) {
						case 0:
							if (this.user) {
								await this.$http.post({
									r: 'user/userfavorite',
									id: _id,
									idType: 'tid',
									action: 'favorite'
								});
								uni.showToast({
									title: '收藏成功'
								});
							} else {
								uni.navigateTo({
									url: '../auth/auth',
									success: res => {},
									fail: () => {},
									complete: () => {}
								});
							}
							break;
						case 1:
							this.showShare = true;
							break;
						case 2:
							try {
								await setClipboardData(this.forumTopicUrl);
								uni.showToast({
									title: '复制成功'
								});
							} catch (e) {
								uni.showToast({
									title: '复制失败'
								});
							}
							break;
					}
				},
				fail: () => {},
				complete: () => {}
			});
		}
	}
};
</script>

<style></style>
