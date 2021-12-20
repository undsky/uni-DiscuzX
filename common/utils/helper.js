import store from '@/store/index.js'

function goto(url, auth) {
	uni.navigateTo({
		url: auth && !store.state.auth.user ? '/pages/auth/auth' : url
	});
}

export default {
	goto
}
