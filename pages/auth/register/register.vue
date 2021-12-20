<template>
	<view class="wrap padding">
		<u-form :model="model" :rules="rules" ref="uForm" :errorType="errorType">
			<u-form-item :leftIconStyle="iconStyle" left-icon="account" label-width="180"
				:label-position="labelPosition" label="用户名" prop="username">
				<u-input :border="border" placeholder="请输入用户名" v-model="model.username" type="text"></u-input>
			</u-form-item>
			<u-form-item :leftIconStyle="iconStyle" left-icon="lock" label-width="180" :label-position="labelPosition"
				label="密码" prop="password">
				<u-input :password-icon="true" :border="border" type="password" v-model="model.password"
					placeholder="请输入密码"></u-input>
			</u-form-item>
			<u-form-item :leftIconStyle="iconStyle" left-icon="lock" :label-position="labelPosition" label="确认密码"
				label-width="180" prop="rePassword">
				<u-input :border="border" type="password" v-model="model.rePassword" placeholder="请确认密码"></u-input>
			</u-form-item>
			<u-form-item :leftIconStyle="iconStyle" left-icon="email" :label-position="labelPosition" label="邮箱"
				prop="email" label-width="180">
				<u-input :border="border" placeholder="请输入邮箱" v-model="model.email"></u-input>
			</u-form-item>
			<u-form-item :leftIconStyle="iconStyle" left-icon="phone" :label-position="labelPosition" label="手机号"
				prop="mobile" label-width="180">
				<u-input :border="border" placeholder="请输入手机号" v-model="model.mobile" type="number"></u-input>
			</u-form-item>
		</u-form>
		<view class="margin-top-lg">
			<u-button type="warning" @click="submit">注册</u-button>
		</view>
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
					password: '',
					rePassword: '',
					email: '',
					mobile: '',
				},
				rules: {
					username: [{
						required: true,
						message: '请输入用户名',
						trigger: ['change', 'blur'],
					}],
					password: [{
						required: true,
						message: '请输入密码',
						trigger: ['change', 'blur'],
					}],
					rePassword: [{
							required: true,
							message: '请重新输入密码',
							trigger: ['change', 'blur'],
						},
						{
							validator: (rule, value, callback) => {
								return value === this.model.password;
							},
							message: '两次输入的密码不一致',
							trigger: ['change', 'blur'],
						}
					],
					email: [{
							required: true,
							message: '请输入邮箱',
							trigger: ['change', 'blur'],
						},
						{
							validator: (rule, value, callback) => {
								return this.$u.test.email(value);
							},
							message: '邮箱不正确',
							trigger: ['change', 'blur'],
						}
					],
					mobile: [{
							required: true,
							message: '请输入手机号',
							trigger: ['change', 'blur'],
						},
						{
							validator: (rule, value, callback) => {
								return this.$u.test.mobile(value);
							},
							message: '手机号不正确',
							trigger: ['change', 'blur'],
						}
					],
				},
				border: false,
				labelPosition: 'left',
				errorType: ['message'],
			};
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		},
		methods: {
			submit: async function() {
				this.$refs.uForm.validate(async valid => {
					if (valid) {
						const result = await this.$http.post({
							r: 'user/register',
							username: this.model.username,
							password: this.model.password,
							email: this.model.email,
							mobile: this.model.mobile,
							isValidation: 0,
						}, {
							custom: {
								auth: false
							}
						})

						uni.showModal({
							title: '',
							content: '注册成功！请返回登录',
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
			},
		}
	};
</script>

<style>

</style>
