<template>
	<view class="content">
		<z-paging
			:fixed="false"
			style="height: 100%;"
			ref="paging"
			v-model="zList"
			:use-page-scroll="usePageScroll"
			autowire-query-name="zQuery"
			:auto="false"
			:enable-back-to-top="currentIndex === tabIndex"
		>
			<view class="cu-list" :class="[hasAvatar ? 'menu-avatar' : 'padding-lr']">
				<view v-for="(item, index) in zList" :key="item.topic_id" class="cu-item cur post-item" :data-id="item.topic_id" @click="gotoDetail">
					<view v-if="hasAvatar" class="cu-avatar round lg" :style="'background-image:url(' + (item.userAvatar || item.icon) + ');'"></view>
					<view class="content flex-sub justify-center">
						<view>
							<view class="text-cut">{{ item.title || item.topic_subject }}</view>
						</view>
						<view class="text-cut text-grey text-sm">{{ item.subject || item.reply_content }}</view>
						<view class="text-xs flex justify-between">
							<view class="flex">
								<view class="text-cut text-green">{{ item.user_nick_name || item.reply_nick_name }}</view>
								<view class="text-gray margin-left-xs">{{ $u.timeFrom(item.last_reply_date || item.replied_date) }}</view>
							</view>
							<view class="text-gray">
								<template v-if="item.hits">
									<text class="cuIcon-attentionfill margin-lr-xs"></text>
									{{ item.hits }}
								</template>
								<template v-if="'undefined' != typeof item.replies">
									<text class="cuIcon-messagefill margin-lr-xs"></text>
									{{ item.replies }}
								</template>
							</view>
						</view>
					</view>
				</view>
			</view>
		</z-paging>
	</view>
</template>

<script>
export default {
	name: 'dx-post-paging',
	props: {
		params: Object,
		reload: {
			type: Boolean,
			default: false
		},
		hasAvatar: {
			type: Boolean,
			default: true
		},
		usePageScroll: {
			type: Boolean,
			default: false
		},
		auth: {
			type: Boolean,
			default: false
		},
		method: {
			type: String,
			default: 'get'
		},
		tabIndex: {
			type: Number,
			default: 0
		},
		currentIndex: {
			type: Number,
			default: 0
		}
	},
	data() {
		return {
			zList: [],
			firstLoaded: false
		};
	},
	watch: {
		params: function() {
			if (this.reload) this.$refs.paging.reload();
		},
		currentIndex: {
			handler(newVal) {
				if (newVal === this.tabIndex) {
					if (!this.firstLoaded) {
						this.$nextTick(() => {
							this.$refs.paging.reload();
						});
					}
				}
			},
			immediate: true
		}
	},
	methods: {
		zQuery: async function(page, pageSize) {
			let list = [];
			try {
				const res = await this.$http[this.method](
					Object.assign(this.params, {
						page,
						pageSize
					}),
					{
						custom: {
							auth: this.auth
						}
					}
				);
				list = res.list;
			} catch (e) {
				//TODO handle the exception
			} finally {
				this.$refs.paging.complete(list);
				this.firstLoaded = true;
			}
		},
		gotoDetail(e) {
			this.$util.helper.goto('/pages/detail/detail?id=' + e.currentTarget.dataset.id);
		}
	}
};
</script>

<style scoped>
.post-item {
	height: 80px !important;
}

.content {
	height: 100%;
	display: flex;
	flex-direction: column;
}
</style>
