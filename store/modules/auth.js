export default {
	state: {
		user: uni.getStorageSync('user')
	},
	getters: {

	},
	mutations: {
		setUser(state, user) {
			state.user = user
			uni.setStorageSync('user', user)
		},
		clearUser(state) {
			state.user = null
			uni.removeStorageSync('user')
		}
	},
	actions: {

	}
}
