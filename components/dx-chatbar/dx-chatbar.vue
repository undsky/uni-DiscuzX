<template>
	<view>
		<view class="cu-bar foot input" :style="[{ bottom: InputBottom + 'px' }]">
			<textarea
				class="margin-lr-sm"
				:value="replytext"
				placeholder="请输入内容"
				auto-height
				:adjust-position="false"
				:focus="false"
				maxlength="300"
				cursor-spacing="10"
				@focus="InputFocus"
				@blur="InputBlur"
			></textarea>
			<u-button throttleTime="1000" type="primary" @click="send">发送</u-button>
		</view>
	</view>
</template>

<script>
export default {
	name: 'dx-chatbar',
	data() {
		return {
			replytext: '',
			InputBottom: 0
		};
	},
	methods: {
		send: async function() {
			if (this.replytext) {
				uni.$emit('reply', this.replytext);
			} else {
				uni.showToast({
					title: '请输入内容'
				});
			}
		},
		InputFocus(e) {
			this.InputBottom = e.detail.height;
		},
		InputBlur(e) {
			this.replytext = e.detail.value;
			this.InputBottom = 0;
		},
		popupClose(e) {
			this.InputBottom = 0;
		}
	}
};
</script>

<style></style>
