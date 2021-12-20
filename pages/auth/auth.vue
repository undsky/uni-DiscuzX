<template>
	<view class="wrap padding">
		<u-form :model="model" :rules="rules" ref="uForm" :errorType="errorType">
			<u-form-item :leftIconStyle="iconStyle" left-icon="account" label-width="150" :label-position="labelPosition" label="用户名" prop="username">
				<u-input :border="border" placeholder="请输入用户名" v-model="model.username" type="text"></u-input>
			</u-form-item>
			<u-form-item :leftIconStyle="iconStyle" left-icon="lock" label-width="150" :label-position="labelPosition" label="密码" prop="password">
				<u-input :password-icon="true" :border="border" type="password" v-model="model.password" placeholder="请输入密码"></u-input>
			</u-form-item>
		</u-form>
		<view class="margin-top-lg"><u-button type="warning" @click="submit">登录</u-button></view>
		<navigator hover-class="none" url="./register/register"><view class="flex justify-center margin-top text-df text-blue">注册</view></navigator>
	</view>
</template>

<script>
export default {
	data() {
		return {
			iconStyle: {
				color: '#888',
				fontSize: '32rpx'
			},
			model: {
				username: '',
				password: ''
			},
			rules: {
				username: [
					{
						required: true,
						message: '请输入用户名',
						trigger: ['change', 'blur']
					}
				],
				password: [
					{
						required: true,
						message: '请输入密码',
						trigger: ['change', 'blur']
					}
				]
			},
			border: false,
			labelPosition: 'left',
			errorType: ['message']
		};
	},
	onReady() {
		this.$refs.uForm.setRules(this.rules);
	},
	methods: {
		submit: async function() {
			this.$refs.uForm.validate(async valid => {
				if (valid) {
					const result = await this.$http.get(
						{
							r: 'user/login',
							username: this.model.username,
							password: this.model.password
						},
						{
							custom: {
								auth: false
							}
						}
					);
					this.$store.commit('setUser', result);
					uni.showModal({
						title: '',
						content: '登录成功',
						showCancel: false,
						cancelText: '',
						confirmText: '确定',
						success: res => {
							uni.navigateBack({
								delta: 1
							});
						},
						fail: () => {},
						complete: () => {}
					});
				}
			});
		}
	}
};
</script>

<style></style>
