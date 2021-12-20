<template>
	<view class="padding-lr-sm">
		<u-form :model="model" :rules="rules" ref="uForm" :errorType="errorType">
			<u-form-item :label-position="labelPosition" label="板块" label-width="100" prop="board">
				<u-input :border="border" type="select" :select-open="boardShow" v-model="model.board" placeholder="请选择板块" @click="boardShow = true"></u-input>
			</u-form-item>
			<u-form-item label-width="100" :label-position="labelPosition" label="标题" prop="title">
				<u-input :border="border" placeholder="请输入标题" v-model="model.title" type="text"></u-input>
			</u-form-item>
			<u-form-item :label-position="labelPosition" label="内容" prop="content">
				<u-input type="textarea" :border="border" height="230" placeholder="请填写内容" v-model="model.content" />
			</u-form-item>
			<u-form-item :label-position="labelPosition" label="上传图片" prop="photo" label-width="150">
				<u-upload ref="upload" :action="action" :form-data="formData" name="uploadFile[]" width="160" height="160"></u-upload>
			</u-form-item>
		</u-form>
		<view class="margin-top-lg"><u-button type="warning" @click="submit">发布</u-button></view>
		<u-select mode="mutil-column-auto" v-model="boardShow" :list="boardList" @confirm="boardConfirm"></u-select>
	</view>
</template>

<script>
import { mapState } from 'vuex';

let _boardId = 0;

export default {
	data() {
		return {
			action: '',
			formData: {},
			boardShow: false,
			boardList: [],
			model: {
				title: '',
				content: '',
				board: null
			},
			rules: {
				board: [
					{
						required: true,
						message: '请选择板块',
						trigger: ['change', 'blur']
					}
				],
				title: [
					{
						required: true,
						message: '请输入标题',
						trigger: ['change', 'blur']
					}
				],
				content: [
					{
						required: true,
						message: '请输入内容',
						trigger: ['change', 'blur']
					}
				]
			},
			border: false,
			labelPosition: 'left',
			errorType: ['message']
		};
	},
	computed: {
		...mapState({
			user: state => state.auth.user
		})
	},
	onReady() {
		this.$refs.uForm.setRules(this.rules);
	},
	onLoad: async function(options) {
		this.action = this.$http.config.baseURL;
		this.formData = {
			r: 'forum/sendattachmentex',
			module: 'forum',
			type: 'image',
			accessToken: this.user.token,
			accessSecret: this.user.secret
		};
		const result = await this.$http.get({
			r: 'forum/forumlist'
		});
		let _boarderList = [];
		for (let item of result.list) {
			let _board = {
				value: item.board_category_id,
				label: item.board_category_name,
				children: []
			};
			for (let item2 of item.board_list) {
				_board.children.push({
					value: item2.board_id,
					label: item2.board_name
				});
			}
			_boarderList.push(_board);
		}
		this.boardList = _boarderList;
	},
	methods: {
		boardConfirm(e) {
			this.model.board = '';
			e.map((val, index) => {
				_boardId = val.value;
				this.model.board += this.model.board == '' ? val.label : '-' + val.label;
			});
		},
		submit: async function() {
			this.$refs.uForm.validate(async valid => {
				if (valid) {
					let aid = [];
					let body = [
						{
							type: 0,
							infor: this.model.content
						}
					];
					let topic = {
						title: this.model.title,
						fid: _boardId,
						isOnlyAuthor: 0,
						isHidden: 0,
						isAnonymous: 0
					};
					const images = this.$refs.upload.lists;
					if (images && images.length > 0) {
						images.forEach(res => {
							const imgdata = res.response;
							body.push({
								type: 1,
								infor: imgdata.body.attachment[0].urlName.replace('//forum', '/forum')
							});
							aid.push(imgdata.body.attachment[0].id);
						});
					}
					topic.content = JSON.stringify(body);
					topic.aid = aid.join();

					const result = await this.$http.post({
						r: 'forum/topicadmin',
						act: 'new',
						json: JSON.stringify({
							body: {
								json: topic
							}
						})
					});
					uni.showModal({
						title: '',
						content: '发帖成功',
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
